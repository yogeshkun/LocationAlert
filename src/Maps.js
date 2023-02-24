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
import homeMarker from './img/HomeMaker.png';
import { ClearAddr, SendAddr } from './api/ApiReq';
import axios from 'axios';

const markerImg = require('./img/HomeMaker.png');

function Maps() {
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
  const [Markerposition, setMaker] = useState([]);

  const [PolygonMarker, setPolygonMarker] = useState([]);

  useEffect(() => {
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
      ClearAddr(url);
      
    });
  }, []);


  

  const handleMarkerPress = event => {
    const {coordinate} = event.nativeEvent;
    var ArrayPosition = Markerposition.length + 1;
    var Markertitle = 'Marker ' + ArrayPosition;
    var MakerDesc = 'This is marker ' + ArrayPosition;

    setMaker([
      ...Markerposition,
      {
        coordinate: event.nativeEvent.coordinate,
        title: Markertitle,
        description: MakerDesc,
      },
    ]);

    setPolygonMarker([
      ...PolygonMarker,
      {latitude: coordinate.latitude, longitude: coordinate.longitude},
    ]);
  };

  const onPress = () => {
    setMaker([]);
    setPolygonMarker([]);
  };

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
          onPress={handleMarkerPress}
          provider={PROVIDER_GOOGLE}
          enableZoomControl={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}>
          {/* Polygon Created */}
          {Markerposition.length > 2 ? (
            <Polygon
              coordinates={PolygonMarker}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={2}
              tappable={true}
            />
          ) : null}

          {/* Marker Created */}
          {Markerposition.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
      <TouchableOpacity
        style={styles.MyButton}
        onPress={onPress}></TouchableOpacity>
    </>
  );
}

const MarkerDone = ({
  key,
  coordinates,
  title = 'Maker',
  description = ' This is the Marker',
}) => {
  return (
    <>
      <MarkerDone
        key={key}
        coordinate={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }}
        title={title}
        description={description}
        onDrag={() => console.log('onDrag', arguments)}
        onDragStart={() => console.log('onDragStart', arguments)}
        draggable
        // icon={homeMarker}
        // image={}
      >
        {/* <CustomMarker /> */}
      </MarkerDone>
    </>
  );
};

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

export default Maps;
