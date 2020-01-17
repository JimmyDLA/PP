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
    const { removeModal, resumeGame } = this.props;
    removeModal();
    resumeGame(false);
  }

  handleReset = () => {
    const { 
      updateShapesFound, 
      updateShapesInfo,
      removeModal, 
      resumeGame,
      gameTime,
      gameWon,
      level,
    } = this.props;

    const time = 90 - level;
    const timeID = this.makeid(5);
    // updateShapesInfo([])
    updateShapesFound([]);
    gameTime({ time, timeID })
    resumeGame(false);
    gameWon({ won: false });
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
    this.handleReset();
  }

  handleNextLevel = () => {
    const { updateShapesInfo } = this.props;
    updateShapesInfo([])
    this.handleRestart();
  }

  handleQuit = () => { 
    const { quitGame } = this.props;

    this.handleReset();
    quitGame();
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
  gameWon,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameModal)


