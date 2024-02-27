import {StyleSheet, Text, View, PermissionsAndroid,TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Geolocation, {watchPosition} from 'react-native-geolocation-service';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function Location({navigation}) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location, setLocation] = useState();
  const [wholeLocation, setWholeLocation] = useState([]);
  const [region, setRegion] = useState({
    latitude: null,
    latitudeDelta: 0.0922,
    longitude: null,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    Platform.OS == 'ios'
      ? Geolocation.requestAuthorization('always').then(res => {
          cuRRentlocation();
          console.log('res', res);
        })
      : requestLocationPermission();
  }, []);

  const cuRRentlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getPlace(position.coords.latitude, position.coords.longitude);
        // console.log('users location', position.coords.longitude);

        // console.log('users location', position.coords.latitude);
      },
      error => {
        console.log('error in loc', error);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        cuRRentlocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getPlace = (latitude, longitude) => {
    let radius = 100;

    let mapKey = 'AIzaSyCmhmQiZWqaMzKclPUY-mEshxF7Lj4T4NI';
    let request = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${mapKey}`;
    return Axios.get(request)
      .then(({data, status}) => {
        console.log('data', data.results[0].address_components);
        setWholeLocation(data.results[0].address_components);

        const currentCity = data.results[0].address_components.filter(
          x =>
            x.types.filter(t => t == 'administrative_area_level_2').length > 0,
        )[0].long_name;
        const currentTown = data.results[0].address_components.filter(
          x => x.types.filter(t => t == 'political').length > 0,
        )[0].long_name;
        const currentRoad = data.results[0].address_components.filter(
          x => x.types.filter(t => t == 'route' || t == 'plus_code').length > 0,
        )[0].long_name;

        setLocation(`${currentRoad} ${currentTown} ${currentCity}`);
      })
      .catch(e => {
        console.log('err', e);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.mapview}>
        {region.latitude && region.longitude ? (
          <MapView
            // customMapStyle={mapStandardStyle}
            // showsMyLocationButton={true}
            // followsUserLocation={true}
            // zoomTapEnabled={true}
            // strokeWidth={3}
            // strokeColor="hotpink"
            zoomEnabled={true}
            // rotateEnabled={true}
            center={true}
            style={{flex: 1}}
            initialRegion={{
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.09,
            }}>
            <Marker
              draggable
              pinColor="red"
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}></Marker>
          </MapView>
        ) : null}
      </View>

<TouchableOpacity 
onPress={()=>navigation.navigate('Setting')}
style={styles.close}>
<AntDesign 
        name='close' size={20}/>
</TouchableOpacity>

      <View style={styles.locationname}>
        <MaterialIcons 
        name='my-location' size={20}/>
        <View style={styles.nameinput}>
          <Text style={styles.text}>{location}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapview: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  locationname: {
    width:wp(75),
    height:60,
    backgroundColor: '#F8F8F8',
    position: 'absolute',
    borderRadius:10,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
    marginTop:40
  },
  nameinput:{
    width:wp(55),
    height:wp(10),
    backgroundColor:'#FFFFFF',
    borderRadius:10,
    justifyContent:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 1,




  },
  text:{
    color:'#000',
    fontFamily:'Poppins-Regular',
    fontSize:10,
    paddingLeft:10
  },
  close:{
    position:'absolute',
    backgroundColor:'#F8F8F8',
    borderRadius:5,
    alignSelf:'flex-end',
    marginTop:10,
    right:15
  }
});
