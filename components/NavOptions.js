import React from 'react';
import Style from './Style';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '11',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '155',
    title: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatScreen',
  },
];
export default function Options() {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`bg-gray-200 m-2 p-2 pl-6 pt-4 w-40`}
          disabled={!origin}>
          <View style={tw`${!origin && 'opacity-20 '}`}>
            <Image style={Style.image} source={{ uri: item.image }} />
            <Text style={tw`mt-2 font-semibold text-lg`}>{item.title}</Text>
            <Icon
              style={tw`bg-black rounded-full w-10 p-2 `}
              name='arrowright'
              color='white'
              type='antdesign'
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({});
