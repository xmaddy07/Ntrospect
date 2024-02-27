
 

    <View  style={[Stylesheet.onbord_View1, {}]}>
    {LoadingCursor && <Loader />}

    <TouchableOpacity
      onPress={() => Skip()}
      style={Stylesheet.onbord_touch}
      activeOpacity={0.6}>
      <Text style={Stylesheet.text}>Skip</Text>
    </TouchableOpacity>
    <View style={{marginTop: wp(20), zIndex: 10, marginLeft: wp(5)}}>
      <Text style={[Stylesheet.QTxt1, {}]}>
        Do you have any health conditions?
      </Text>

      <View
        style={{
          marginTop: wp(5),
          flexDirection: 'row',
          height: hp(20),
        }}>
        <View style={{zIndex: 1000}}>
          <RadioButton.Group
            value={radioValue}
            onValueChange={newValue => setRadioValue(newValue)}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                setRadioValue(0);
              }}>
              <RadioButton value="0" color={'#5FB9E8'} />
              <Text style={Stylesheet.Radiotxt}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                setRadioValue(1);
              }}>
              <RadioButton value="1" color={'#5FB9E8'} />
              <Text style={Stylesheet.Radiotxt}>Yes</Text>
            </TouchableOpacity>
          </RadioButton.Group>
        </View>

        {radioValue == '1' ? (
          <View
            style={{
              width: wp(72),
              marginTop: wp(8),
              height: 187,
              left: 19,
            }}>
            <MultiSelect
              style={Stylesheet.dropdown}
              placeholderStyle={Stylesheet.placeholderStyle}
              selectedTextStyle={Stylesheet.selectedTextStyle}
              inputSearchStyle={Stylesheet.inputSearchStyle}
              iconStyle={Stylesheet.iconStyle}
              showsVerticalScrollIndicator={false}
              search={false}
              data={Health}
              labelField="label"
              valueField="value"
              placeholder="Please choose"
              searchPlaceholder="Search..."
              value={selected}
              onFocus={() => setIsopen('open')}
              onBlur={() => setIsopen('close')}
              onChange={item => {
                setSelected(item);
              }}
              renderRightIcon={() => (
                <AntDesign
                  style={Stylesheet.icon}
                  color="#5FB9E8"
                  name={isopen == 'open' ? 'upcircle' : 'downcircle'}
                  size={20}
                />
              )}
              itemTextStyle={{color: '#000'}}
              itemContainerStyle={{borderRadius: 5, marginTop: 2}}
              containerStyle={Stylesheet.containerStyle}
              selectedStyle={Stylesheet.selectedStyle}
              activeColor="#C2DBE8"
              activeOpacity={2}
            />
          </View>
        ) : null}
      </View>
    </View>

    <View style={{marginTop: wp(20), zIndex: 1000, marginLeft: wp(5)}}>
      <Text style={Stylesheet.QTxt1}>Do you have allergies?</Text>
      <View
        style={{
          marginTop: wp(5),
          flexDirection: 'row',
          height: hp(20),
        }}>
        <View>
          <RadioButton.Group
            value={radioValue2}
            onValueChange={newValue => setRadioValue2(newValue)}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                setRadioValue2(0);
              }}>
              <RadioButton value="0" color={'#5FB9E8'} />
              <Text style={Stylesheet.Radiotxt}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                setRadioValue2(1);
              }}>
              <RadioButton value="1" color={'#5FB9E8'} />
              <Text style={Stylesheet.Radiotxt}>Yes</Text>
            </TouchableOpacity>
          </RadioButton.Group>
        </View>

        {radioValue2 == '1' ? (
          <View
            style={{width: wp(75), marginTop: wp(8), marginLeft: wp(6)}}>
            <MultiSelect
              style={Stylesheet.dropdown}
              placeholderStyle={Stylesheet.placeholderStyle}
              selectedTextStyle={Stylesheet.selectedTextStyle}
              inputSearchStyle={Stylesheet.inputSearchStyle}
              iconStyle={Stylesheet.iconStyle}
              showsVerticalScrollIndicator={false}
              search={false}
              data={allergies}
              labelField="label"
              valueField="value"
              placeholder="Please choose"
              searchPlaceholder="Search..."
              value={selected2}
              onChange={item => {
                setSelected2(item);
              }}
              onFocus={() => setIclose('open')}
              onBlur={() => setIclose('close')}
              renderRightIcon={() => (
                <AntDesign
                  style={Stylesheet.icon}
                  color="#5FB9E8"
                  name={isclose == 'open' ? 'upcircle' : 'downcircle'}
                  size={20}
                />
              )}
              itemTextStyle={{color: '#000'}}
              itemContainerStyle={{borderRadius: 5, marginTop: 2}}
              containerStyle={Stylesheet.containerStyle}
              selectedStyle={Stylesheet.selectedStyle}
              activeColor="#C2DBE8"
              activeOpacity={2}
            />
          </View>
        ) : null}
      </View>
    </View>
    <TouchableOpacity
      onPress={() => EditData2()}
      style={[Stylesheet.button, {alignSelf: 'center'}]}>
      <Text style={Stylesheet.button_txt}>Ntrospect Me</Text>
    </TouchableOpacity>
  </View>


