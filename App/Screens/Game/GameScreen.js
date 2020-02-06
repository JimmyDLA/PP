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
      isGrabbing: false,
      grabbedShape: {},
      matrixBorder: 0,
      shapeBorder: 0,
      shapesInfo: [],
      frozen: false,
      isPowerOn: false,
      powerUpId: null,
      powerUp: {
        color: null,
        square: null,
      },
      wildcard: false,
      timeLeft: 0,
      yOffset: 0,
      score: 0,

    };
    
    this.inverval = setInterval(() => {
      this.handleLightUpPowerup();
    }, 5000);

    this.time = React.forwardRef();

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
      updateShapesFound,
      shapesInMatrix,
    } = this.props;
    const {
      grabbedShape,
      matrixBorder,
      yOffset,
      wildcard,
    } = this.state;

    const handleShapeFound = shape => {
      const newShapesFound = [
        ...shapesFound,
        shape.id.toString(),
      ];
      updateShapesFound(newShapesFound);

      //YOU WON!!
      if (shapesFound.length === 24) {
        const { gameWon, level, score } = this.props;
        const { seconds } = this.time.current.getTimeLeft();
        const params = { 
          score: shapesFound.length + score + seconds + 1, 
          level: level + 1,
          timeLeft: seconds,
          won: true,
          gamePaused: true,
        }
        gameWon(params);
        // this.points();
      }
    }

    shapesInfo.find(shape => {
      if (
        (moveX >= shape.x + matrixBorder) &&
        (moveY >= shape.y + yOffset + matrixBorder) &&
        (moveX <= shape.x + shape.width + matrixBorder) &&
        (moveY <= shape.y + shape.height + yOffset + matrixBorder)
      ) {      
        if (wildcard) {
          handleShapeFound(grabbedShape);
        } else {
          if (shape.id === grabbedShape.id) {
            const { powerUp: { square, color } } = this.state;
            handleShapeFound(shape);
            if (square) {
              if (grabbedShape.id == shapesInMatrix[square].id) {
                this.handlePowerUp(color)
              }
            }
          }
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

  handlePause = () => {
    const { pauseGame } = this.props;
    clearInterval(this.inverval);
    pauseGame(true);
  }

  handleGameOver = () => {
    const { gameOver } = this.props;
    clearInterval(this.inverval);
    this.setState({ score: 0, isGrabbing: false });
    gameOver(true);
  }

  handlePowerUp = color => {
    if (color === 'rgb(220,20,60)') {
      console.warn('red')
      const { seconds } = this.time.current.getTimeLeft();
      this.time.current.updateTimer(seconds - 5);
    }

    if (color === 'rgb(0,100,0)') {
      console.warn('green')
      const time = this.time.current.state.until;
      this.time.current.updateTimer(time + 3);
    }

    if (color === 'rgb(65,105,225)') {
      console.warn('blue')
      this.setState({ isPowerOn: true, frozen: true });
      setTimeout(() => {
        this.setState({ isPowerOn:false, frozen: false });
      }, 4000);
    }

    if (color === 'rgb(102,51,153)') {
      console.warn('purple')
      const { shapesFound, shapesInMatrix, updateShapesFound } = this.props;
      const availableShapes = shapesFound.filter(item => !shapesInMatrix.include(item));
      const n = Math.floor(Math.random() * availableShapes.length);
      const newShapesFound = [
        ...shapesFound,
        availableShapes[n],
      ];
      updateShapesFound(newShapesFound);
    }

    if (color === 'rgb(255,215,0)') {
      console.warn('yellow')
      this.setState({ wildcard: true });
      setTimeout(() => {
        this.setState({ wildcard: false });
      }, 4000);
    }
  }

  handleLightUpPowerup = () => {
    const { powerUp } = this.state;
    if (powerUp.square === null) {
      const colors = [
        'rgb(220,20,60)',
        'rgb(65,105,225)',
        'rgb(0,100,0)',
        'rgb(102,51,153)',
        'rgb(255,215,0)',
      ];
      const n = Math.floor(Math.random() * 5);
      const id = Math.floor(Math.random() * 25);
      const newPowerUp = {
        square: id,
        color: colors[n],
      };
      this.setState({ powerUp: newPowerUp })
    } else {
      const newPowerUp = {
        square: null,
        color: null,
      };
      this.setState({ powerUp: newPowerUp });
    }
  }

  handleLightUpInterval = () => {
    const { gamePaused, gameEnded, won } = this.props;

    if (gamePaused || gameEnded || won) {
      clearInterval(this.inverval);
      this.inverval = null;
    } else if(this.inverval === null) {
      this.inverval = setInterval(() => {
        this.handleLightUpPowerup();
      }, 5000);
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

  handleUpdatePowerId = e => {
    debugger
    this.setState({ powerUpId: e })
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
      timeID,
      level,
      score,
      time,
      won,
    } = this.props;

    const { 
      grabbedShape,
      isGrabbing,
      powerUp,
      frozen,
    } = this.state;

    this.handleLightUpInterval();

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
          isFrozen={frozen}
          gamePaused={gamePaused}
          handlePause={this.handlePause}
          handleGameOver={this.handleGameOver}
          ref={this.time}
        />

        <Matrix 
          square={powerUp.square}
          shapes={shapesInMatrix}
          renderShape={this.renderShape}
          saveBorder={this.saveMatrixBorder}
          saveLocation={this.saveShapeLocation}
          onUpdateId={this.handleUpdatePowerId}
          backgroundColor={powerUp.color}
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
    score,
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
  score,
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
