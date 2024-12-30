import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import tw from 'tailwind-react-native-classnames';
import { useSelector, useDispatch } from 'react-redux';
import { MAPS_APIKEY } from '@env';

import {
  selectOrigin,
  selectDestination,
  setTravelTimeInformation,
} from '../slices/navSlice';

MapboxGL.setAccessToken(MAPS_APIKEY);

const Map = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef < MapboxGL.MapView > (null);

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current?.fitBounds(
      [origin.location.lng, origin.location.lat],
      [destination.location.lng, destination.location.lat],
      50 // Padding
    );
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.location.lng},${origin.location.lat};${destination.location.lng},${destination.location.lat}?access_token=YOUR_MAPBOX_ACCESS_TOKEN`
        );
        const data = await response.json();
        if (data.routes && data.routes.length) {
          const route = data.routes[0];
          const distanceTimeInfo = {
            distance: route.distance, // in meters
            duration: route.duration, // in seconds
          };
          dispatch(setTravelTimeInformation(distanceTimeInfo));
        }
      } catch (error) {
        console.error('Error fetching travel time:', error);
      }
    };

    getTravelTime();
  }, [origin, destination]);

  return (
    <MapboxGL.MapView
      ref={mapRef}
      style={tw`flex-1`}
      styleURL={MapboxGL.StyleURL.Street}>
      {origin?.location && (
        <MapboxGL.PointAnnotation
          id="origin"
          coordinate={[origin.location.lng, origin.location.lat]}>
          <View style={{ backgroundColor: 'blue', borderRadius: 10, padding: 5 }} />
        </MapboxGL.PointAnnotation>
      )}
      {destination?.location && (
        <MapboxGL.PointAnnotation
          id="destination"
          coordinate={[destination.location.lng, destination.location.lat]}>
          <View style={{ backgroundColor: 'red', borderRadius: 10, padding: 5 }} />
        </MapboxGL.PointAnnotation>
      )}
      {origin && destination && (
        <MapboxGL.ShapeSource
          id="routeSource"
          shape={{
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [origin.location.lng, origin.location.lat],
                [destination.location.lng, destination.location.lat],
              ],
            },
          }}>
          <MapboxGL.LineLayer
            id="routeLine"
            style={{
              lineWidth: 3,
              lineColor: 'black',
            }}
          />
        </MapboxGL.ShapeSource>
      )}
    </MapboxGL.MapView>
  );
};

export default Map;
