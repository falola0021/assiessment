import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core';
import NavFavourite from './NavFavourite';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MAPS_APIKEY } from '@env';

const NavigationCard = () => {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const handleSearch = async (text) => {
    setQuery(text);

    if (text.length >= 2) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            text
          )}.json?access_token=${MAPS_APIKEY}&autocomplete=true&language=en`
        );
        const data = await response.json();
        setPredictions(data.features || []);
      } catch (error) {
        console.error('Error fetching predictions:', error);
        setPredictions([]);
      }
    } else {
      setPredictions([]);
    }
  };

  const handleSelect = (item: any) => {
    const { center, place_name } = item;

    dispatch(
      setDestination({
        location: { lat: center[1], lng: center[0] },
        description: place_name,
      })
    );
    navigation.navigate('RideOptionCard');
    setQuery(place_name);
    setPredictions([]);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Adedayo</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Where To?"
            value={query}
            onChangeText={handleSearch}
          />
          {predictions.length > 0 && (
            <FlatList
              data={predictions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <Text style={styles.suggestion}>{item.place_name}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          )}
        </View>
        <NavFavourite />
      </View>
      <View
        style={tw`flex flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionCard')}
          style={tw`justify-between flex flex-row bg-black w-24 rounded-full py-3 px-4`}>
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between rounded-full py-3 px-4 w-24`}>
          <Icon
            name="bus"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-black text-center`}>Train</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  suggestionsList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    maxHeight: 200,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    fontSize: 16,
  },
});

export default NavigationCard;