import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import React, {useState, useEffect,useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RadioButton} from 'react-native-paper';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Stylesheet from '../../constant/Stylesheet';
import {family, images} from '../../constant/Index';
import DropDownPicker from 'react-native-dropdown-picker';
import {MultiSelect} from 'react-native-element-dropdown';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import SplashScreen from 'react-native-splash-screen';
import {markAsSeen} from '../../ReduxToolkit/MarkAsScreen';
import Loader from '../../components/loader';
import AndroidToast from '../../components/AndroidToast';
import {UpdateGenders, UpdateHealth} from '../../components/ApiScreen';
import {setUser} from '../../ReduxToolkit/MyUserSlice';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screen } from 'react-native-screens';

const {height, width} = Dimensions.get('window');

const Onboarding = ({navigation}) => {
  const swiperRef = useRef(null);
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [activeIndex, setActiveIndex] = useState(0);
  const [allergiestrue, setAllergiestrue] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (item) => {
    // Check if the item is already selected
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      // Add the item to the selectedItems array
      setSelectedItems([...selectedItems, item]);
    }
  }

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
        console.log('false..', isKeyboardVisible);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
        console.log('true..', isKeyboardVisible);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //// screen 5 data
  const [dates, setDates] = useState(new Date());
  const [dat, setDat] = useState('');
  const [dat2, setdat2] = useState('');
  const [openCalender, setOpenCalender] = useState(false);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [malefemale, setMalefemale] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Others', value: 'Others'},
  ]);
  const [value2, setValue2] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [metric, setMetric] = useState([
    {label: 'Metric', value: 'Metric'},
    {label: 'Imperial', value: 'Imperial'},
  ]);

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [LoadingCursor, setLoadingCursor] = useState('');

  const EditData = async Text => {
    setLoadingCursor(true);
    // const newdate = moment(dat).format('D/M/YYYY');
    const formdata = new FormData();

    formdata.append('gender', value),
      formdata.append('dob', dat2),
      formdata.append('scale_system', value2),
      formdata.append('height', height),
      formdata.append('weight', weight),
      formdata.append('required_calories', calories),
      UpdateGenders({url: 'edit', Auth: user.token}, formdata)
        .then(res => {
          console.log('updateprofile response', res);
          setLoadingCursor(false);
          AndroidToast(res.message);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            dispatch(setUser(res));
          }
        })
        .catch(err => {
          console.log('err in updateprofile', err);
          setLoadingCursor(false);
        });
  };
  //// end screen 5 data

  //// screen 6 data
  const handleCompleteOnboarding = () => {
    dispatch(markAsSeen());
  };

  const [radioValue, setRadioValue] = useState('');
  const [radioValue2, setRadioValue2] = useState('');
  // const Health = [
  //   {label: 'Old', value: 'Old'},
  //   {label: 'Environmental Quality', value: 'Environmental Quality'},
  //   {label: 'Tobacco', value: 'Tobacco'},
  //   {label: 'Mental Health', value: 'Mental Health'},
  //   {label: 'Immunization', value: 'Immunization'},
  // ];
  // const [selected, setSelected] = useState([]);

  // const allergies = [
  //   {label: 'Milk', value: 'Milk'},
  //   {label: 'Peanut', value: 'Peanut'},
  //   {label: 'Tree Nuts', value: 'Tree Nuts'},
  //   {label: 'Soybeans', value: 'Soybeans'},
  //   {label: 'Sesame', value: 'Sesame'},
  //   {label: 'Eggs', value: 'Eggs'},
  //   {label: 'Wheat', value: 'Wheat'},
  // ];
  // const [selected2, setSelected2] = useState([]);

  // const [isopen, setIsopen] = useState('');
  // const [isclose, setIclose] = useState('');

  const EditData2 = async () => {
    if (radioValue == '0' && radioValue2 == '0') {
      handleCompleteOnboarding();
    } else {
      const formdata = new FormData();

      selected.forEach(element => {
        formdata.append('health_condition[]', element);
      });
      selected2.forEach(element => {
        formdata.append('allergies[]', element);
      });

      UpdateHealth({url: 'edit', Auth: user.token}, formdata)
        .then(res => {
          console.log('updateprofile response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            AndroidToast(res.message);
            dispatch(setUser(res));
            handleCompleteOnboarding();
            EditData();
          }
        })
        .catch(err => {
          console.log('err in updateprofile', err);
        });
    }
  };

  const Skip = () => {
    if (dispatch(markAsSeen())) {
      navigation.navigate('Index');
    }
  };

