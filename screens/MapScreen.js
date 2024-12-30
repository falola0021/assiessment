import React from 'react';
import tw from 'tailwind-react-native-classnames';
import {
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  SafeAreaViewBase,
  TouchableOpacity,
} from 'react-native';
import Map from '../components/map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationCard from '../components/NavigationCard';
import RideOptionCard from '../components/RideOptionCard';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    // <SafeAreaView style={styles.container}>

    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
        <Icon name='menu' />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigationCard'
            component={NavigationCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='RideOptionCard'
            component={RideOptionCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight
//   }
// })

export default MapScreen;
