import { StyleSheet, Platform, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,

    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  // mapinput: {
  //   flex: 0,
  //   fontSize: 10
  // }
});
