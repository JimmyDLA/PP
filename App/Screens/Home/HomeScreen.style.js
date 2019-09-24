import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export const style = StyleSheet.create({
  button: { 
    backgroundColor: 'rgb(52, 152, 219)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 250,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 20,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    ...ApplicationStyles.screen.container,
    margin: 30,
    flex: 1,
    justifyContent: 'center',
  },
  howTo: {
    fontSize: 16,
  },
  logo: {
    backgroundColor: 'rgb(230, 126, 34)',
    height: 300,
    justifyContent: 'center',
    width: 300,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    fontSize: 16,
  },
  title: {
    ...Fonts.style.h2,
    textAlign: 'center',
    marginBottom: 10,
  },
})
