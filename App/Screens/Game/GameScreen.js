import React from 'react'
import {
  Platform, 
  Text, 
  View, 
  Animated,
  TouchableOpacity, 
  ActivityIndicator, 
  ImageBackground,
  PanResponder,
  Image,
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
    };

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ isGrabbing: true });
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // console.log(gestureState);
        Animated.event([{ y: this.point.y }])({ y: gestureState.moveY })
        Animated.event([{ x: this.point.x }])({ x: gestureState.moveX })
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({ isGrabbing: false });

        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.setState({ isGrabbing: false });

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

  render() {
    const { shapesArr, isGrabbing } = this.state;
    const renderShape = ( shape, i ) => (
      <Image 
        onLayout={e => {
          console.log(e.target)
          console.log(e.nativeEvent)
          debugger
        }}
        key={`${shape.name}${i}`} 
        style={style.shapeImg} 
        source={shape.activeImg} 
        {...this._panResponder.panHandlers} 
      />
    )
    return (
      <View style={style.container}>
        {isGrabbing && (
          <Animated.View
            style={[
              { 
                zIndex: 2, 
                top: this.point.getLayout().top,
                left: this.point.getLayout().left,
              }]}
          >
            {renderShape({ id: 2, name: 'star', activeImg: starImg }, 2)}
          </Animated.View> 
        )}
        <ImageBackground source={matrixImg} resizeMode="stretch" imageStyle={style.backgroundImage} style={style.matrixContainer}>

        </ImageBackground>
        <View style={style.selectionContainer}>
          {shapesArr.map((shape, i) => renderShape(shape, i))}
        </View>
        <View style={style.statsContainer}>

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