const allergies=[
  'Peanuts',
  'Milk',
  'Tree Nuts',
  'Eggs',
  'Wheat',
  'Soy',
  'Fish',
  'Crustaceans',
  'Legumes',
  'Mollusks',
  'Mustard',
  'Sesame',
  'Sulfites',
]
  
                  
                  

const slideData=[
  {
id:1,
    bordingdata:[
      <View   style={Stylesheet.onbord_View1}>
      <TouchableOpacity
        onPress={() => Skip()}
        style={Stylesheet.onbord_touch}
        activeOpacity={0.6}>
        <Text style={Stylesheet.text}>Skip</Text>
      </TouchableOpacity>

      <View style={Stylesheet.onbord_View4}>
        <Text style={Stylesheet.onbord_txt7}>
          We <Text style={Stylesheet.onbord_txt8}>PROVIDE,</Text>
        </Text>
        <Text style={Stylesheet.onbord_txt9}>
          {' '}
          comprehensive food analysis,
        </Text>
      </View>
      <Text style={[Stylesheet.onbord_txt7, {left: 50, width: wp(80)}]}>
        helping with your educated nutritional choices.
      </Text>

      <View style={Stylesheet.onbord_View4}>
        <Text style={Stylesheet.onbord_txt7}>
          We <Text style={Stylesheet.onbord_txt8}>NAVIGATE,</Text>
        </Text>
        <Text style={Stylesheet.onbord_txt9}> food complexities,</Text>
      </View>
      <Text style={[Stylesheet.onbord_txt7, {left: 50, width: wp(80)}]}>
        ensuring transparency for informed decisions.
      </Text>

      <View style={Stylesheet.onbord_View4}>
        <Text style={Stylesheet.onbord_txt7}>
          We <Text style={Stylesheet.onbord_txt8}>JOURNAL,</Text>
        </Text>
        <Text style={Stylesheet.onbord_txt9}> your food selections</Text>
      </View>
      <Text style={[Stylesheet.onbord_txt7, {left: 50, width: wp(80)}]}>
        facilitating personalized, healthy living.
      </Text>

      <View style={Stylesheet.onbord_View4}>
        <Text style={Stylesheet.onbord_txt7}>
          We <Text style={Stylesheet.onbord_txt8}>INFORM,</Text>
        </Text>
        <Text style={[Stylesheet.onbord_txt9]}>
          {' '}
          you with up-to-date scientific,
        </Text>
      </View>
      <Text style={[Stylesheet.onbord_txt7, {left: 50, width: wp(80)}]}>
        findings securing nutritional knowledge for well-being.
      </Text>
    </View>
    ]

  },
  {
    id:2,
    bordingdata:[
      <View  style={Stylesheet.onbord_View1}>
      {LoadingCursor && <Loader />}
      <ScrollView nestedScrollEnabled={true}>
        <View>
          <TouchableOpacity
            onPress={() => Skip()}
            style={Stylesheet.onbord_touch}
            activeOpacity={0.6}>
            <Text style={Stylesheet.text}>Skip</Text>
          </TouchableOpacity>

          <View style={{marginTop: wp(12)}}>
            <Text style={[Stylesheet.onbord_txt11, {left: 15}]}>
              To personalize your experience,
            </Text>
            <Text style={[Stylesheet.onbord_txt11, {left: 40}]}>
              we would love to gather some details.
            </Text>

            <View
              style={{flexDirection: 'row', marginTop: wp(12), zIndex: 1}}>
              <Text style={[Stylesheet.onbord_txt10, {top: wp(2)}]}>
                Gender
              </Text>
              <DropDownPicker
                open={open}
                value={value}
                items={malefemale}
                setOpen={setOpen}
                setValue={setValue}
                setMalefemale={setMalefemale}
                listMode="SCROLLVIEW"
                placeholder="Select"
                onChangeSearchText={txt => {
                  setMalefemale(txt);
                }}
                arrowIconContainerStyle={{
                  backgroundColor: '#5FB9E8',
                  // width: wp(5),
                  // height: hp(4),
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: wp(1),
                }}
                listItemContainerStyle={{height: wp(8)}}
                listItemLabelStyle={{height: wp(8), top: 10}}
                // showArrowIcon={false}
                labelStyle={{
                  fontFamily: family.regular,
                  fontSize: 12,
                }}
                textStyle={{
                  fontFamily: family.regular,
                  fontSize: 12,
                }}
                placeholderStyle={{
                  color: '#AFABAB',
                  fontFamily: family.regular,
                  fontSize: 12,
                }}
                style={{
                  width: wp(30),
                  minHeight: 35,
                  borderWidth: 0,
                  borderColor: '#E8E7EA',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  marginLeft: wp(4),
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,

                  elevation: 8,
                  // marginBottom:5
                }}
                dropDownContainerStyle={{
                  width: wp(30),
                  marginLeft: wp(4),
                  maxHeight: hp(15),
                  borderWidth: 0,
                  borderColor: '#E8E7EA',
                  backgroundColor: '#FFFFFF',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,

                  elevation: 8,
                }}
                selectedItemContainerStyle={{backgroundColor: '#5FB9E8'}}
                selectedItemLabelStyle={{color: 'white'}}
              />
            </View>

            <View style={{flexDirection: 'row', marginTop: wp(12)}}>
              <Text style={[Stylesheet.onbord_txt10, {top: wp(1)}]}>
                Birthday
              </Text>

              <View style={Stylesheet.datepick}>
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
                  value={
                    dat2
                      ? dat2
                      : dat
                      ? moment(dat).format('MM/DD/YYYY')
                      : null
                  }
                  onChangeText={txt => setdat2(txt)}
                />
                <TouchableOpacity
                  style={{
                    width: wp(4.7),
                    height: wp(4.7),
                    backgroundColor: '#5FB9E8',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: wp(1),
                  }}
                  onPress={() => setOpenCalender(true)}>
                  <AntDesign name="down" size={12} color={'#000'} />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{flexDirection: 'row', marginTop: wp(12), zIndex: 1}}>
              <Text style={[Stylesheet.onbord_txt10, {top: wp(2)}]}>
                Metric system
              </Text>
              <View>
                <DropDownPicker
                  open={open2}
                  value={value2}
                  items={metric}
                  setOpen={setOpen2}
                  setValue={setValue2}
                  setMetric={setMetric}
                  placeholder="Select"
                  onChangeSearchText={txt => {
                    setMetric(txt);
                  }}
                  arrowIconContainerStyle={{
                    backgroundColor: '#5FB9E8',
                    // width: wp(5),
                    // height: hp(4),
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: wp(1),
                  }}
                  listItemContainerStyle={{height: wp(9)}}
                  listItemLabelStyle={{height: wp(9), top: 10}}
                  // showArrowIcon={false}
                  labelStyle={{
                    fontFamily: family.regular,
                    fontSize: 12,
                  }}
                  textStyle={{
                    fontFamily: family.regular,
                    fontSize: 12,
                  }}
                  placeholderStyle={{
                    color: '#AFABAB',
                    fontFamily: family.regular,
                    fontSize: 12,
                  }}
                  tickIconStyle={{
                    width: wp(4),
                    height: wp(4),
                  }}
                  style={{
                    width: wp(35),
                    minHeight: 35,
                    borderWidth: 0,
                    borderColor: '#E8E7EA',
                    backgroundColor: '#FFFFFF',
                    elevation: 1,
                    borderRadius: 10,
                    marginLeft: wp(3),
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,

                    elevation: 8,
                  }}
                  dropDownContainerStyle={{
                    width: wp(35),
                    marginLeft: wp(3),
                    borderWidth: 1.5,
                    borderColor: '#E8E7EA',
                    backgroundColor: '#FFFFFF',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,

                    elevation: 8,
                  }}
                  selectedItemContainerStyle={{backgroundColor: '#5FB9E8'}}
                  selectedItemLabelStyle={{color: 'white', top: 10}}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: wp(8),
                marginLeft: 10,
              }}>
              <Text style={[Stylesheet.onbord_txt10, {marginLeft: wp(2)}]}>
                {'Weight'}
              </Text>
              <View style={[Stylesheet.Textinpu2, {marginLeft: wp(5)}]}>
                <TextInput
                  style={{
                    top: 4,
                    color: '#000',
                    width: 50,
                    textAlign: 'center',
                  }}
                  placeholderTextColor={'#AFABAB'}
                  keyboardType="number-pad"
                  verticalAlign="middle"
                  placeholder={value2 === 'Imperial' ? 'kg' : 'lbs'}
                  fontFamily={family.regular}
                  fontSize={12}
                  value={height}
                  onChangeText={Text => {
                    setHeight(Text);
                  }}
                  maxLength={3}
                  cursorColor={'#5FB9E8'}
                />
              </View>
              {/* <Text
                  style={[
                    Stylesheet.onbord_txt10,
                    {marginLeft: wp(4)},
                  ]}>{'(kg/lbs)'}
                </Text> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: wp(8),
                marginLeft: 10,
              }}>
              <Text style={[Stylesheet.onbord_txt10, {marginLeft: wp(2)}]}>
                {'Height'}
              </Text>
              <View style={Stylesheet.Textinpu2}>
                <TextInput
                  style={{
                    top: 4,
                    color: '#000',
                    width: 50,
                    textAlign: 'center',
                  }}
                  verticalAlign="middle"
                  keyboardType="number-pad"
                  placeholder={value2 === 'Imperial' ? 'inches' : 'cm'}
                  fontFamily={family.regular}
                  fontSize={12}
                  placeholderTextColor={'#AFABAB'}
                  value={weight}
                  onChangeText={Text => {
                    setWeight(Text);
                  }}
                  maxLength={3}
                  cursorColor={'#5FB9E8'}
                />
              </View>
              {/* <Text
                  style={[
                    Stylesheet.onbord_txt10,
                    {marginLeft: wp(5)},
                  ]}>
                  {'(cm/inches)'}
                </Text> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: wp(12),
                paddingBottom: 5,
                alignItems: 'center',
              }}>
              <Text style={[Stylesheet.onbord_txt10, {}]}>
                Daily Caloric Intake
              </Text>
              <View style={Stylesheet.Textinpu2}>
                <TextInput
                  style={{top: 4, color: '#000'}}
                  placeholder=""
                  keyboardType="number-pad"
                  fontFamily={family.regular}
                  fontSize={12}
                  placeholderTextColor={'#AFABAB'}
                  value={calories}
                  onChangeText={Text => {
                    setCalories(Text);
                  }}
                  maxLength={4}
                  cursorColor={'#5FB9E8'}
                />
              </View>
              <Text style={[Stylesheet.onbord_txt10, {marginLeft: wp(4)}]}>
                {'Cal'}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
        onPress={() => handleButtonClick()}
        style={[Stylesheet.button, {alignSelf: 'center'}]}>
        <Text style={Stylesheet.button_txt}>Next</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
    ]
  },
  {
    id:3,
    bordingdata:[
      <View  style={[Stylesheet.onbord_View1, {}]}>
      {LoadingCursor && <Loader />}

      <TouchableOpacity
        onPress={() => Skip()}
        style={Stylesheet.onbord_touch}
        activeOpacity={0.6}>
        <Text style={Stylesheet.text}>Skip</Text>
      </TouchableOpacity>
   
      <View style={{marginTop: wp(10), zIndex: 10, marginLeft: wp(5)}}>
      <Text style={[Stylesheet.QTxt1, {}]}>
        Please choose only if applicable.
        </Text>
      </View>
      <TouchableOpacity 
      onPress={()=>setAllergiestrue(!allergiestrue)}
      style={{flexDirection:'row',marginLeft:25,marginTop:20}}>
        <FontAwesome name={allergiestrue?"toggle-up":"toggle-down"} size={20} style={{color:'#5FB9E8'}}/>
        <Text style={[Stylesheet.QTxt1, {left:10}]}>
        Allergies
        </Text>
      </TouchableOpacity>
  {allergiestrue?    <View style={Stylesheet.alergilist}>
<FlatList
data={allergies}
renderItem={({item,index})=>{
  const isSelected = selectedItems.includes(item);
  return(
    <>
    
    <View style={{ marginLeft: 22 }}>
        <TouchableOpacity
          style={{ margin: 2, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => toggleSelection(item)}
        >
          <MaterialCommunityIcons
            name={isSelected ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
            size={20}
            style={{ color: '#5FB9E8' }}
          />
          <Text style={Stylesheet.selectedTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}}
/>
      </View>:null}

      <TouchableOpacity 
      onPress={()=>setAllergiestrue(!allergiestrue)}
      style={{flexDirection:'row',marginLeft:25,marginTop:20}}>
        <FontAwesome name={allergiestrue?"toggle-up":"toggle-down"} size={20} style={{color:'#5FB9E8'}}/>
        <Text style={[Stylesheet.QTxt1, {left:10}]}>
        Health Conditions
        </Text>
      </TouchableOpacity>
  {allergiestrue?    <View style={Stylesheet.alergilist}>
<FlatList
data={allergies}
renderItem={({item,index})=>{
  const isSelected = selectedItems.includes(item);
  return(
    <>
    
    <View style={{ marginLeft: 22 }}>
        <TouchableOpacity
          style={{ margin: 2, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => toggleSelection(item)}
        >
          <MaterialCommunityIcons
            name={isSelected ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
            size={20}
            style={{ color: '#5FB9E8' }}
          />
          <Text style={Stylesheet.selectedTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}}
/>
      </View>:null}

    
      {/* <TouchableOpacity
        onPress={() => EditData2()}
        style={[Stylesheet.button, {alignSelf: 'center'}]}>
        <Text style={Stylesheet.button_txt}>Ntrospect Me</Text>
      </TouchableOpacity> */}
    </View>
    ]
  }

]
  
