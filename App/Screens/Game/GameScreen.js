import React from 'react'
import {
  Platform, 
  Text, 
  View, 
  Animated,
  TouchableWithoutFeedback, 
  ActivityIndicator, 
  ImageBackground,
  PanResponder,
  Image,
  findNodeHandle,
} from 'react-native'
import starImg from 'App/Assets/Images/star.png'
import matrixImg from 'App/Assets/Images/matrix_bkgd.png';
import { connect } from 'react-redux'
import { getShapes } from '../../Helpers/Shapes'
import { style } from './GameScreen.style'

class GameScreen extends React.Component {

  point = new Animated.ValueXY();

  constructor() {
    super();
    this.state = {
      shapesArr: [],
      isGrabbing: false,
      currentShape: {},
      currentMatrix: {},
    };

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        const { memoizedProps: { shape } } = evt._targetInst;
        this.setState({ isGrabbing: true });
        this.setState({ currentShape: shape});

        Animated.event([{ x: this.point.x }])({ x: gestureState.x0 - 21 })
        Animated.event([{ y: this.point.y }])({ y: gestureState.y0  - 21})
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([{ y: this.point.y }])({ y: gestureState.moveY - 21 })
        Animated.event([{ x: this.point.x }])({ x: gestureState.moveX - 21 })
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        const { currentShape, currentMatrix } = this.state;
        if (currentShape.id !== currentMatrix.id) { 
          this.setState({ isGrabbing: false });
          this.setState({ currentShape: {} });
        }
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
    this.setState({ shapesArr: getShapes()})
  }

  componentWillUnmount() {
    console.warn('will unmount')
  }

  handleOnPress = () => {
    console.warn('PRESSED!')
  }

  render() {
    const { shapesArr, isGrabbing, currentShape } = this.state;
    const renderShape = ( shape, i, hidden ) => (
      <Image 
        key={`${shape.name}${i}`} 
        style={style.shapeImg} 
        source={!hidden ? shape.activeImg : shape.inactiveImg} 
        shape={shape}
        {...this._panResponder.panHandlers}
      />
    );

    return (
      <View style={style.container}>
        {isGrabbing && (
          <Animated.View
            style={[
              { 
                position: 'absolute',
                zIndex: 2, 
                top: this.point.y,
                left: this.point.x,
              }
            ]}
          >
            {renderShape(currentShape, currentShape.id)}
          </Animated.View> 
        )}
        <ImageBackground source={matrixImg} resizeMode="stretch" imageStyle={style.backgroundImage} style={style.matrixContainer}>
          {shapesArr.map((shape, id) => (
            <View key={`${shape.name}${id}`} style={{margin: 15, marginBottom: 10}}>
              {renderShape(shape, shape.id, true)}
            </View>
          ))}
        </ImageBackground>
        <View style={style.selectionContainer}>
          {shapesArr.map((shape, id) => (
            <View key={`${shape.name}${id}`} style={{margin: 15, marginBottom: 10, opacity: currentShape.id === shape.id ? 0 : 1 }}>
              {renderShape(shape, shape.id)}
            </View>
          ))}
        </View>
        <View style={style.statsContainer}>
          {/* Stats container */}
        </View>
      </View>
    )
  }
}

// GameScreen.propTypes = {

// }

// const mapStateToProps = (state) => ({
//   user: state.example.user,
//   userIsLoading: state.example.userIsLoading,
//   userErrorMessage: state.example.userErrorMessage,
//   liveInEurope: liveInEurope(state),
// })

// const mapDispatchToProps = (dispatch) => ({
//   fetchUser: () => dispatch(ExampleActions.fetchUser()),
// })

export default connect(
  null,
  null
)(GameScreen)
