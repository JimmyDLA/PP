import React from 'react';
import { View, FlatList } from 'react-native';
import { style } from 'App/Screens/Game/GameScreen.style';

export const Matrix = ({ shapes, renderShape, saveLocation, saveBorder }) => (
  <View style={style.matrixContainer} onLayout={saveBorder}>
    <View style={style.innerMatrix}>
      {shapes.map((shape, i) => (
        <View
          onLayout={e => i < 1 && saveLocation(e)}
          key={`${shape.name}${shape.id}`} 
          style={style.shapeContainer}
        >
          {renderShape(shape, shape.id, true)}
        </View>
      ))}
    </View>
  </View>
);

