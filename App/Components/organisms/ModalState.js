import React from 'react';
import { View, Text, Vibration } from 'react-native';
import { WhiteContainer } from '../atoms/WhiteContainer';
import { Button } from '../molecules/Button';
import { style } from './ModalState.style';

export class ModalState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      arr: [3, 2, 1, 'GO!'],
    };

    this.handleResume = this.handleResume.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleNextLevel = this.handleNextLevel.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
    const { gameAboutToStart } = props.params;
    this.interval = gameAboutToStart ? setInterval(() => {
      this.handleCountDown();
    }, 1000) : null;
  }

  //Functions
  handleResume = () => {
    const { onResume, onRemoveModal } = this.props;
    onResume();
  }

  handleRestart = () => {
    const { onRestart } = this.props;
    onRestart();
    Vibration.cancel();
  }

  handleNextLevel = () => {
    const { onNextLevel } = this.props;
    onNextLevel();
  }

  handleQuit = () => {
    const { onQuit, onRestart } = this.props;
    onQuit();
    Vibration.cancel();
  }

  handleCountDown = () => {
    const { onAboutToStart, onRemoveModal } = this.props;
    let { i, arr } = this.state;
    if (i === arr.length - 1) {
      clearInterval(this.interval);
      onAboutToStart({ gameAboutToStart: false, gamePaused: false });
      onRemoveModal();
  } else {
      this.setState({i: i + 1})
    }
  }

  renderPause = () => {
    return (
      <WhiteContainer>
        <View style={style.header}>
          <Text style={style.title}>Game Paused</Text>
        </View>
        <View style={style.body}>
          <Button 
            label="Resume"
            onPress={this.handleResume}
          />
          <Button 
            label="Quit"
            secondary
            onPress={this.handleQuit}
          />
        </View>
      </WhiteContainer>
    )
  }

  renderWin = () => {
    const { timeLeft, score, bonus } = this.props;
    return (
      <WhiteContainer>
      <View style={style.header}>
        <Text style={style.title}>You Won</Text>
      </View>
      <View style={style.body}>
        <Text style={style.bodyText}>Game: 25</Text>
        <Text style={style.bodyText}>Time Left: {timeLeft}</Text>
        <Text style={style.bodyText}>Bonus: {bonus}</Text>
        <Text style={style.bodyText}>Total Score: {score}</Text>
        <Button
          label="Next Level"
          onPress={this.handleNextLevel}
          />
      </View>
    </WhiteContainer>
    )
  }

  renderLose = () => {
    return (
      <WhiteContainer>
        <View style={style.header}>
          <Text style={style.title}>Game Over</Text>
        </View>
        <View style={style.body}>
          <Button 
            label="Try Again"
            onPress={this.handleRestart}
          />
          <Button 
            label="Quit"
            secondary 
            onPress={this.handleQuit}
          />
        </View>
      </WhiteContainer>
    )
  }

  renderAboutToStart = () => {
    const { arr, i } = this.state;

    let countDown = arr[i];

    return(
        <Text style={style.countDown}>
          {countDown}
        </Text>
    )
  }

  render() {
    const { 
      params: {
        won, 
        gameEnded: lost, 
        gamePaused: paused, 
        gameAboutToStart: aboutToStart,
      },
    } = this.props;

    if (aboutToStart) {
      return this.renderAboutToStart();
    }
    
    if (won) {
      return this.renderWin();
    }
    
    if (lost) {
      return this.renderLose();
    }
    
    if (paused) {
      return this.renderPause();
    }

    return(
      <View />
    )
  }
}
