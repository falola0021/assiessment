import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
const data = [
  {
    id: '11',
    title: 'UberX',
    image: 'https://links.papareact.com/3pn',
    multiplier: '1',
  },
  {
    id: '164',
    title: 'Uber XL',
    image: 'https://links.papareact.com/5w8',
    multiplier: '1.2',
  },
  {
    id: '828278',
    title: 'Uber Lux',
    image: 'https://links.papareact.com/7pf',
    multiplier: '1.75',
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOption = () => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={[tw`bg-white flex-grow`, styles.container]}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigationCard')}
          style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}>
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Rid - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-5 ${
              item.id === selected?.id && 'bg-gray-200'
            } `}
            onPress={() => setSelected(item)}>
            {/* <View style={tw`${!origin && 'opacity-20 '}`}> */}
            <Image
              style={{
                width: 90,
                height: 90,
                resizeMode: 'contain',
              }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
              <Text style={{ fontSize: 10 }}>
                {travelTimeInformation?.duration?.text}
                Travel Time
              </Text>
            </View>
            <Text style={tw`text-lg `}>
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'NGN',
              }).format(
                (travelTimeInformation?.duration?.value *
                  SURGE_CHARGE_RATE *
                  item.multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`text-center text-white text-xl`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default RideOption;
