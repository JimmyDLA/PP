import React from 'react';
import { View, Text } from 'react-native';
import { style } from 'App/Screens/Game/GameScreen.style';

export class Selection extends React.Component {
  constructor(props) {
    super(props);
  }

  //Functions

  render() {
    const { shapes, renderShape, sectionColor, grabbedShape = {} } = this.props;

    return(
      <View style={[style.selectionContainer, sectionColor && { backgroundColor: sectionColor } ]}>
        {shapes.map((shape, id) => (
          <View key={`${shape.name}${id}`} style={{...style.shapeContainer, borderWidth: 0, opacity: grabbedShape.id === shape.id ? 0 : 1 }}>
            {renderShape(shape, shape.id)}
          </View>
        ))}
      </View>
    )
  }
}
