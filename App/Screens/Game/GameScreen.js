import React from 'react'
import {
  View,
  Animated,
  PanResponder,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import { 
  gameOver, 
  pauseGame, 
  gameWon,
  gameTime,
  updateShapesObject,
  updateShapesFound,
  updateShapesInfo,
} from 'App/Redux/modules/game';
import { getShapes } from '../../Helpers/Shapes'
import { style } from './GameScreen.style'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Matrix } from '../../Components/organisms/Matrix';
import { Selection } from '../../Components/organisms/Selection';
import { Status } from '../../Components/organisms/Status';

class GameScreen extends React.Component {

  point = new Animated.ValueXY();

  constructor() {
    super();
    this.state = {
      backgroundColor: null,
      isGrabbing: false,
      grabbedShape: {},
      matrixBorder: 0,
      shapeBorder: 0,
      shapesInfo: [],
      timeLeft: 0,
      yOffset: 0,
      square: null,
      score: 0,
    };
    
    this.inverval = setInterval(() => {
      this.handleGetPowerup();
    }, 2000);

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        const { memoizedProps: { shape } } = evt._targetInst;
        const { height, width } = this.props.shapesInfo[0];
        const { y0, x0 } = gestureState;

        this.setState({
          grabbedShape: shape,
          isGrabbing: true,
        });

        Animated.event([{ x: this.point.x }])({ x: x0 - (width / 2) })
        Animated.event([{ y: this.point.y }])({ y: y0  - (height / 2)})
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        const { height, width } = this.props.shapesInfo[0];
        const { moveX, moveY } = gestureState;

        Animated.event([{ y: this.point.y }])({ y: moveY - (height / 2) })
        Animated.event([{ x: this.point.x }])({ x: moveX - (width / 2) })
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        this.handleRelease(gestureState)
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // this.setState({ isGrabbing: false });
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  componentDidMount() {
    this.handleGetShapes();
  }

  points = () => {
    debugger
    const addOne = () => {
      let { score, timeLeft } = this.state;

      if (timeLeft === 0) {
        clearInterval(addPoints);
      } else {
        this.setState({ score: score + 1 , timeLeft: timeLeft - 1});
      }
    }
    const addPoints = setInterval(addOne, 100);
  }

  handleRelease = (gestureState) => {
    const { moveX, moveY } = gestureState;
    const { 
      shapesInfo, 
      shapesFound, 
      shapesInMatrix,
      updateShapesFound,
    } = this.props;
    const {
      grabbedShape,
      matrixBorder,
      timeLeft,
      yOffset,
      score,
    } = this.state;

    shapesInfo.find(shape => {
      if (
        (moveX >= shape.x + matrixBorder) &&
        (moveY >= shape.y + yOffset + matrixBorder) &&
        (moveX <= shape.x + shape.width + matrixBorder) &&
        (moveY <= shape.y + shape.height + yOffset + matrixBorder) &&
        (shape.id === grabbedShape.id)
      ) {

        // A SHAPE FOUND
        this.setState({ score: score + 1 });
        const newShapesFound = [
          ...shapesFound,
          shape.id.toString(),
        ];
        updateShapesFound(newShapesFound);
        //YOU WON!!
        if (shapesFound.length === 2) {
          const { gameWon, level } = this.props;
          const params = { 
            score: score + 1, 
            level: level + 1,
            timeLeft,
            won: true
          }
          gameWon(params);
          // this.points();
        }
      }
    })
      this.setState({ isGrabbing: false });
      this.setState({ grabbedShape: {} });
  }

  handleGetShapes = () => {
    const { updateShapesObject } = this.props;
    const objectShapes = {
      shapesInMatrix: getShapes(),
      shapesInSelection: getShapes(),
    }
    updateShapesObject(objectShapes);
  }

  // handleTime = e => {
  //   this.setState({ timeLeft: e })
  // }

  handlePause = () => {
    clearInterval(this.inverval);
    const { pauseGame } = this.props;
    pauseGame(true);
  }

  handleGameOver = () => {
    const { gameOver } = this.props;
    clearInterval(this.inverval);
    this.setState({ score: 0, isGrabbing: false });
    gameOver(true);
  }

  handleGetPowerup = () => {
    const { square } = this.state;
    if (square === null) {
      const colors = [
        'rgb(220,20,60)',
        'rgb(65,105,225)',
        'rgb(0,100,0)',
        'rgb(102,51,153)',
        'rgb(255,215,0)',
      ];
      const n = Math.floor(Math.random() * 5);
      const square = Math.floor(Math.random() * 25);
      this.setState({ square });
      this.setState({ backgroundColor: colors[n] })
    } else {
      this.setState({ square: null })
    }
  }

  saveShapeLocation = e => {
    const { updateShapesInfo, shapesInMatrix } = this.props;
    const {layout: {x, y, width, height} } = e.nativeEvent;
    const {style: { borderWidth } } = e._targetInst.memoizedProps
    this.setState({ shapeBorder: borderWidth });

    let counter = -1

    const newShapesInfo = shapesInMatrix.map((shape, i) => {
      const row = i % 5
      if (row === 0) {
        counter += 1
      }

        return (
          { 
            x: x + (row * width), 
            y: y + (counter * height), 
            height,
            width,
            ...shape,
          }
        );
    });
    updateShapesInfo(newShapesInfo);
  }

  saveMatrixBorder = e => {
    const {layout: { y } } = e.nativeEvent;
    const {style: {borderWidth}} = e._targetInst.memoizedProps
    this.setState({ matrixBorder: borderWidth, yOffset: y });
  }

  renderShape = ( shape, i, hidden ) => {
    const { shapesFound } = this.props;
    const found = shapesFound.find(id => id == shape.id);
    if (!found && !hidden) {
      return (
        <View
          {...this._panResponder.panHandlers}
          shape={shape}
          style={style.slopHit}
        >
          <Image 
            key={`${shape.name}${i}`} 
            style={style.shapeImg} 
            source={!hidden ? shape.activeImg : shape.inactiveImg} 
            shape={shape}
            resizeMode="contain"
          />
        </View>
      )
    }
    if (hidden) { 
      return (
        <Image 
          key={`${shape.name}${i}`} 
          style={[style.shapeImg]} 
          source={!hidden || found ? shape.activeImg : shape.inactiveImg} 
          shape={shape}
          resizeMode="contain"
        />
      )
    }
    if (found) {
      return null;
    }
  }

  render() {
    const { 
      shapesInSelection, 
      shapesInMatrix, 
      gamePaused, 
      gameEnded,
      timeID,
      level,
      time,
      won,
    } = this.props;

    const { 
      backgroundColor,
      grabbedShape,
      isGrabbing,
      timeLeft,
      square,
      score,
    } = this.state;

    if (gamePaused || gameEnded || won) {
      clearInterval(this.inverval);
      this.inverval = null;
      debugger
    } else if(this.inverval === null) {
      debugger
      this.inverval = setInterval(() => {
        this.handleGetPowerup();
      }, 2000);
    }

    console.log('render')
    return (
      <View style={style.container}>
        {isGrabbing && (
          <Animated.View
            style={[
              {
                ...style.shapeContainer, 
                position: 'absolute',
                zIndex: 2, 
                top: this.point.y,
                left: this.point.x,
                borderWidth: 0, 
              }
            ]}
          >
            {this.renderShape(grabbedShape, grabbedShape.id)}
          </Animated.View> 
        )}

        <Status 
          won={won}
          time={time}
          score={score}
          level={level}
          timeID={timeID}
          timeLeft={timeLeft}
          gamePaused={gamePaused}
          handleTime={this.handleTime}
          handlePause={this.handlePause}
          handleGameOver={this.handleGameOver}
        />

        <Matrix 
          square={square}
          shapes={shapesInMatrix}
          renderShape={this.renderShape}
          saveBorder={this.saveMatrixBorder}
          saveLocation={this.saveShapeLocation}
          backgroundColor={backgroundColor}
        />

        <Selection
          shapes={shapesInSelection}
          renderShape={this.renderShape}
          grabbedShape={grabbedShape}
        />
      </View>
    )
  }
}

const mapStateToProps = ({
  game: { 
    shapesInSelection,
    shapesInMatrix,
    shapesFound,
    gamePaused, 
    gameEnded, 
    shapesInfo,
    timeID,
    level,
    time,
    won,
  },
}) => ({
  shapesInSelection,
  shapesInMatrix,
  shapesFound,
  gamePaused,
  shapesInfo,
  gameEnded,
  timeID,
  level,
  time,
  won,
})

const mapDispatchToProps = {
  updateShapesObject,
  updateShapesFound,
  updateShapesInfo,
  pauseGame,
  gameTime,
  gameOver,
  gameWon,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreen)
