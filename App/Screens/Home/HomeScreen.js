import React from 'react'
import {
  Platform, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image,
} from 'react-native'
import { setGame } from 'App/Redux/modules/home';
import { connect } from 'react-redux'
import { style } from './HomeScreen.style'

class HomeScreen extends React.Component {

  handleSetGame = () => {
    const { setGame } = this.props;
    setGame(true);
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.logoContainer}>
          <Text style={style.title}>FIGRD</Text>
          <View style={style.logo}>
            <Text style={style.title}>LOGO</Text>
          </View>
        </View>
        <View style={style.buttonsContainer}>
          <TouchableOpacity onPress={this.handleSetGame} style={style.button}>
            <Text style={style.start}>START</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button}>
            <Text style={style.howTo}>How To Play</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

// HomeScreen.propTypes = {

// }

// const mapStateToProps = (state) => ({
//   user: state.example.user,
//   userIsLoading: state.example.userIsLoading,
//   userErrorMessage: state.example.userErrorMessage,
//   liveInEurope: liveInEurope(state),
// })
const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  setGame,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(HomeScreen)
