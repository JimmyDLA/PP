import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CountDown from 'react-native-countdown-component';
import pauseImg from 'App/Assets/Images/pause.png'
import { style } from 'App/Screens/Game/GameScreen.style';

export const Status = ({ 
  won, 
  time,
  score,
  level,
  timeID,
  timeLeft,
  gamePaused,
  handleTime,
  handlePause,
  handleGameOver,
 }) => {
  return(
    <View style={style.statsContainer}>
      <View style={style.column0}>
        <View style={style.subContainer}>
          <Text style={style.time}>Time:</Text>
          {won ? (
            <Text style={style.score}>{timeLeft}</Text>
          ) : (
            <CountDown
              id={timeID}
              until={time}
              onFinish={handleGameOver}
              onPress={() => alert('hello')}
              size={14}
              digitStyle={{backgroundColor: 'transparent', width: 20}}
              timeToShow={['M','S']}
              timeLabels={{}}
              showSeparator
              running={!gamePaused}
              onChange={handleTime}
            />
          )}
        </View>
        <View style={style.subContainer}>
          <Text style={style.time}>Score:</Text>
          <Text style={style.score}>{score}</Text>
        </View>
      </View>
      <View style={style.column1}>
        <View style={style.subContainer}>
          <Text style={style.time}>Level: {level}</Text>
        </View>
      </View>
      <View style={style.column2}> 
        <View style={[style.subContainer, style.subContainer2] }>
          <TouchableOpacity style={style.pauseContainer} onPress={handlePause}>
            <Image resizeMode="contain" style={style.pause} source={pauseImg} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
