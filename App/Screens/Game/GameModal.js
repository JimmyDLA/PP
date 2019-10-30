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
import { getShapes } from '../../Helpers/Shapes';
import { WhiteContainer } from '../../Components/atoms/WhiteContainer';
import { style } from './GameModal.style';


class GameModal extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <View style={style.container}>
        {/* //dynamic Component */}
        <WhiteContainer>
          <Text>hello</Text>
        </WhiteContainer>
      </View>
    )
  }
}

export default connect(
  null,
  null
)(GameModal)


