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
  aboutToStart,
  removeModal, 
  pauseGame,
  quitGame,
  gameTime,
  gameWon,
} from 'App/Redux/modules/game';
import { style } from './GameModal.style';


class GameModal extends React.Component {

  constructor() {
    super();
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

  handleResume = () => {
    const { removeModal, pauseGame } = this.props;
    pauseGame(false);
    removeModal();
  }

  handleReset = isPaused => {
    const { 
      updateShapesFound, 
      removeModal, 
      pauseGame,
      gameTime,
      gameWon,
      level,
    } = this.props;

    const isLevel1 = level === 1;
    const time = isLevel1 ? 60 : 60 - (level * 2);
    const timeID = this.makeid(5);
    updateShapesFound([]);
    gameTime({ time, timeID })
    pauseGame(isPaused);
    gameWon({ won: false, gameEnded: false });
    removeModal();
    this.handleGetShapes();

  }

  handleRestart = () => {
    const { updateShapesObject } = this.props;
    const emptyObject = {
      shapesInMatrix: [],
      shapesInSelection: [],
    }
    updateShapesObject(emptyObject);
    this.handleReset(false);
  }

  handleNextLevel = () => {
    const { updateShapesInfo } = this.props;
    updateShapesInfo([])
    this.handleRestart();
  }

  handleQuit = () => { 
    const level = 1;
    const score = 0;
    const { quitGame } = this.props;

    this.handleReset(true);
    quitGame({ level, score });
  }

  handleGetShapes = () => {
    const { updateShapesObject } = this.props;
    const objectShapes = {
      shapesInMatrix: getShapes(),
      shapesInSelection: getShapes(),
    }
    updateShapesObject(objectShapes);
  }

  render() {
    const { 
      won,
      bonus,
      score,
      timeLeft, 
      gameEnded,
      gamePaused,
      removeModal,
      aboutToStart,
      gameAboutToStart, 
    } = this.props;

    const params = {
      won,
      gameEnded,
      gamePaused,
      gameAboutToStart, 
    }

    return (
      <View style={style.container}>
        <ModalState 
          onAboutToStart={aboutToStart}
          onResume={this.handleResume} 
          onRestart={this.handleRestart}
          onQuit={this.handleQuit}
          onRemoveModal={removeModal}
          onNextLevel={this.handleNextLevel}
          timeLeft={timeLeft}
          params={params}
          score={score}
          bonus={bonus}
        />
      </View>
    )
  }
}

const mapStateToProps = ({
  game: {
    won,
    bonus,
    score,
    level,
    timeLeft,
    gameEnded,
    gamePaused,
    gameAboutToStart,
  }
}) => ({
  won,
  bonus,
  score,
  level,
  timeLeft,
  gameEnded,
  gamePaused,
  gameAboutToStart,
})

const mapDispatchToProps = {
  updateShapesObject,
  updateShapesFound,
  updateShapesInfo,
  aboutToStart,
  removeModal,
  pauseGame,
  quitGame,
  gameTime,
  gameWon,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameModal)


