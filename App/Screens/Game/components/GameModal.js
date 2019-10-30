import React from 'react';
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
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { getShapes } from '../../../Helpers/Shapes';
import { style } from '../GameScreen.style';


class GameModal extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}>

      </View>
    )
  }
}

export default connect(
  null,
  null
)(GameModal)


