import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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
    borderWidth: hp(0.5),
    borderColor: 'black',
  },
  innerMatrix: {
    // padding: 5, 
    height: '100%', 
    width: '100%', 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  selectionContainer: { 
    height: '42%',
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statsContainer: { 
    height: '12%',
    width: '100%',
    borderColor: 'yellow',
    borderWidth: 2,
  },
  backgroundImage: { 
    height: '100%',
    width: '100%',
  },
  shapeImg: { 
    width: '100%',
  },
  slopHit: { 
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shapeContainer: { 
    height: hp(8.2),
    width: wp(19.5),
    borderWidth: hp(0.1),
    borderColor: 'black',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  subContainr: { 
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
  },
  time: { 
    fontSize: 16,
    fontWeight: '600'
  },
  score: { 
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 5,
  },
  pause: { 
    width: 10,
  },
  column: { 
    width: '50%'
  },
})
