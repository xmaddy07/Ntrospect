import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {family, images} from '../../constant/Index';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {barcodeApi} from '../../components/ApiScreen';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import SeatchBar from '../../components/seatchBar';
// import BarcodeMask from 'react-native-barcode-mask';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../../components/loader';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [searchResults, setSearchResults] = useState('');
  const [LoadingCursor, setLoadingCursor] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [isScanned, setIsScanned] = useState(false);
  const [isFlashOn, setFlashOn] = useState(false);


  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (!isScanned) {
        console.log('Scanned code:', codes[0].value);
      setTimeout(() => {
        barcodeDataApi(codes[0].value);
        }, 600);
        setIsScanned(true); // Set the flag to true to stop further scanning

      }
    },
  });

 

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  React.useEffect(() => {
    requestPermission();
  }, []);

  const barcodeDataApi = async data => {
    const formdata = new FormData();
    formdata.append('barcode', data),
      barcodeApi({url: 'search-product', Auth: user.token}, formdata)
        .then(res => {
          // setLoadingCursor(false);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            setFlashOn(false)
            navigation.navigate('Lugala',{data: res.product.id});
          }
        })
        .catch(err => {
          console.log('err in barcode', err);
          // setLoadingCursor(false);
        });
  };



  if (device == null) {
    return (
      <View>
        <Text style={{backgroundColor: 'red'}}>no device</Text>
      </View>
    );
  }

  return (
    <View style={Stylesheet.Container}>
      {LoadingCursor && <Loader/>}
      <View
        style={{
          flex: 1,
          backgroundColor: '#212528',
          justifyContent: 'space-between',
        }}>
        <View>
          <SeatchBar serchtext={barcodeDataApi} />
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              top: 10,
              marginHorizontal: 20,
            }}>
            <TouchableOpacity 
    onPress={()=>navigation.navigate('Index',{screen:'Products'})}>
              <MaterialIcons name={'close'} size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFlashOn(!isFlashOn)} style={{}}>
              <MaterialIcons
                name={isFlashOn ? 'flash-on' : 'flash-off'}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ImageBackground
          tintColor={'#FFFFFF'}
          style={{
            width: wp(85),
            height: hp(18),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={images.cam}
          resizeMode="stretch">
          <Camera
            style={{width: wp(83.9), height: hp(17.5)}}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
            torch={isFlashOn ? 'on' : 'off'}/>
        </ImageBackground>


        <TouchableOpacity
          style={{
            bottom: 20,
            alignSelf: 'center',
          }}
          onPress={() => navigation.navigate('Index', {screen: 'Products'})}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: family.regular,
              fontSize: 14,
            }}>
            Back to Home
          </Text>
        </TouchableOpacity>
        {/* <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        /> */}
      </View>
    </View>
  );
};

export default Home;

