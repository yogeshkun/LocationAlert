import { View, Text, StyleSheet } from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect} from 'react';
import MapViewDirections from 'react-native-maps-directions';


const findPath = () => {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyC4Uge0SQ-za7VyuIQlfuBDBDWASu5J_gk';
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
        });
      }, []);


  const [Markerposition, setMaker] = useState([]);

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

    
  };

 
  return (
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
        

          {/* Marker Created */}
          {Markerposition.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}

{(Markerposition.length >= 2) && (
          <MapViewDirections
            origin={Markerposition[0].coordinate}
            // waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): undefined}
            destination={Markerposition[1].coordinate}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            // onStart={(params) => {
            //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            // }}
            // onReady={result => {
            //   console.log(`Distance: ${result.distance} km`)
            //   console.log(`Duration: ${result.duration} min.`)

            //   this.mapView.fitToCoordinates(result.coordinates, {
            //     edgePadding: {
            //       right: (width / 20),
            //       bottom: (height / 20),
            //       left: (width / 20),
            //       top: (height / 20),
            //     }
            //   });
            // }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR', errorMessage);
            }}
          />
        )}
        </MapView>
      </View>
  )
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
 
  });
  

export default findPath;