import React from 'react'
import {
  Platform, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  ImageBackground,
  StatusBar,
} from 'react-native';
import { setGame } from 'App/Redux/modules/home';
import { connect } from 'react-redux';
import { style } from './HomeScreen.style';
import SplashScreen from 'react-native-splash-screen'
import Sound from 'react-native-sound';
import splash from 'App/Assets/Images/splash.png';

class HomeScreen extends React.Component {

  track = new Sound('main_track.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + this.track.getDuration() + 'number of channels: ' + this.track.getNumberOfChannels());
  
    // Play the sound with an onEnd callback
    this.track.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    this.track.setNumberOfLoops(-1);
  });

  componentDidMount() {
    SplashScreen.hide();
  }
  
  handleSetGame = () => {
    const { setGame } = this.props;
    // this.track.stop();
    // this.track.release();
    setGame(true);
  }

  handleHowToPlay = () => {
    this.track.stop();
    this.track.release();
  }

  render() {
    return (
      <View style={style.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={splash} style={style.background}>
          <View style={style.logoContainer}>
            <Text style={style.title}>FIGRD</Text>
            {/* <View style={style.logo}>
              <Text style={style.title}>LOGO</Text>
            </View> */}
          </View>
          <View style={style.buttonsContainer}>
            <TouchableOpacity onPress={this.handleSetGame} style={style.button}>
              <Text style={style.buttonText}>START</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleHowToPlay} style={style.button}>
              <Text style={style.buttonText}>How To Play</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
