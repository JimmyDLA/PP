import React from 'react';
import { View, Text } from 'react-native';
import { WhiteContainer } from '../atoms/WhiteContainer';
import { Button } from '../molecules/Button';
import { style } from './ModalState.style';

export class ModalState extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnResume = this.handleOnResume.bind(this);
  }

  //Functions
  handleOnResume = () => {
    debugger
    const { onResume } = this.props;
    onResume();
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
            onPress={this.handleOnResume}
          />
          <Button 
            label="Quit"
            secondary
            // onPress={}
          />
        </View>
      </WhiteContainer>
    )
  }

  renderWin = () => {

    return (
      <WhiteContainer>
      <View style={style.header}>
        <Text style={style.title}>You Won</Text>
      </View>
      <View style={style.body}>
        {/* <Text>Game: 25</Text>
        <Text>Time Left: {}</Text>
        <Text>Bonus: `${0}`</Text>
        <Text>Total Score: {}</Text> */}
        <Button 
          label="Quit"
          // onPress={}
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
          onPress={this.handleOnResume}
        />
        <Button 
          label="Quit"
          secondary 
          // onPress={}
        />
      </View>
    </WhiteContainer>
    )
  }

  render() {
    const { params: { paused, won, lost } } = this.props;
debugger
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
