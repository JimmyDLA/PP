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
import { WhiteContainer } from '../../Components/atoms/WhiteContainer';
import { ModalState } from '../../Components/organisms/ModalState';
import { removeModal, resumeGame } from 'App/Redux/modules/game';
import { style } from './GameModal.style';


class GameModal extends React.Component {

  constructor() {
    super();
  }

  handleResume = () => {
    const { removeModal, resumeGame } = this.props;
    removeModal();
    resumeGame(false);
  }

  render() {
    const { navigation: { state: { params } } } = this.props;
    return (
      <View style={style.container}>
        <ModalState onResume={this.handleResume} params={params} />
      </View>
    )
  }
}

const mapDispatchToProps = {
  removeModal,
  resumeGame,
}

export default connect(
  null,
  mapDispatchToProps,
)(GameModal)


