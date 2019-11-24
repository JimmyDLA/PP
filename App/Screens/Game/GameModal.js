import React from 'react';
import {
  View, 
} from 'react-native';
import { connect } from 'react-redux';
import { ModalState } from '../../Components/organisms/ModalState';
import { getShapes } from '../../Helpers/Shapes'
import { 
  updateShapesObject,
  updateShapesFound,
  updateShapesInfo,
  removeModal, 
  resumeGame,
  quitGame,
  gameTime,
} from 'App/Redux/modules/game';
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


  makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  handleRestart = () => {
    const { 
      updateShapesFound, 
      updateShapesInfo,
      removeModal, 
      resumeGame,
      gameTime,
      level,
    } = this.props;

    const time = 90 - level;
    const timeID = this.makeid(5);
    updateShapesFound([]);
    updateShapesInfo([])
    this.handleGetShapes();
    gameTime({ time, timeID })
    resumeGame(false);
    removeModal();
  }

  handleGetShapes = () => {
    const { updateShapesObject } = this.props;
    const objectShapes = {
      shapesInMatrix: getShapes(),
      shapesInSelection: getShapes(),
    }
    updateShapesObject(objectShapes);
  }

  handleNextLevel = () => {
    this.handleRestart();
  }

  handleQuit = () => { 
    const { quitGame } = this.props;
    quitGame();
  }

  render() {
    const { score, timeLeft, navigation: { state: { params } } } = this.props;

    return (
      <View style={style.container}>
        <ModalState 
          onResume={this.handleResume} 
          onRestart={this.handleRestart}
          onQuit={this.handleQuit}
          onNextLevel={this.handleNextLevel}
          timeLeft={timeLeft}
          params={params}
          score={score}
        />
      </View>
    )
  }
}

const mapStateToProps = ({
  game: {
    score,
    timeLeft,
    level,
  }
}) => ({
  score,
  timeLeft,
  level,
})

const mapDispatchToProps = {
  updateShapesObject,
  updateShapesFound,
  updateShapesInfo,
  removeModal,
  resumeGame,
  quitGame,
  gameTime,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameModal)


