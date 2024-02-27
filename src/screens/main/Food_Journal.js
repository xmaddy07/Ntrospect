import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import {BarChart} from 'react-native-gifted-charts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SwipeListView} from 'react-native-swipe-list-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {images, family} from '../../constant/Index';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import DonutProgress from '../../components/DonutProgress';
import {colors} from '../../components/Colors';
import Weekchart from '../../components/weekchart';
import NutrientsChart from '../../components/NutrientsChart';
import LineCharts from '../../components/LineChart';
const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const screenWidth = Dimensions.get('window').width;

const Food_Journal = ({navigation, data}) => {
  const [clrchng, setclrchng] = useState('today');
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  const [counter, setCounter] = useState(1);

  const journalData = [
    {
      id: 1,
      name: 'Gala Biscuit',
      Kcal: '650',
      carb: '6.1 g',
      fat: '4.3 g',
      protein: '1.1 g',
    },
    {
      id: 2,
      name: 'Dinner',
      Kcal: '530',
      carb: '3.2 g',
      fat: '5.1 g',
      protein: '2.1 g',
    },
  ];

  const NutrientsData = [
    {
      id: 1,
      name: 'Carb',
      goal: '250g goal',
      chart: [
        <NutrientsChart
          percentage={80}
          color1={'#6225B0'}
          color3={'#A379D6'}
        />,
      ],
    },
    {
      id: 2,
      name: 'Fat',
      goal: '61g goal',
      chart: [
        <NutrientsChart
          percentage={40}
          color1={'#A73437'}
          color3={'#ED7681'}
        />,
      ],
    },
    {
      id: 3,
      name: 'Protien',
      goal: '113g goal',
      chart: [
        <NutrientsChart
          percentage={50}
          color1={'#4F9072'}
          color3={'#45D799'}
        />,
      ],
    },
  ];
  const NutrientsData2 = [
    {
      id: 1,
      name: 'Carb',
      goal: '250g goal',
      chart: [
        <NutrientsChart
          percentage={35}
          color1={'#6225B0'}
          color3={'#A379D6'}
        />,
      ],
    },
    {
      id: 2,
      name: 'Fat',
      goal: '61g goal',
      chart: [
        <NutrientsChart
          percentage={70}
          color1={'#A73437'}
          color3={'#ED7681'}
        />,
      ],
    },
    {
      id: 3,
      name: 'Protien',
      goal: '113g goal',
      chart: [
        <NutrientsChart
          percentage={85}
          color1={'#4F9072'}
          color3={'#45D799'}
        />,
      ],
    },
  ];

  const NutrientsItem = ({item}) => {
    return (
      <View style={Stylesheet.NutrientsCircle}>
        <Text
          style={{
            fontFamily: family.medium,
            fontSize: 14,
            color: '#000',
            marginTop: 5,
          }}>
          {item.name}
        </Text>
        <View style={{marginVertical: 8}}>{item.chart}</View>
        <Text
          style={{
            fontFamily: family.medium,
            fontSize: 12,
            color: '#000',
          }}>
          {item.goal}
        </Text>
      </View>
    );
  };
  const NutrientsItem2 = ({item}) => {
    return (
      <View style={Stylesheet.NutrientsCircle}>
        <Text
          style={{
            fontFamily: family.medium,
            fontSize: 14,
            color: '#000',
            marginTop: 5,
          }}>
          {item.name}
        </Text>
        <View style={{marginVertical: 8}}>{item.chart}</View>
        <Text
          style={{
            fontFamily: family.medium,
            fontSize: 12,
            color: '#000',
          }}>
          {item.goal}
        </Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={Stylesheet.flatlistView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <Text style={Stylesheet.flatlisttxt1}>{item.name}</Text>
          <Text style={Stylesheet.flatlisttxt1}>
            {item.Kcal}{' '}
            <Text
              style={{
                fontFamily: family.regular,
                color: '#B6B6B6',
                fontSize: 12,
              }}>
              {'Kcal'}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <View
            style={[
              Stylesheet.fleex1,
              {width: 180, justifyContent: 'space-between'},
            ]}>
            <View style={Stylesheet.fleex1}>
              <FontAwesome
                name="circle-o"
                size={15}
                style={{color: '#FBA118'}}
              />
              <Text style={Stylesheet.flatlisttxt2}>{item.carb}</Text>
            </View>

            <View style={Stylesheet.fleex1}>
              <FontAwesome
                name="circle-o"
                size={15}
                style={{color: '#673BE2'}}
              />
              <Text style={Stylesheet.flatlisttxt2}>{item.carb}</Text>
            </View>

            <View style={Stylesheet.fleex1}>
              <FontAwesome
                name="circle-o"
                size={15}
                style={{color: '#2BDBF3'}}
              />
              <Text style={Stylesheet.flatlisttxt2}>{item.carb}</Text>
            </View>
          </View>

          <TouchableOpacity>
            <AntDesign name="pluscircle" size={25} style={{color: '#04C848'}} />
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    );
  };

  return (
    <View style={Stylesheet.Container}>
      <View style={Stylesheet.Headerstyle2}>
        <Text style={Stylesheet.home_txt1}>Food Journal</Text>
      </View>
      <ScrollView>
        <View style={{paddingBottom: 20}}>
          <View style={Stylesheet.jornal_View1}>
            <TouchableOpacity
              onPress={() => setclrchng('today')}
              style={Stylesheet.jornal_today}>
              <Text
                style={[
                  Stylesheet.Lugala_txt2,
                  {
                    color: clrchng == 'today' ? '#5FB9E8' : '#000',
                    fontFamily:
                      clrchng == 'today' ? family.semibold : family.regular,
                  },
                ]}>
                Today
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setclrchng('week')}
              style={Stylesheet.jornal_week}>
              <Text
                style={[
                  Stylesheet.Lugala_txt2,
                  {
                    color: clrchng == 'week' ? '#5FB9E8' : '#000',
                    fontFamily:
                      clrchng == 'week' ? family.semibold : family.regular,
                  },
                ]}>
                Weekly
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setclrchng('month')}
              style={Stylesheet.jornal_week}>
              <Text
                style={[
                  Stylesheet.Lugala_txt2,
                  {
                    color: clrchng == 'month' ? '#5FB9E8' : '#000',
                    fontFamily:
                      clrchng == 'month' ? family.semibold : family.regular,
                  },
                ]}>
                Monthly
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setclrchng('year')}
              style={Stylesheet.jornal_year}>
              <Text
                style={[
                  Stylesheet.Lugala_txt2,
                  {
                    color: clrchng == 'year' ? '#5FB9E8' : '#000',
                    fontFamily:
                      clrchng == 'year' ? family.semibold : family.regular,
                  },
                ]}>
                Yearly
              </Text>
            </TouchableOpacity>
          </View>

          {clrchng == 'today' ? (
            <View>
              {/* today chart */}
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  marginTop: 20,
                }}>
                <DonutProgress percentage={70} />
              </View>

              <View style={{marginTop: wp(5)}}>
                {/* <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            /> */}
              </View>

              <View
                style={{
                  maxHeight: hp(22),
                  minHeight: hp(12),
                  marginTop: wp(3),
                }}>
                <FlatList data={journalData} renderItem={renderItem} />
              </View>
            </View>
          ) : clrchng == 'week' ? (
            <>
              <View>
                <Weekchart />
                <View style={{marginTop: 15}}>
                  <View
                    style={[
                      Stylesheet.fleex1,
                      {justifyContent: 'space-between', marginHorizontal: 10},
                    ]}>
                    <Text
                      style={{
                        fontFamily: family.semibold,
                        fontSize: 14,
                        color: '#000',
                      }}>
                      Net Average
                    </Text>
                    <Text
                      style={{
                        fontFamily: family.medium,
                        fontSize: 14,
                        color: 'gray',
                      }}>
                      1880
                    </Text>
                  </View>

                  <View
                    style={[
                      Stylesheet.fleex1,
                      {justifyContent: 'space-between', marginHorizontal: 10},
                    ]}>
                    <Text
                      style={{
                        fontFamily: family.semibold,
                        fontSize: 14,
                        color: '#000',
                      }}>
                      Goal
                    </Text>
                    <Text
                      style={{
                        fontFamily: family.medium,
                        fontSize: 14,
                        color: 'gray',
                      }}>
                      1580
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontFamily: family.semibold,
                    fontSize: 18,
                    color: '#000',
                    marginTop: 20,
                    marginLeft: 10,
                  }}>
                  Nutrients
                </Text>
                <View style={{paddingBottom: 20}}>
                  <FlatList
                    horizontal
                    data={NutrientsData}
                    renderItem={NutrientsItem}
                  />
                </View>
              </View>
            </>
          ) : clrchng == 'year' ? (
            <>
              <View>
                <LineCharts />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: family.semibold,
                    fontSize: 18,
                    color: '#000',
                    marginTop: 20,
                    marginLeft: 10,
                  }}>
                  Nutrients
                </Text>
                <View style={{paddingBottom:20}}>
                  <FlatList
                    horizontal
                    data={NutrientsData2}
                    renderItem={NutrientsItem2}
                  />
                </View>
              </View>
            </>
          ) : clrchng == 'month' ? (
            <>
              <View>
                <LineCharts />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: family.semibold,
                    fontSize: 18,
                    color: '#000',
                    marginTop: 20,
                    marginLeft: 10,
                  }}>
                  Nutrients
                </Text>
                <View style={{paddingBottom:20}}>
                <FlatList
                  horizontal
                  data={NutrientsData2}
                  renderItem={NutrientsItem2}
                />
                </View>
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default Food_Journal;
