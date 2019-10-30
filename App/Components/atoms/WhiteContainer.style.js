import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const containerDropShadow = Platform.select({
  android: {
    elevation: 2,
  },
  ios: {
    shadowColor: 'rgb(50,50,50)',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
});

export const style = StyleSheet.create({
  container: { 
    height: hp(30), 
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
    marginTop: wp('4%'),
    marginHorizontal: wp('4%'),
    backgroundColor: 'rgb(250,250,250)',
    ...containerDropShadow,
    borderColor: 'rgb(150,150,150)',
    borderWidth: 1,
    borderRadius: 15,
  },
});
