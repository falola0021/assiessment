import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements/dist/icons/Icon';
const data = [
  {
    id: '123',
    location: 'home',
    icon: 'home',
    destination: 'Code Street,London ,Uk',
  },
  {
    id: '127',
    location: 'Work',
    icon: 'briefcase',
    destination: 'London Eye,London ,Uk',
  },
];

const NavFavourite = () => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 1 }]} />
      )}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`flex-row p-5 items-center`}>
          <Icon
            style={tw`bg-black rounded-full mr-4 bg-gray-300 p-3 `}
            name={item.icon}
            color='white'
            type='ionicon'
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500 `}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourite;
