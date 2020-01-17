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
      timeLeft: 0,
      yOffset: 0,
      score: 0,
    };

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
      shapesInMatrix,
      updateShapesFound,
    } = this.props;
    const {
      grabbedShape,
      matrixBorder,
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
        this.setState({ score: score + 1 });
        const newShapesFound = [
          ...shapesFound,
          shape.id.toString(),
        ];
        updateShapesFound(newShapesFound);
        //YOU WON!!
        if (shapesFound.length === 3) {
          this.points();
          const { timeLeft } = this.state;
          const { gameWon, level } = this.props;
          const params = { 
            score: score + 1, 
            level: level + 1,
            timeLeft,
            won: true
          }
          gameWon(params);
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
    pauseGame(true);
  }

  handleGameOver = () => {
    const { gameOver } = this.props;
    this.setState({ score: 0, isGrabbing: false });
    gameOver(true);
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

  saveMatrixBorder = (e) => {
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
      timeID,
      level,
      time,
      won,
    } = this.props;

    const { 
      grabbedShape,
      isGrabbing,
      timeLeft,
      score,
    } = this.state;

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

        <Matrix 
          shapes={shapesInMatrix}
          renderShape={this.renderShape}
          saveLocation={this.saveShapeLocation}
          saveBorder={this.saveMatrixBorder}
        />

        <Selection
          shapes={shapesInSelection}
          renderShape={this.renderShape}
          grabbedShape={grabbedShape}
        />

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
      </View>
    )
  }
}

// GameScreen.propTypes = {

// }

const mapStateToProps = ({
  game: { 
    gamePaused, 
    level,
    shapesInSelection,
    shapesInMatrix,
    shapesInfo,
    shapesFound,
    timeID,
    time,
    won,
  },
}) => ({
  shapesInSelection,
  shapesInMatrix,
  shapesFound,
  gamePaused,
  shapesInfo,
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
