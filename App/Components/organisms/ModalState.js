import React from 'react';
import { View, Text } from 'react-native';
import { WhiteContainer } from '../atoms/WhiteContainer';
import { Button } from '../molecules/Button';
import { style } from './ModalState.style';

export class ModalState extends React.Component {
  constructor(props) {
    super(props);
    this.handleResume = this.handleResume.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleNextLevel = this.handleNextLevel.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
  }

  //Functions
  handleResume = () => {
    const { onResume } = this.props;
    onResume();
  }

  handleRestart = () => {
    const { onRestart } = this.props;
    onRestart();
  }

  handleNextLevel = () => {
    const { onNextLevel } = this.props;
    onNextLevel();
  }

  handleQuit = () => {
    const { onQuit, onRestart } = this.props;
    onQuit();
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
    const { timeLeft, score } = this.props;
    return (
      <WhiteContainer>
      <View style={style.header}>
        <Text style={style.title}>You Won</Text>
      </View>
      <View style={style.body}>
        <Text style={style.bodyText}>Game: 25</Text>
        <Text style={style.bodyText}>Time Left: {timeLeft}</Text>
        <Text style={style.bodyText}>Bonus: 0</Text>
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

  render() {
    const { params: { paused, won, lost } } = this.props;
    if (paused) {
      return this.renderPause();
    }

    if (won) {
      return this.renderWin();
    }

    if (lost) {
      return this.renderLose();
    }

    return(
      <WhiteContainer />
    )
  }
}
