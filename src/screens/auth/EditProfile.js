import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {family, images} from '../../constant/Index';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {UpdateProfile} from '../../components/ApiScreen';
import Loader from '../../components/loader';
import AndroidToast from '../../components/AndroidToast';
import {setUser} from '../../ReduxToolkit/MyUserSlice';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const [open, setOpen] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [newdat, setNewdat] = useState(user.userdata.dob);
  console.log('user', user);

  const [openCalender, setOpenCalender] = useState(false);
  const [dates, setDates] = useState(new Date());
  const [dat, setDat] = useState('');

  const [height, setHeight] = useState(user.userdata.height);
  const [weight, setWeight] = useState(user.userdata.weight);
  const [username, setUsername] = useState(user.userdata.username);
  const [value3, setValue3] = useState(user.userdata.scale_system);
  const [image, setImage] = useState(user.userdata.image);
  const [value, setValue] = useState(user.userdata.gender);

  const [malefemale, setMalefemale] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ]);

  const [metric, setMetric] = useState([
    {label: 'International System of Units (SI)', value: 'International System of Units (SI)'},
    {label: 'Imperial System', value: 'Imperial System'},
  ]);

  console.log('value3',value3)

  const rotation = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopRotation = () => {
    rotation.stopAnimation();
  };

  const interPolateRotaion = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '-180deg'],
  });

  console.log('object', isLoading);

  useEffect(() => {
    if (isLoading) {
      startRotation();
    } else {
      stopRotation();
    }
  }, [isLoading]);

  const picker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const EditData = async () => {
    setIsLoading(true);
    const newdate = moment(dat).format('D/M/YYYY');
    const formdata = new FormData();
    formdata.append('image', {
      uri: image,
      type: 'image/jpg',
      name: `image${new Date()}.jpg`,
    }),
      formdata.append('image', image),
      formdata.append('username', username),
      formdata.append('gender', value),
      formdata.append('dob', newdate),
      formdata.append('scale_system', value3),
      formdata.append('height', height),
      formdata.append('weight', weight),
      UpdateProfile({url: 'edit', Auth: user.token}, formdata)
        .then(res => {
          console.log('updateprofile response', res);
          if (res.status == 'error') {
          } else if (res.status == 'success') {
            dispatch(setUser(res));
            AndroidToast(res.message);
            setIsLoading(false);
            navigation.navigate('MyProfile');
          }
        })
        .catch(err => {
          console.log('err in updateprofile', err);
          setIsLoading(false);
        });
  };

  return (
    <View style={Stylesheet.Container}>
      {isLoading && <Loader />}

      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>Edit Profile</Text>
        <Text>{'    '}</Text>
      </View>
      <ScrollView>

  
      <View style={{paddingBottom: wp(5), alignItems: 'center',}}>
        <View style={Stylesheet.editprofileimg_view}>
          <ImageBackground
            style={Stylesheet.editprofileimg}
            source={image ? {uri: image} : require('../../assets/avatar.png')}
            resizeMode="cover"
            borderRadius={10}
            // borderRadius={image ? 10 : 0}
            // borderWidth={image ? 2 : 0}
          >
            <TouchableOpacity
              style={[
                Stylesheet.blurView,
                {
                  backgroundColor: image
                    ? 'rgba(16, 15, 15,0.3)'
                    : 'transparent',
                  borderRadius: image ? 10 : 0,
                  borderWidth: image ? 2 : 0,
                  borderColor: '#5FB9E8',
                },
              ]}
              onPress={() => picker()}>
              <Image
                style={[Stylesheet.profile_icon, {width: 45, height: 45}]}
                source={images.upload}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={{marginTop: wp(10)}}>
          <Text style={Stylesheet.edit_txt1}>User Name</Text>
          <TextInput
            style={Stylesheet.edit_inputstyle}
            placeholderTextColor={'#000'}
            fontsize={14}
            fontFamily={family.regular}
            placeholder="Enter Username"
            autoCorrect={false}
            value={username}
            onChangeText={Text => {
              setUsername(Text);
            }}
          />
        </View>

        <View style={{marginTop: wp(5), zIndex: 1000}}>
          <Text style={Stylesheet.edit_txt1}>Gender</Text>
          <DropDownPicker
            zIndex={1000}
            zIndexInverse={3000}
            open={open}
            value={value}
            items={malefemale}
            setOpen={setOpen}
            setValue={setValue}
            setMalefemale={setMalefemale}
            listMode="SCROLLVIEW"
            placeholder="Enter Gender"
            onChangeSearchText={txt => {
              setMalefemale(txt);
            }}
            arrowIconContainerStyle={{
              backgroundColor: '#5FB9E8',

              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            listItemContainerStyle={{height: wp(8)}}
            listItemLabelStyle={{height: wp(8)}}
            labelStyle={{
              fontFamily: family.regular,
              fontSize: 14,
            }}
            textStyle={{
              fontFamily: family.regular,
              fontSize: 14,
            }}
            placeholderStyle={{
              color: '#AFABAB',
              fontFamily: family.regular,
              fontSize: 14,
            }}
            style={{
              width: wp(80),
              height: hp(6),
              borderWidth: 0,
              borderColor: '#E8E7EA',
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              marginBottom: 28,
              zIndex: 1000,
              elevation: 1,
            }}
            dropDownContainerStyle={{
              width: wp(80),
              maxHeight: wp(15),
              borderWidth: 0,
              borderColor: '#E8E7EA',
              backgroundColor: '#FFFFFF',
              zIndex: 1000,
              elevation: 1,
            }}
            selectedItemContainerStyle={{backgroundColor: '#5FB9E8'}}
            selectedItemLabelStyle={{color: 'white'}}
          />
        </View>

        <View style={{}}>
        <Text style={Stylesheet.edit_txt1}>Select date</Text>

        <View
          style={{
            width: wp(80),
            height: hp(6),
            backgroundColor: '#FFFFFF',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            flexDirection: 'row',
            elevation: 1.5,
          }}>
          <TextInput
            style={{
              color: '#000',
              width: 130,
              height: 40,
              marginLeft: 6,
              top: 5,
            }}
            placeholder="MM/DD/YYYY"
            placeholderTextColor={'#AFABAB'}
            fontFamily={family.regular}
            fontSize={14}
            value={dat ? moment(dat).format('MM/DD/YYYY') : newdat?newdat:null}
            onChangeText={txt => setNewdat(txt)}
          />
          <TouchableOpacity
            style={{
              width: wp(5.7),
              height: wp(5.7),
              backgroundColor: '#5FB9E8',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              right: wp(3),
            }}
            onPress={() => setOpenCalender(true)}>
            <AntDesign name="down" size={16} color={'#000'} />
          </TouchableOpacity>
        </View>
      </View>


      <View
        style={{
          marginTop: wp(5),
          zIndex: 100,
          left: value3 == 'Imperial System' ? 12 : 5,
        }}>
        <Text style={Stylesheet.edit_txt1}>Height</Text>

        <View style={[Stylesheet.direction, {alignItems: 'center'}]}>
          <TextInput
            style={Stylesheet.heightinput}
            placeholderTextColor={height ? '#000' : '#AFABAB'}
            placeholder="Enter Height"
            fontsize={14}
            fontFamily={family.regular}
            keyboardType="numeric"
            // editable={false}
            value={height}
            onChangeText={Text => {
              setHeight(Text);
            }}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontFamily: family.regular,
              right: wp(10),
            }}>
            {value3 == 'Imperial System' ? 'cm' : 'ft'}
          </Text>

          {/* <View style={Stylesheet.heigharrow}>
                <AntDesign name="down" size={14} color={'#000'} />
              </View> */}
        </View>
      </View>

      <View
        style={{
          zIndex: 100,
          marginTop: wp(5),
          left: value3 == 'Imperial System' ? 10 : 8,
        }}>
        <Text style={Stylesheet.edit_txt1}>Weight</Text>

        <View style={[Stylesheet.direction, {alignItems: 'center'}]}>
          <TextInput
            style={Stylesheet.heightinput}
            placeholderTextColor={weight ? '#000' : '#AFABAB'}
            placeholder="Enter Weight"
            keyboardType="numeric"
            fontsize={14}
            fontFamily={family.regular}
            // editable={false}
            value={weight}
            onChangeText={Text => {
              setWeight(Text);
            }}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontFamily: family.regular,
              right: wp(10),
            }}>
            {value3 == 'Imperial System' ? 'lbs' : 'kg'}
          </Text>
          {/* <View style={Stylesheet.heigharrow}>
                <AntDesign name="down" size={14} color={'#000'} />
              </View> */}
        </View>
      </View>

      <View style={{zIndex: 100, marginTop: wp(5)}}>
        <Text style={Stylesheet.edit_txt1}>Metric System</Text>

        <DropDownPicker
          dropDownDirection="BOTTOM"
          open={open3}
          value={value3}
          items={metric}
          setOpen={setOpen3}
          setValue={setValue3}
          setMetric={setMetric}
          listMode="SCROLLVIEW"
          placeholder={
            user.userdata.scale_system
              ? user.userdata.scale_system
              : 'Enter Metric System'
          }
          onChangeSearchText={txt => {
            setMetric(txt);
          }}
          arrowIconContainerStyle={{
            backgroundColor: '#5FB9E8',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            // left: wp(2),
          }}
          labelStyle={{
            fontFamily: family.regular,
            fontSize: 14,
          }}
          textStyle={{
            fontFamily: family.regular,
            fontSize: 14,
          }}
          placeholderStyle={{
            color: '#000',
            fontFamily: family.regular,
            fontSize: 14,
          }}
          style={{
            width: wp(80),
            height: hp(6),
            // minHeight: 35,
            borderWidth: 0,
            borderColor: '#E8E7EA',
            elevation: 1.5,
            borderRadius: 10,
            marginBottom: 28,
          }}
          dropDownContainerStyle={{
            width: wp(80),
            maxHeight: wp(20),
            borderWidth: 0,
            borderColor: '#E8E7EA',
            backgroundColor: '#FFFFFF',
            elevation: 0.5,
          }}
          selectedItemContainerStyle={{backgroundColor: '#5FB9E8'}}
          selectedItemLabelStyle={{color: 'white'}}
        />
      </View>

      <TouchableOpacity
        onPress={() => EditData()}
        style={[Stylesheet.button, {marginTop: wp(16)}]}>
        <Text style={Stylesheet.button_txt}>Update</Text>
      </TouchableOpacity>

      </View>

  

  


      </ScrollView>
      <DatePicker
        modal
        mode="date"
        androidVariant="nativeAndroid"
        // theme='auto'
        // confirmText='set'
        open={openCalender}
        date={dates}
        onConfirm={dates => {
          setOpenCalender(false);
          setDat(dates);
        }}
        onCancel={() => {
          setOpenCalender(false);
        }}
      />

    </View>
  );
};

export default EditProfile;
