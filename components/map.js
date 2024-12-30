import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { MAPS_APIKEY } from '@env';
import {
  selectOrigin,
  selectDestination,
  setTravelTimeInformation,
  selectedCarLocation
} from '../slices/navSlice';


const data = [
  {
    id: '11',
    title: 'Sienna',
    image: 'https://links.papareact.com/3pn',
    multiplier: '1',
    location: { latitude: 5.78825, longitude: 4.4324 }
  },
  {
    id: '164',
    title: 'BRT',
    image: 'https://links.papareact.com/5w8',
    multiplier: '1.2',
    location: { latitude: 5.78825, longitude: -3.4324 }
  },
  {
    id: '828278',
    title: 'Shuttle',
    image: 'https://links.papareact.com/7pf',
    multiplier: '1.75',
    location: { latitude: 6.78825, longitude: 2.4324 }
  }
]

const MapScreen = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const carLocation = useSelector(selectedCarLocation);  // Car location from Redux state
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    if (!origin || !destination) return;

    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getRoute = async () => {
      const originCoordinates = `${origin.location.lng},${origin.location.lat}`;
      const destinationCoordinates = `${destination.location.lng},${destination.location.lat}`;

      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoordinates};${destinationCoordinates}?geometries=geojson&access_token=${MAPS_APIKEY}`
        );
        const data = await response.json();

        if (data.routes.length > 0) {
          const route = data.routes[0].geometry.coordinates;
          setRouteCoordinates(route);

          const travelTime = data.routes[0].duration;
          const distance = data.routes[0].distance;

          dispatch(setTravelTimeInformation({ duration: travelTime, distance }));
        }
      } catch (error) {
        console.error('Error fetching route from Mapbox:', error);
      }
    };

    getRoute();
  }, [origin, destination, MAPS_APIKEY, dispatch, carLocation]);

  if (!origin || !destination || routeCoordinates.length === 0) return <Text>Loading...</Text>;

  return (
    <MapView
      ref={mapRef}
      mapType='mutedStandard'
      style={tw`flex-1`}
      region={{
        latitude: (origin.location.lat + destination.location.lat) / 2,
        longitude: (origin.location.lng + destination.location.lng) / 2,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}>

      <Polyline
        coordinates={routeCoordinates.map((coord) => ({
          latitude: coord[1],
          longitude: coord[0],
        }))}
        strokeWidth={4}
        strokeColor='black'
      />

      {/* Origin Marker */}
      <Marker
        coordinate={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        }}
        title='Origin'
        description={origin.description}
        identifier='origin'
      />

      {/* Destination Marker */}
      <Marker
        coordinate={{
          latitude: destination.location.lat,
          longitude: destination.location.lng,
        }}
        title='Destination'
        description={destination.description}
        identifier='destination'
      />


      <Marker

        coordinate={{
          latitude: carLocation?.location?.latitude,
          longitude: carLocation?.location?.longitude
        }}
        title={carLocation?.title}
        description={`${carLocation?.numberOfSeatLeft} seat(s) left`}
        pinColor="blue"
        identifier={`1`}
      >
        <View style={{ backgroundColor: '#f3f3f3', }}>
          <Text style={{ color: 'red', fontSize: 12, fontWeight: 'bold' }}>
            {carLocation?.title}
          </Text>
          <Image
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              marginTop: -20
            }}
            source={{ uri: carLocation?.image }}
          />
        </View>
      </Marker>



    </MapView>
  );
};

export default MapScreen;
