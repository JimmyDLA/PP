import React from 'react';
import { View } from 'react-native';
import { style } from 'App/Screens/Game/GameScreen.style';

export const Matrix = React.memo(({ shapes, renderShape, saveLocation, saveBorder }) => {
  return(
    <View style={style.matrixContainer} onLayout={saveBorder}>
      <View style={style.innerMatrix}>
        {shapes.map(shape => (
          <View
            onLayout={(e) => saveLocation(e, shape, shape.id)}
            key={`${shape.name}${shape.id}`} 
            style={style.shapeContainer}
          >
            {console.log('matrix render shape ID: ', shape.id)}
            {renderShape(shape, shape.id, true)}
          </View>
        ))}
      </View>
    </View>
  )
});
