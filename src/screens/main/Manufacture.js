import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geolocation, {watchPosition} from 'react-native-geolocation-service';
import MapView, {Marker, Polyline, Callout} from 'react-native-maps';
import Axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ReadMore from '@fawazahmed/react-native-read-more';
import {useSelector} from 'react-redux';
import Loader from '../../components/loader';
import {Detail_API} from '../../components/ApiScreen';
import { family } from '../../constant/Index';
import Indicator from '../../components/Indicator';

const Manufacture = ({navigation, route}) => {
  const {id} = route.params;

  const user = useSelector(state => state.user.user);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location, setLocation] = useState();
  const [wholeLocation, setWholeLocation] = useState([]);

  
  

  


 

  const [indicator, setIndicator] = useState(false);
  const [detail, setDetailss] = useState([]);
  const latitude1 =detail.latitude;
  const longitude2 = detail.longitude
  
  const [region, setRegion] = useState({
    latitude:latitude1,
    latitudeDelta: 0.0922,
    longitude:longitude2,
    longitudeDelta: 0.0421,
  });

   

  useEffect(() => {
    Detail_data(id);
  }, []);

  const Detail_data = async id => {
    setIndicator(true);
    Detail_API({url: 'product-detail', Auth: user.token, id: id})
      .then(res => {
        setDetailss(res.product.manufacture);
        setIndicator(false);
      })
      .catch(err => {
        console.log('err in article-list', err);
        setIndicator(false);
      });
  };

  // useEffect(() => {
  //   Platform.OS == 'ios'
  //     ? Geolocation.requestAuthorization('always').then(res => {
  //         cuRRentlocation();
  //         console.log('res', res);
  //       })
  //     : requestLocationPermission();
  // }, []);

  // const cuRRentlocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setRegion({
  //         ...region,
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //       getPlace(position.coords.latitude, position.coords.longitude);
  //       // console.log('users location', position.coords.longitude);

  //       // console.log('users location', position.coords.latitude);
  //     },
  //     error => {
  //       console.log('error in loc', error);
  //     },
  //     {
  //       enableHighAccuracy: true,
    
  //     },
  //   );
  // };
  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       cuRRentlocation();
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const getPlace = (latitude, longitude) => {

  //   let radius = 100;
 
  //   let mapKey = 'AIzaSyCmhmQiZWqaMzKclPUY-mEshxF7Lj4T4NI';
  //   let request = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${mapKey}`;
  //   return Axios.get(request)
  //     .then(({data, status}) => {
  //       console.log('data', data.results[0].address_components);
  //       setWholeLocation(data.results[0].address_components);
       
  //       const currentCity = data.results[0].address_components.filter(
  //         x =>
  //           x.types.filter(
  //             t =>
  //               t == 'administrative_area_level_2',
          
  //           ).length > 0,
  //       )[0].long_name;
  //       const currentTown = data.results[0].address_components.filter(
  //         x =>
  //           x.types.filter(
  //             t =>
              
  //               t == 'political',
  //           ).length > 0,
  //       )[0].long_name;
  //       const currentRoad = data.results[0].address_components.filter(
  //         x =>
  //           x.types.filter(
  //             t =>
             
  //               t == 'route' || t == 'plus_code',
  //           ).length > 0,
  //       )[0].long_name;
       

  //       setLocation(`${currentRoad} ${currentTown} ${currentCity}`);
       
  //     })
  //     .catch(e => {
  //       console.log('err', e);
  //     });
  // };



//   const RecommendedProducts = ({item, index}) => {
//     return (
//       <View style={{flex: 1, paddingBottom: wp(5)}}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() => navigation.navigate('RelatedItemPrduct',{id:item.id})}
//           style={Stylesheet.RecommendedProducts_View}>
//           <Image
//              style={Stylesheet.RecommendedProducts_image}
//             source={{uri: item.images}}
//             resizeMode="cover"
//           />

// <Text style={Stylesheet.producttxt}>{item.title.length>10 ?item.title.substring(0,10) + '...':item.title}</Text>

//           {/* <Text style={Stylesheet.Recommended_descriptiontxt}>
//             {item.description.length > 30
//               ? item.description.substring(0, 30) + '...'
//               : item.description}
//           </Text> */}
//         </TouchableOpacity>
//       </View>
//     );
//   };

  return (
    <View style={Stylesheet.Container}>
      {indicator && <Indicator />}
      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>{detail.name}</Text>
        <Text>{'    '}</Text>
      </View>
      <ScrollView>
        <View>
          <Image
          style={{
            width:wp(95),
            height:250,
            alignSelf:'center'
          }}
          source={require('../../assets/map.png')}
          resizeMode='contain'
          />
          {/* <View
            style={{
              height: hp(25),
              width: wp(95),
              marginTop: wp(3),
              alignSelf: 'center',
            }}>
            {detail.latitude && detail.longitude? 
              <MapView
                // customMapStyle={mapStandardStyle}
                showsMyLocationButton={true}
                followsUserLocation={true}
                zoomTapEnabled={true}
                strokeWidth={3}
                strokeColor="hotpink"
                zoomEnabled={true}
                rotateEnabled={true}
                center={true}
                style={{flex: 1}}
                initialRegion={{
                  latitude:parseFloat(detail.latitude),
                  longitude:parseFloat(detail.longitude),
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.09,
                }}>
                {detail.latitude && detail.longitude ? (
                  <Marker
                    draggable
                    pinColor="red"
                    coordinate={{
                      latitude: parseFloat(detail.latitude),
                      longitude: parseFloat(detail.longitude),
                    }}></Marker>
                ) : null}
              </MapView>
            :null}
          </View> */}

          <View style={{marginHorizontal: wp(3), marginTop: wp(5)}}>
            <ReadMore
              numberOfLines={12}
              style={Stylesheet.Rodnae_txt8}
              seeMoreStyle={{color: '#A2A2A2',fontSize:10,fontFamily:family.medium}}
              seeLessStyle={{color: 'transparent'}}>
              {detail.description}
            </ReadMore>
          </View>

          {/* <View style={{marginTop: wp(5)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={Stylesheet.Rodnae_txt9}>Suggestions Products</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Boost')}>
                <Text style={Stylesheet.Rodnae_txt11}>{'    '}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={related}
              renderItem={RecommendedProducts}
            />
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Manufacture;
