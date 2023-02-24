import MapView, {PROVIDER_GOOGLE, Marker, Polygon} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {ClearAddr, SendAddr} from '../api/ApiReq';

function SenderLoc() {
  const [Myposition, setPosition] = useState([
    {
      coordinate: {
        latitude: 10,
        longitude: 10,
      },
      title: 'Marker 1',
      description: 'This is marker 1',
    },
  ]);

  useEffect(() => {
    ClearAddr();

    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setPosition([
        {
          coordinate: {
            latitude: crd.latitude,
            longitude: crd.longitude,
          },
          title: 'Marker 1',
          description: 'This is marker 1',
        },
      ]);

      const url = 'https://yogilocationalertapi.onrender.com/api/location';

      const params = JSON.stringify({
        latitude: crd.latitude,
        longitude: crd.longitude,
      });

      SendAddr(url, params);
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: Myposition[0].coordinate.latitude,
            longitude: Myposition[0].coordinate.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0,
          }}
          scrollEnabled={true}
          //   onPress={handleMarkerPress}
          provider={PROVIDER_GOOGLE}
          enableZoomControl={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}></MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  MyButton: {
    position: 'absolute',
    right: 30,
    bottom: 60,
    width: 50,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FF00',
    borderRadius: 10,
  },
});

export default SenderLoc;
