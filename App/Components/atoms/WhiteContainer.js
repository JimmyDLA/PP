import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { style } from './WhiteContainer.style';

export const WhiteContainer = ({ children, containerStyle }) => {
  return (
    <View style={[style.container, containerStyle]}>
      {children}
    </View>
  );
};

WhiteContainer.propTypes = {
  children: PropTypes.any,
  containerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

