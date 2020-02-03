import React from 'react';
import { View } from 'react-native';
import { Shape } from './Shape';
import { style } from 'App/Screens/Game/GameScreen.style';

export const Matrix = ({ 
  shapes, renderShape, saveLocation, saveBorder, backgroundColor, square,
}) => {
  return (
    <View style={style.matrixContainer} onLayout={saveBorder}>
      <View style={style.innerMatrix}>
        {shapes.map((shape, i) => (
          <Shape 
            i={i}
            shape={shape}
            isPowerup={i === square}
            renderShape={renderShape}
            saveLocation={saveLocation}
            backgroundColor={backgroundColor}
            key={`${shape.name}${shape.id}`} 
          />
        ))}
      </View>
    </View>
  );
}

