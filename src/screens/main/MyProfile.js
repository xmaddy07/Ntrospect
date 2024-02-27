import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {images} from '../../constant/Index';
import RBSheet from 'react-native-raw-bottom-sheet';
import {logout} from '../../ReduxToolkit/MyUserSlice';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../ReduxToolkit/MyUserSlice';
import Indicator from '../../components/Indicator';

const MyProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [alerts, setAlerts] = useState(false);
  console.log('user', user);
  const [indicatorCursor, setIndicatorCursor] = useState(false);

  useEffect(() => {}, [user]);

  // useEffect(() => {
  //   setIndicatorCursor(true);
  //   const timer = setTimeout(() => {
  //     setIndicatorCursor(false);
  //   }, 2000);

  //   // Clean up the timer when the component unmounts
  //   return () => clearTimeout(timer);
  // }, []);

  const refRBSheet1 = useRef();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // const Logout = () => {
  //   Alert.alert('Are you soure you want to log out?', '', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {text: 'OK', onPress: () => dispatch(logoutUser())},
  //   ]);
  // };

  return (
    <>
      {indicatorCursor && <Indicator />}

      <View style={Stylesheet.Container}>
        <View style={Stylesheet.blueBG}>
          <Text
            style={[
              Stylesheet.home_txt1,
              {textAlign: 'center', marginTop: 30},
            ]}>
            My Profile
          </Text>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: 300,
              height: 170,
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 20,
              elevation: 1.5,
            }}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Setting')}
                style={{alignSelf: 'flex-end', right: 15, top: 15}}>
                <Feather name="settings" size={17} style={{color: '#000'}} />
              </TouchableOpacity>
              <Image
                style={[
                  Stylesheet.profileimg,
                  {
                    borderWidth: user.userdata.image ? 1.5 : 0,
                    borderColor: user.userdata.image ? '#5FB9E8' : 'red',
                  },
                ]}
                source={
                  user.userdata.image
                    ? {uri: user.userdata.image}
                    : require('../../assets/avatar.png')
                }
                resizeMode="cover"
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
                style={{
                  left: 28,
                  bottom: 13,
                }}>
                <Image
                  style={{width: 15, height: 15}}
                  source={images.edit}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={Stylesheet.profile_txt1}>
                {user.userdata.username}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 150,
                }}>
                <Text style={Stylesheet.profile_txt2}>
                  {user.userdata.weight ? user.userdata.height : null}
                  {user.userdata.scale_system ? (
                    <Text style={Stylesheet.profile_txt3}>
                      {user.userdata.scale_system == 'Imperial System'
                        ? 'cm'
                        : 'ft'}
                    </Text>
                  ) : null}
                </Text>
                <Text style={Stylesheet.profile_txt2}>
                  {user.userdata.height ? user.userdata.weight : null}
                  {user.userdata.scale_system ? (
                    <Text style={Stylesheet.profile_txt3}>
                      {user.userdata.scale_system == 'Imperial System'
                        ? 'lbs'
                        : 'kg'}
                    </Text>
                  ) : null}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {!indicatorCursor ? (
          <ScrollView>
            <View style={{marginTop: 30}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Favorites')}
                style={[Stylesheet.profileimg_view, {marginTop: wp(10)}]}>
                <View style={Stylesheet.imgBG}>
                  <Image
                    style={Stylesheet.profile_icon}
                    source={images.favorites}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[Stylesheet.profile_txt4, {left: wp(3)}]}>
                  Favorites
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Subscription')}
                style={[Stylesheet.profileimg_view, {marginTop: wp(5)}]}>
                <View style={Stylesheet.imgBG}>
                  <Image
                    style={Stylesheet.profile_icon}
                    source={images.membership}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[Stylesheet.profile_txt4, {left: wp(3)}]}>
                  Membership
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onShare()}
                style={Stylesheet.profileimg_view}>
                <View style={Stylesheet.imgBG}>
                  <Image
                    style={Stylesheet.profile_icon}
                    source={images.social}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[Stylesheet.profile_txt4, {left: wp(3)}]}>
                  Social Media
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onShare()}
                style={[Stylesheet.profileimg_view, {}]}>
                <View style={Stylesheet.imgBG}>
                  <Image
                    style={Stylesheet.profile_icon}
                    source={images.share}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[Stylesheet.profile_txt4, {left: wp(3)}]}>
                  Share the app
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('About')}
                style={Stylesheet.profileimg_view}>
                <View style={Stylesheet.imgBG}>
                  <Image
                    style={Stylesheet.profile_icon}
                    source={images.about}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[Stylesheet.profile_txt4, {left: wp(3)}]}>
                  About Ntrospect
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('UserGuid')}
                style={Stylesheet.profileimg_view}>
                <View style={Stylesheet.imgBG}>
                  <Image
                    style={Stylesheet.profile_icon}
                    source={images.guid}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[Stylesheet.profile_txt4, {left: wp(3)}]}>
                  User guide
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAlerts(true)}
                style={Stylesheet.profileimg_view}>
                <View style={Stylesheet.imgBG}>
                  <Image
                    style={[Stylesheet.profile_icon, {tintColor: '#000'}]}
                    source={images.logout}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[Stylesheet.profile_txt4, {left: wp(3)}]}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : null}

        {/* <View style={{}}>
          <RBSheet
            ref={refRBSheet1}
            height={500}
            openDuration={250}
            closeDuration={200}
            closeOnPressMask={true}
            closeOnDragDown={true}
            closeOnPressBack={true}
            dragFromTopOnly={false}
            customStyles={{
              container: {
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
              },
            }}>
            <View>
              <View
                style={[
                  Stylesheet.direction,
                  {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: wp(4),
                  },
                ]}>
                <Text style={Stylesheet.profile_txt5}>{'     '}</Text>
                <Text style={Stylesheet.profile_txt5}>Invite A Friend</Text>
                <TouchableOpacity onPress={() => refRBSheet1.current.close()}>
                  <AntDesign name="close" size={25} color={'#000'} />
                </TouchableOpacity>
              </View>

              <Image
                style={Stylesheet.fomo}
                source={images.fomo}
                resizeMode="contain"
              />

              <View
                style={[
                  Stylesheet.direction,
                  {
                    justifyContent: 'space-between',
                    marginTop: wp(10),
                    marginHorizontal: wp(8),
                  },
                ]}>
                <TouchableOpacity>
                  <Image
                    style={Stylesheet.icon}
                    source={images.whatsapp}
                    resizeMode="contain"
                  />
                  <Text style={Stylesheet.icontxt}>Whatsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={Stylesheet.icon}
                    source={images.instagram}
                    resizeMode="contain"
                  />
                  <Text style={Stylesheet.icontxt}>Instagram</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={Stylesheet.icon}
                    source={images.msg}
                    resizeMode="contain"
                  />
                  <Text style={Stylesheet.icontxt}>Messages</Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  Stylesheet.direction,
                  {
                    justifyContent: 'space-between',
                    marginTop: wp(10),
                    marginHorizontal: wp(8),
                  },
                ]}>
                <TouchableOpacity>
                  <Image
                    style={Stylesheet.icon}
                    source={images.tiktok}
                    resizeMode="contain"
                  />
                  <Text style={Stylesheet.icontxt}>Tictok</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={Stylesheet.icon}
                    source={images.gmail}
                    resizeMode="contain"
                  />
                  <Text style={Stylesheet.icontxt}>Gmail</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={Stylesheet.icon}
                    source={images.twitter}
                    resizeMode="contain"
                  />
                  <Text style={Stylesheet.icontxt}>Twitter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </RBSheet>
        </View> */}
        <Modal transparent={true} animationType={'none'} visible={alerts}>
          <View style={Stylesheet.alrtBG}>
            <View style={Stylesheet.alertsview}>
              <Text style={Stylesheet.alrttetxt}>
                Are you sure you want to log out?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  width: 100,
                  justifyContent: 'space-between',
                  marginTop: 30,
                  marginRight: 20,
                }}>
                <TouchableOpacity onPress={() => setAlerts(false)} style={{}}>
                  <Text style={Stylesheet.Ok}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => dispatch(logoutUser())}
                  style={{}}>
                  <Text style={Stylesheet.Ok}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default MyProfile;