const handleButtonClick = () => {
  const nextIndex = activeIndex + 1;

  if (flatListRef.current && nextIndex < slideData.length) {
    flatListRef.current.scrollToIndex({ index: nextIndex });
    setActiveIndex(nextIndex);
  } 
};  


  return (
    <View style={{flex: 1}}>
   <FlatList
         ref={flatListRef}
         showsHorizontalScrollIndicator={false}
         horizontal
         pagingEnabled
         onScroll={e => {
           const x = e.nativeEvent.contentOffset.x;
           setActiveIndex(Math.round(x / width));
         }}
         data={slideData}
          renderItem={({item,index})=>{
            return(
              <>
            <View>
              {item?.bordingdata[0]}
            </View>

              </>
            )
          }}
      
      />
        <View style={{
    alignSelf:'center',
    position:'absolute',
 bottom:0,
 flexDirection:'row',
 bottom:20
  }}>
   {slideData.map((obj, index) => {
          return (
            <View
              style={{width:8,
                height:8,
                borderRadius:4,
                marginLeft:5,
                backgroundColor:
                activeIndex == index ? '#5FB9E8': 'gray',
              width: activeIndex == index ? 25 : 8,
                }}>
                
              </View>
          );
        })}
  </View>
      <DatePicker
        modal
        mode="date"
        open={openCalender}
        date={dates}
        onConfirm={value => {
          setOpenCalender(false);
          setDat(value);
        }}
        onCancel={() => {
          setOpenCalender(false);
        }}
      />
    </View>
  );
};

export default Onboarding;
