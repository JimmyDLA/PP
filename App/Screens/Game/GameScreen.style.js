import { StyleSheet } from 'react-native'
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
    borderColor: 'black',
    borderTopWidth: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  subContainer: { 
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
  },
  subContainer2: { 
    justifyContent: 'flex-end', 
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
  pauseContainer: { 
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pause: { 
    width: 10,
  },
  play: { 
    height: 30,
  },
  column1: { 
    marginTop: 5,
  },
  column2: { 
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
})
