import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {family} from '../../constant/Index';
import ReadMore from '@fawazahmed/react-native-read-more';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Detail_API} from '../../components/ApiScreen';
import Loader from '../../components/loader';
import {useSelector} from 'react-redux';
import Indicator from '../../components/Indicator';

const descrip =
  "oligosaccharides), medical food, bottled water, breakfast cereals,coffee and tea, confectionery, dairy products, ice cream, frozenfood, pet foods, and snacks. Twenty-nine of Nestlé's brands haannual sales of over 1 billion CHF (about US$1.1 billion)[13]including Nespresso, Nescafé, Kit Kat, Smarties, Nesquik,Stouffer's, Vittel, and Maggi. Nestlé has 447 factories, operates in 189 countries, and employs around 339,000 people.[14] It is one of the main shareholders of L'Oreal, the world's largest cosmetics company.[15] Nestlé was formed in 1905 by the merger of the Anglo-Swiss Milk Company, which was established in 1866 by brothers George and Charle";

const Company = ({navigation, route}) => {
  const {companyData} = route.params;
  const user = useSelector(state => state.user.user);

  const [indicator, setIndicator] = useState(false);
  const [detail, setDetailss] = useState([]);

  useEffect(() => {
    Detail_data(companyData.id);
  }, []);

  const Detail_data = async id => {
    Detail_API({url: 'news-comapny', Auth: user.token, id: companyData.id})
      .then(res => {
        console.log('+++++',res)
        setDetailss(res.news);
      })
      .catch(err => {
        console.log('err in acomapny', err);
      });
  };



  const renderItem = ({item, index}) => {
    return (
      <View style={{marginLeft: 8,}}>
        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={() => navigation.navigate('RelatedItemNews', {id: item.id})}
          style={[Stylesheet.Rodnae_view9, {}]}>
          <View style={Stylesheet.prodctsBG}>
            <Image
              style={{width: wp(24), height: hp(10), borderRadius: 3}}
              source={{uri:item.image}}
              resizeMode="contain"
            />
          </View>
          <Text style={[Stylesheet.producttxt, {marginLeft: 5}]}>
          {item.title.length > 30
              ? item.title.substring(0, 21) + '...'
              : item.title}
          </Text>
          {/* <Text style={Stylesheet.Rodnae_txt10}>
            {item.description.length > 30
              ? item.description.substring(0, 50) + '...'
              : item.description}
          </Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={Stylesheet.Container}>
      {indicator && <Indicator />}
      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.RecomendProduct_txt1}>{companyData.name}</Text>
        <Text>{'    '}</Text>
      </View>
      <ScrollView>
        <View style={{paddingBottom: wp(5)}}>
          <Image
            style={Stylesheet.nestleImage}
            source={{uri: companyData.image}}
            resizeMode="contain"
          />
          <View style={{marginHorizontal: wp(4), marginTop: wp(5)}}>
            <ReadMore
              numberOfLines={10}
              style={Stylesheet.Rodnae_txt8}
              seeMoreStyle={{
                color: '#A2A2A2',
                fontSize: 10,
                fontFamily: family.medium,
              }}
              seeLessStyle={{color: 'transparent'}}>
              {companyData.information}
            </ReadMore>
            <View></View>
          </View>
          <View style={{marginTop: 20,marginLeft:18}}>
            <Text style={Stylesheet.Nestle_txt3}>Parent Company and Subsidiary</Text>
            <View style={Stylesheet.Nestle_CerealView}>
              <Entypo name="vinyl" size={20} color={'#5FB9E8'}/>
              <TouchableOpacity
                // onPress={() => navigation.navigate('Manufacture')}
                >
                <Text style={Stylesheet.Nestle_txt4}>
                  {companyData.parent_company}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={Stylesheet.Rodnae_txt9}>Suggested News</Text>
              <TouchableOpacity>
                <Text style={Stylesheet.Rodnae_txt11}>See more</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, marginTop: 5,paddingBottom:20,}}>
              <FlatList
                horizontal
                data={detail}
                renderItem={renderItem}
                // keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Company;
