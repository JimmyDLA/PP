import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export const style = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(230,230,230)',
  },
  matrixContainer: { 
    height: '42%',
    width: '100%',
    borderColor: 'pink',
    borderWidth: 2,
    // backgroundColor: 'pink',
  },
  selectionContainer: { 
    height: '42%',
    width: '100%',
    borderColor: 'teal',
    borderWidth: 2,
    justifyContent: 'space-around',
    flexDirection: 'row',
    // backgroundColor: 'teal',
  },
  statsContainer: { 
    height: '12%',
    width: '100%',
    borderColor: 'yellow',
    borderWidth: 2,
    // backgroundColor: 'yellow',
  },
  backgroundImage: { 
    height: '100%',
    width: '100%',
  },
  shapeImg: { 
    height: 40,
    width: 40
  },
})
