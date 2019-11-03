import React from 'react'
import {
  Platform, 
  Text, 
  View,
  ActivityIndicator,
  TouchableOpacity, 
} from 'react-native';
import { style } from './Button.style';

export const Button = ({
  label, onPress, loading, disabled, secondary,
}) => (
  <TouchableOpacity 
    style={[style.button, secondary && {backgroundColor: 'white'}]} 
    onPress={onPress} 
    disabled={disabled}
  >
    <View style={style.container}>
      {loading ? (
        <ActivityIndicator size="small" color="gray" />
      ) : (
        <Text style={[style.label, secondary && {color: 'rgb(52,152,219)'}]}>
          {label}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);
