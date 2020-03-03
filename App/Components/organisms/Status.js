import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CountDown from 'react-native-countdown-component';
import pauseImg from 'App/Assets/Images/pause.png'
import { style } from 'App/Screens/Game/GameScreen.style';

export const Status = React.forwardRef((props, ref) => {
  const {
  time,
  score,
  level,
  timeID,
  gamePaused,
  handlePause,
  handleGameOver,
  isFrozen,
  isAddTime,
  showPowerupTime
  } = props;
  
  return(
    <View style={style.statsContainer}>

      <View style={style.column0}>
        <View style={style.subContainer}>
          <Text style={style.time}>Level: {level}</Text>
        </View>

        <View style={style.subContainer}>
          <Text style={style.time}>Score:</Text>
          <Text style={style.score}>{score}</Text>
        </View>
      </View>

      <View style={style.column1}>
        <CountDown
          id={timeID}
          ref={ref}
          until={time}
          onFinish={handleGameOver}
          size={25}
          digitStyle={{backgroundColor: 'transparent', width: 40}}
          timeToShow={['M','S']}
          timeLabels={{}}
          showSeparator
          running={!gamePaused && !isFrozen }
        />
        {showPowerupTime && (
          <Text style={[style.timeIndicator, {color: isAddTime ? 'rgb(0,100,0)' : 'rgb(220,20,60)' }]}>
            {isAddTime ? '+5' : '-5'}
          </Text>
        )}
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
})
