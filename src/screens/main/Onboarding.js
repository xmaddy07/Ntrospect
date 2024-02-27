import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
import {Screen} from 'react-native-screens';

const {height, width} = Dimensions.get('window');

const Onboarding = ({navigation}) => {
  const swiperRef = useRef(null);
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [activeIndex, setActiveIndex] = useState(0);
  const [allergiestrue, setAllergiestrue] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const [selectedItems3, setSelectedItems3] = useState([]);
  const [other1, setOther1] = useState('');
  const [other2, setOther2] = useState('');
  const [other3, setOther3] = useState('');
  const [activeView, setActiveView] = useState('');
  const [dates, setDates] = useState(new Date());
  const [dat, setDat] = useState('');
  const [dat2, setdat2] = useState('');
  const [openCalender, setOpenCalender] = useState(false);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const toggleSelection = item => {
    // Check if the item is already selected
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter(selectedItem => selectedItem !== item),
      );
    } else {
      // Add the item to the selectedItems array
      setSelectedItems([...selectedItems, item]);
    }
  };
  const toggleSelection2 = item => {
    // Check if the item is already selected
    if (selectedItems2.includes(item)) {
      setSelectedItems2(
        selectedItems2.filter(selectedItems2 => selectedItems2 !== item),
      );
    } else {
      // Add the item to the selectedItems array
      setSelectedItems2([...selectedItems2, item]);
    }
  };
  const toggleSelection3 = item => {
    // Check if the item is already selected
    if (selectedItems3.includes(item)) {
      setSelectedItems3(
        selectedItems3.filter(selectedItems3 => selectedItems3 !== item),
      );
    } else {
      // Add the item to the selectedItems array
      setSelectedItems3([...selectedItems3, item]);
    }
  };

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

  const [malefemale, setMalefemale] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Others', value: 'Others'},
  ]);
  const [value2, setValue2] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [metric, setMetric] = useState([
    {label: 'Imperial System', value: 'Imperial System'},
    {label: 'International System of Units (SI)', value: 'International System of Units (SI)'},
  ]);

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [LoadingCursor, setLoadingCursor] = useState('');

  const EditData = async Text => {
    const newdate = moment(dat).format('D/M/YYYY');
    const formdata = new FormData();
    formdata.append('gender', value),
      formdata.append('dob', dat2 ? dat2 : newdate ? newdate : ''),
      formdata.append('scale_system', value2),
      formdata.append('height', height),
      formdata.append('weight', weight),
      formdata.append('required_calories', calories),
      UpdateGenders({url: 'edit', Auth: user.token}, formdata)
        .then(res => {
          console.log('updateprofile response', res);
          if (res.status == 'error') {
            // AndroidToast(res.message);
          } else if (res.status === 'success') {
            dispatch(setUser(res));
            handleButtonClick();
            // AndroidToast(res.message);
          }
        })
        .catch(err => {
          console.log('err in updateprofile', err);
        });
  };
  //// end screen 5 data

  //// screen 6 data
  const handleCompleteOnboarding = () => {
    dispatch(markAsSeen());
  };

  const [radioValue, setRadioValue] = useState('');
  const [radioValue2, setRadioValue2] = useState('');

  const EditData2 = async () => {
    const formdata = new FormData();

    selectedItems.forEach(element => {
      formdata.append('health_condition[]', element);
    });
    selectedItems2.forEach(element => {
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
        }
      })
      .catch(err => {
        console.log('err in updateprofile', err);
      });
  };

  const Skip = () => {
    if (dispatch(markAsSeen())) {
      navigation.navigate('Index');
    }
  };

  const allergies = [
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
  ];

  const Healths = [
    'Diabetes',
    'High Blood Pressure',
    'Heart Disease',
    'Celiac Disease (Gluten Intolerance)',
    'Autoimmune Diseases',
    'Diverticulitis',
    'Gallbladder Issues',
    'Kidney Disease',
    'Liver Disease',
    'Metabolic Syndrome',
    'Thyroid Disorders',
    'Gastrointestinal Disorders',
    'Gastroesophageal Reflux Disease(GERD)',
  ];

  const Restrictions = [
    'Dairy-Free',
    'Fructose Intolerance',
    'Gluten-Free',
    'Halal',
    'Ketogenic (Keto)',
    'Kosher',
    'Lactose Intolerance',
    'Low Carb',
    'Low Sodium',
    'Pescatarian',
    'Vegan',
    'Vegetarian',
  ];

  const slideData = [
    {
      id: 1,
      bordingdata: [
        <View style={Stylesheet.onbord_View1}>
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
        </View>,
      ],
    },
    {
      id: 2,
      bordingdata: [
        <View style={Stylesheet.onbord_View1}>
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
                  we would love togather some details.
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: wp(12),
                    zIndex: 1,
                    alignItems: 'center',
                  }}>
                  <Text style={Stylesheet.onbord_txt10}>Gender</Text>
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
                      elevation: 2,
                    }}
                    dropDownContainerStyle={{
                      width: wp(30),
                      marginLeft: wp(4),
                      maxHeight: hp(15),
                      borderWidth: 0,
                      borderColor: '#E8E7EA',
                      backgroundColor: '#FFFFFF',
                      elevation: 2,
                    }}
                    selectedItemContainerStyle={{backgroundColor: '#5FB9E8'}}
                    selectedItemLabelStyle={{color: 'white'}}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: wp(12),
                    alignItems: 'center',
                  }}>
                  <Text style={Stylesheet.onbord_txt10}>Birthday</Text>

                  <View style={Stylesheet.datepick}>
                    <TextInput
                      style={{
                        color: '#000',
                        width: 130,
                        height: 40,
                        marginLeft: 6,
                        top: 5,
                      }}
                      placeholder="MM-DD-YYYY"
                      placeholderTextColor={'#AFABAB'}
                      keyboardType="decimal-pad"
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
                        width: wp(5.2),
                        height: wp(5.2),
                        backgroundColor: '#5FB9E8',
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        right: wp(2),
                      }}
                      onPress={() => setOpenCalender(true)}>
                      <AntDesign name="down" size={12} color={'#000'} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: wp(12),
                    zIndex: 1,
                    alignItems: 'center',
                  }}>
                  <Text style={Stylesheet.onbord_txt10}>Metric system</Text>
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
                        fontSize: 11,
                      }}
                      textStyle={{
                        fontFamily: family.regular,
                        fontSize: 11,
                      }}
                      placeholderStyle={{
                        color: '#AFABAB',
                        fontFamily: family.regular,
                        fontSize: 11,
                      }}
                      tickIconStyle={{
                        width: wp(4),
                        height: wp(4),
                      }}
                      style={{
                        width: wp(50),
                        minHeight: 35,
                        borderWidth: 0,
                        borderColor: '#E8E7EA',
                        backgroundColor: '#FFFFFF',
                        elevation: 1,
                        borderRadius: 10,
                        marginLeft: wp(3),
                        elevation: 2,
                      }}
                      dropDownContainerStyle={{
                        width: wp(50),
                        marginLeft: wp(3),
                        borderWidth: 1.5,
                        borderColor: '#E8E7EA',
                        backgroundColor: '#FFFFFF',
                        elevation: 2,
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
                      placeholder={value2 === 'Imperial' ? 'ft' : 'cm'}
                      fontFamily={family.regular}
                      fontSize={12}
                      placeholderTextColor={'#AFABAB'}
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
                    {marginLeft: wp(5)},
                  ]}>
                  {'(cm/inches)'}
                </Text> */}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: wp(12),
                    alignItems: 'center',
                  }}>
                  <Text style={[Stylesheet.onbord_txt10,{top:2}]}>
                    Daily Caloric Intake
                  </Text>
                  <View style={Stylesheet.Textinpu2}>
                    <TextInput
                      style={{top: 4, color: '#000'}}
                      placeholder="cal"
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
                  <Text style={[Stylesheet.onbord_txt10, {marginLeft: wp(4),top:2}]}>
                    {'Cal'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{paddingBottom: 10,marginTop:90}}>
              <TouchableOpacity
                onPress={() => EditData()}
                style={[Stylesheet.button, {alignSelf: 'center'}]}>
                <Text style={Stylesheet.button_txt}>Next</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>,
      ],
    },
    {
      id: 3,
      bordingdata: [
        <View style={[Stylesheet.onbord_View1, {}]}>
          <ScrollView>
            <View style={{height: hp(100)}}>
              {LoadingCursor && <Loader />}
              {/* 
          <TouchableOpacity
            onPress={() => Skip()}
            style={Stylesheet.onbord_touch}
            activeOpacity={0.6}>
            <Text style={Stylesheet.text}>Skip</Text>
          </TouchableOpacity> */}

              <View style={{marginTop: wp(15), zIndex: 10, marginLeft: 15}}>
                <Text style={[Stylesheet.QTxt1, {color: '#5FB9E8'}]}>
                  Please choose only if applicable.
                </Text>
              </View>
              {/* Allergies */}
              <View
                style={[
                  Stylesheet.alergilist,
                  {
                    width: selectedItems?.length > 0 ? wp(90) : wp(50),
                    paddingBottom: 10,
                    marginLeft: 15,
                    marginTop: 20,
                    justifyContent: 'center',
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    if (activeView === '') {
                      setActiveView('allergies');
                    } else {
                      setActiveView('');
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    padding: 4,
                    top: 7,
                    marginLeft: 15,
                  }}>
                  <FontAwesome
                    name={
                      activeView == 'allergies' ? 'toggle-up' : 'toggle-down'
                    }
                    size={18}
                    style={{color: '#5FB9E8'}}
                  />
                  <Text style={[Stylesheet.QTxt1, {left: 7}]}>Allergies</Text>
                </TouchableOpacity>
                {activeView == 'allergies' || selectedItems.length ? (
                  <View
                    style={{
                      backgroundColor: '#E8E7EA',
                      width: selectedItems?.length > 0 ? wp(90) : wp(50),
                      height: 0.5,
                      marginTop: 10,
                    }}></View>
                ) : null}
                {activeView === 'allergies' ? (
                  <View style={{marginLeft: 15}}>
                    <FlatList
                      data={[...allergies, 'Other Text']}
                      renderItem={({item, index}) => {
                        const isSelected = selectedItems.includes(item);

                        if (item === 'Other Text') {
                          return (
                            <>
                              {activeView != '' ? (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    height: 35,
                                    marginLeft: 2,
                                  }}>
                                  <MaterialCommunityIcons
                                    name={
                                      isSelected
                                        ? 'checkbox-marked-outline'
                                        : 'checkbox-blank-outline'
                                    }
                                    size={18}
                                    style={{color: '#5FB9E8'}}
                                  />
                                  <TextInput
                                    style={{color: '#3F3F3F', top: 3}}
                                    placeholder="Other_________"
                                    placeholderTextColor={'#3F3F3F'}
                                    value={other1}
                                    onChangeText={txt => setOther1(txt)}
                                  />
                                </View>
                              ) : null}
                            </>
                          );
                        }

                        return (
                          <View style={{}}>
                            <TouchableOpacity
                              style={{
                                margin: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                              onPress={() => toggleSelection(item)}>
                              <MaterialCommunityIcons
                                name={
                                  isSelected
                                    ? 'checkbox-marked-outline'
                                    : 'checkbox-blank-outline'
                                }
                                size={18}
                                style={{color: '#5FB9E8'}}
                              />
                              <Text
                                style={[
                                  Stylesheet.selectedTextStyle,
                                  {top: 2, left: 2},
                                ]}>
                                {item}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                ) : null}
                {activeView === '' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginLeft: 15,
                    }}>
                    {selectedItems.map((item, index) => {
                      return (
                        <View style={{margin: 3, flexDirection: 'row'}}>
                          <MaterialCommunityIcons
                            name={'checkbox-marked-outline'}
                            size={18}
                            style={{color: '#5FB9E8'}}
                          />
                          <Text
                            style={[
                              Stylesheet.selectedTextStyle,
                              {marginLeft: 2},
                            ]}>
                            {item}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
              </View>

              {/*  Heakt*/}
              <View
                style={[
                  Stylesheet.alergilist,
                  {
                    width: selectedItems2?.length > 0 ? wp(90) : wp(70),
                    paddingBottom: 10,
                    marginLeft: 15,
                    marginTop: 20,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    if (activeView === '') {
                      setActiveView('Healths');
                    } else {
                      setActiveView('');
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    padding: 5,
                    top: 7,
                    marginLeft: 15,
                  }}>
                  <FontAwesome
                    name={activeView == 'Healths' ? 'toggle-up' : 'toggle-down'}
                    size={18}
                    style={{color: '#5FB9E8'}}
                  />
                  <Text style={[Stylesheet.QTxt1, {left: 7}]}>
                    Health Conditions
                  </Text>
                </TouchableOpacity>
                {activeView == 'Healths' || selectedItems2.length ? (
                  <View
                    style={{
                      backgroundColor: '#E8E7EA',
                      width: selectedItems2?.length > 0 ? wp(90) : wp(70),
                      height: 0.5,
                      marginTop: 10,
                    }}></View>
                ) : null}

                {activeView === 'Healths' ? (
                  <View style={{marginLeft: 15}}>
                    <FlatList
                      data={[...Healths, 'Other Text']}
                      renderItem={({item, index}) => {
                        const isSelected2 = selectedItems2.includes(item);

                        if (item === 'Other Text') {
                          return (
                            <>
                              {activeView != '' ? (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    height: 35,
                                    marginLeft: 2,
                                  }}>
                                  <MaterialCommunityIcons
                                    name={
                                      isSelected2
                                        ? 'checkbox-marked-outline'
                                        : 'checkbox-blank-outline'
                                    }
                                    size={18}
                                    style={{color: '#5FB9E8'}}
                                  />
                                  <TextInput
                                    style={{color: '#3F3F3F', top: 3}}
                                    placeholder="Other_________"
                                    placeholderTextColor={'#3F3F3F'}
                                    value={other2}
                                    onChangeText={txt => setOther2(txt)}
                                  />
                                </View>
                              ) : null}
                            </>
                          );
                        }

                        return (
                          <View style={{}}>
                            <TouchableOpacity
                              style={{
                                margin: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                              onPress={() => toggleSelection2(item)}>
                              <MaterialCommunityIcons
                                name={
                                  isSelected2
                                    ? 'checkbox-marked-outline'
                                    : 'checkbox-blank-outline'
                                }
                                size={18}
                                style={{color: '#5FB9E8'}}
                              />
                              <Text
                                style={[
                                  Stylesheet.selectedTextStyle,
                                  {marginLeft: 2, top: 2},
                                ]}>
                                {item}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                ) : null}

                {activeView === '' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginLeft: 15,
                    }}>
                    {selectedItems2.map((item, index) => {
                      return (
                        <View style={{margin: 3, flexDirection: 'row'}}>
                          <MaterialCommunityIcons
                            name={'checkbox-marked-outline'}
                            size={18}
                            style={{color: '#5FB9E8'}}
                          />
                          <Text
                            style={[
                              Stylesheet.selectedTextStyle,
                              {marginLeft: 2},
                            ]}>
                            {item}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
              </View>

              {/*  Heakt*/}
              <View
                style={[
                  Stylesheet.alergilist,
                  {
                    width: selectedItems3?.length > 0 ? wp(90) : wp(70),
                    paddingBottom: 10,
                    marginLeft: 15,
                    marginTop: 20,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    if (activeView === '') {
                      setActiveView('Dietary');
                    } else {
                      setActiveView('');
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    padding: 5,
                    top: 8,
                    marginLeft: 15,
                  }}>
                  <FontAwesome
                    name={activeView == 'Dietary' ? 'toggle-up' : 'toggle-down'}
                    size={18}
                    style={{color: '#5FB9E8'}}
                  />
                  <Text style={[Stylesheet.QTxt1, {left: 7}]}>
                    Dietary Restrictions
                  </Text>
                </TouchableOpacity>
                {activeView == 'Dietary' || selectedItems3.length ? (
                  <View
                    style={{
                      backgroundColor: '#E8E7EA',
                      width: selectedItems3?.length > 0 ? wp(90) : wp(70),
                      height: 0.5,
                      marginTop: 10,
                    }}></View>
                ) : null}

                {activeView === 'Dietary' ? (
                  <View style={{marginLeft: 15}}>
                    <FlatList
                      data={[...Restrictions, 'Other Text']}
                      renderItem={({item, index}) => {
                        const isSelected3 = selectedItems3.includes(item);

                        if (item === 'Other Text') {
                          return (
                            <>
                              {activeView != '' ? (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    height: 35,
                                    marginLeft: 2,
                                  }}>
                                  <MaterialCommunityIcons
                                    name={
                                      isSelected3
                                        ? 'checkbox-marked-outline'
                                        : 'checkbox-blank-outline'
                                    }
                                    size={18}
                                    style={{color: '#5FB9E8'}}
                                  />
                                  <TextInput
                                    style={{color: '#3F3F3F', top: 3}}
                                    placeholder="Other_________"
                                    placeholderTextColor={'#3F3F3F'}
                                    value={other3}
                                    onChangeText={txt => setOther3(txt)}
                                  />
                                </View>
                              ) : null}
                            </>
                          );
                        }

                        return (
                          <View style={{}}>
                            <TouchableOpacity
                              style={{
                                margin: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                              onPress={() => toggleSelection3(item)}>
                              <MaterialCommunityIcons
                                name={
                                  isSelected3
                                    ? 'checkbox-marked-outline'
                                    : 'checkbox-blank-outline'
                                }
                                size={18}
                                style={{color: '#5FB9E8'}}
                              />
                              <Text
                                style={[
                                  Stylesheet.selectedTextStyle,
                                  {marginLeft: 2, top: 2},
                                ]}>
                                {item}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                ) : null}

                {activeView === '' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginLeft: 15,
                    }}>
                    {selectedItems3.map((item, index) => {
                      return (
                        <View style={{margin: 3, flexDirection: 'row'}}>
                          <MaterialCommunityIcons
                            name={'checkbox-marked-outline'}
                            size={18}
                            style={{color: '#5FB9E8'}}
                          />
                          <Text
                            style={[
                              Stylesheet.selectedTextStyle,
                              {marginLeft: 2},
                            ]}>
                            {item}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
              </View>
              <View style={{alignSelf: 'center',bottom:0,position:'absolute',bottom:wp(15)}}>
                <TouchableOpacity
                  onPress={() => EditData2()}
                  style={{
                    backgroundColor: '#5FB9E8',
                    width: wp(60),
                    height: hp(6),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                  }}>
                  <Text style={Stylesheet.button_txt}>Ntrospect Me</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>,
      ],
    },
  ];

  const handleButtonClick = () => {
    const nextIndex = activeIndex + 1;

    if (flatListRef.current && nextIndex < slideData.length) {
      flatListRef.current.scrollToIndex({index: nextIndex});
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
        showPagination={!isKeyboardVisible ? true : false}
        keyExtractor={(item, index) => item.key}
        data={slideData}
        renderItem={({item, index}) => {
          return (
            <>
              <View>{item?.bordingdata[0]}</View>
            </>
          );
        }}
      />
      {!isKeyboardVisible ? (
        <View
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            bottom: 20,
          }}>
          {slideData.map((obj, index) => {
            return (
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 5,
                  backgroundColor: activeIndex == index ? '#5FB9E8' : 'gray',
                  width: activeIndex == index ? 25 : 8,
                }}></View>
            );
          })}
        </View>
      ) : null}
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
