import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { useNavigation } from '@react-navigation/native'

const data = [
  {
    id: '11',
    title: 'Check Bus',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen'
  },
  {
    id: '155',
    title: 'Check Train',
    image: 'https://img.freepik.com/premium-photo/express-train-white-color-3d-white-background_725455-250.jpg',
    screen: 'trainScreen'
  }
]

export default function Options() {
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)
  const [modalVisible, setModalVisible] = useState(false)

  const handlePress = (item) => {
    if (item.id === '155') {
      setModalVisible(true); // Show modal for "train"
    } else {
      navigation.navigate(item.screen)
    }
  }

  return (
    <View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={[
              tw`bg-gray-200 m-2 p-2 pl-6 pt-4 w-40`,
              item.id === '155' && tw`opacity-50`,
            ]}
          >
            <View style={tw`${!origin && 'opacity-20'}`}>
              <Image style={styles.image} source={{ uri: item.image }} />
              <Text style={tw`mt-2 font-semibold text-lg`}>{item.title}</Text>
              <Icon
                style={tw`bg-black rounded-full w-10 p-2`}
                name="arrowright"
                color="white"
                type="antdesign"
              />
            </View>
          </TouchableOpacity>
        )} />
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Coming Soon!
            </Text>
            <Text style={styles.modalText2}>
              We are currently working on this feature and will be release in soon
            </Text>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal >
    </View >
  )
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: '#000',
    width: 220,
    height: 45
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalText2: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 12,
    width: '200'

  }
})
