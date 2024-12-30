import React, { useState } from 'react';
import { Text, SafeAreaView, Image, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Style from './Style';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourite from '../components/NavFavourite';
import { MAPS_APIKEY } from '@env';
const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState([]);
  const dispatch = useDispatch();


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

  const handleSelect = (item) => {
    const { center, place_name } = item;

    dispatch(
      setOrigin({
        location: { lat: center[1], lng: center[0] },
        description: place_name,
      })
    );
    dispatch(setDestination(null));
    setQuery(place_name);
    setPredictions([]);
  };

  return (
    <SafeAreaView style={[tw`bg-white h-full`, [Style.AndroidSafeArea]]}>
      <View style={tw`p-5`}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 40 }}>
          RIDEE-CHEKK
        </Text>
        <View>
          <TextInput
            placeholder="Where From?"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              borderRadius: 5,
              fontSize: 18,
              marginBottom: 10,
            }}
            value={query}
            onChangeText={handleSearch}
          />
          {predictions.length > 0 && (
            <FlatList
              data={predictions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <Text style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
                    {item.place_name}
                  </Text>
                </TouchableOpacity>
              )}
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#ccc',
                borderTopWidth: 0,
                maxHeight: 200,
              }}
            />
          )}
        </View>
        <NavOptions />
        <NavFavourite />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

