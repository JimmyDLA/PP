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
  Dimensions,
} from 'react-native'
import starImg from 'App/Assets/Images/star.png'
import matrixImg from 'App/Assets/Images/matrix_bkgd.png';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux'
import { getShapes } from '../../Helpers/Shapes'
import { style } from './GameScreen.style'

class GameScreen extends React.Component {

  point = new Animated.ValueXY();

  constructor() {
    super();
    this.state = {
      shapesInMatrix: [],
      shapesInSelection: [],
      isGrabbing: false,
      grabbedShape: {},
      matrixBorder: 0,
      shapeBorder: 0,
      shapesInfo: [],
      foundShape: [],
      yOffset: 0,
    };

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        const { memoizedProps: { shape } } = evt._targetInst;
        const { height, width } = this.state.shapesInfo[0];
        this.setState({
          grabbedShape: shape,
          isGrabbing: true,
        });

        Animated.event([{ x: this.point.x }])({ x: gestureState.x0 - (width / 2) })
        Animated.event([{ y: this.point.y }])({ y: gestureState.y0  - (height / 2)})
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // const { memoizedProps: { style: {width,height} } } = evt._targetInst;
        const { height, width } = this.state.shapesInfo[0];

        const { moveX, moveY } = gestureState;
        Animated.event([{ y: this.point.y }])({ y: gestureState.moveY - (height / 2) })
        Animated.event([{ x: this.point.x }])({ x: gestureState.moveX - (width / 2) })
        console.log('x:', moveX, '/y:', moveY )

        // console.log('x = ', gestureState.moveX, ' y = ', gestureState.moveY);
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // console.log('x = ', gestureState.moveX, ' y = ', gestureState.moveY);
        let { moveX, moveY } = gestureState;
        //find shape with xy position 
        const { foundShape, shapesInfo, grabbedShape, yOffset, matrixBorder } = this.state;
        shapesInfo.find(shape => {
          if (
            (moveX >= shape.x + matrixBorder) &&
            (moveY >= shape.y + yOffset + matrixBorder) &&
            (moveX <= shape.x + shape.width + matrixBorder) &&
            (moveY <= shape.y + shape.height + yOffset + matrixBorder) &&
            (shape.id === grabbedShape.id)
          ) {
            return this.setState({ foundShape: [...foundShape, shape.id.toString()] });
          }
        })
        // if (grabbedShape.id !== currentMatrix.id) { 
          this.setState({ isGrabbing: false });
          this.setState({ grabbedShape: {} });
        // }
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
    this.setState({ shapesInMatrix: getShapes(), shapesInSelection: getShapes()})
  }

  componentWillUnmount() {
    console.warn('will unmount')
  }

  handleOnPress = () => {
    console.warn('PRESSED!')
  }

  saveShapeLocation = (e, shape) => {
    const { shapesInfo } = this.state;
    const {layout: {x, y, width, height} } = e.nativeEvent;
    const {style: { borderWidth } } = e._targetInst.memoizedProps
    if (shape.id === 1) {
      this.setState({ shapeBorder: borderWidth });
    }
    this.setState({ shapesInfo: [...shapesInfo, { x, y, width, height, ...shape }] });
  }

  saveMatrixBorder = (e) => {
    const {layout: { y } } = e.nativeEvent;
    const {style: {borderWidth}} = e._targetInst.memoizedProps
    this.setState({ matrixBorder: borderWidth, yOffset: y });
  }

  renderShape = ( shape, i, hidden ) => {
    const { foundShape } = this.state;
    const found = foundShape.find(id => id == shape.id);

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
      shapesInMatrix, 
      shapesInSelection, 
      isGrabbing, 
      grabbedShape,
    } = this.state;

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
        <View style={style.matrixContainer} onLayout={this.saveMatrixBorder}>
          <View style={style.innerMatrix}>
            {shapesInMatrix.map((shape, id) => (
              <View
                onLayout={(e) => this.saveShapeLocation(e, shape)}
                key={`${shape.name}${id}`} 
                style={style.shapeContainer}
              >
                {this.renderShape(shape, shape.id, true)}
              </View>
            ))}
          </View>

        </View>
        <View style={style.selectionContainer}>
          {shapesInSelection.map((shape, id) => (
            <View key={`${shape.name}${id}`} style={{...style.shapeContainer, borderWidth: 0, opacity: grabbedShape.id === shape.id ? 0 : 1 }}>
              {this.renderShape(shape, shape.id)}
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
