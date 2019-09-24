import React from 'react'
import {
  Platform, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  ImageBackground,
  Image,
} from 'react-native'
import matrixImg from 'App/Assets/Images/matrix_bkgd.png';
import { connect } from 'react-redux'
import { getShapes } from '../../Helpers/Shapes'
import { style } from './GameScreen.style'

class GameScreen extends React.Component {
  render() {
    const shapesArr = getShapes();
    return (
      <View style={style.container}>
        <ImageBackground source={matrixImg} resizeMode="stretch" imageStyle={style.backgroundImage} style={style.matrixContainer}>


        </ImageBackground>
        <View style={style.selectionContainer}>
          {shapesArr.map((shape, i) => (
            <Image key={i} source={shape.activeImg} style={style.shapeImg} />
          ))}
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
