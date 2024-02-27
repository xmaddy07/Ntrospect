import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {family, images} from '../../constant/Index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ReadMore from '@fawazahmed/react-native-read-more';

const Exports = ({navigation, route}) => {
  const {Data} = route.params;
  const {id,icons,gala,product} = route.params;

const  ingredient=[
{ 
  id:1,
  image: require('../../assets/halal.png'),
},
{
  id:2,
  image:    require('../../assets/pngwing.png')
},
{
  id:3,
  image:  require('../../assets/vegn.png')
},
{
  id:4,
  image:   require('../../assets/jewish.png')
}
   
  
]

  return (
    <View style={Stylesheet.Container}>
      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity
          onPress={() => navigation.navigate(gala? 'Lugala':'DetailsForProducts', {data: id})}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>{Data.name?Data.name:Data.title?Data.title:null}</Text>
        <Text>{'    '}</Text>
      </View>

      <ScrollView>
        <View>
          <Image
            style={[Stylesheet.halalfood,{width:Data.name?180:wp(98),height:Data.name?180:200}]}
            source={{uri: Data.image}}
            resizeMode="cover"
          />
{!icons ?
    <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop:15,
                alignSelf:'flex-start',
                width:160
                // marginHorizontal: 40,
              }}>
              {ingredient.map(item => {
                console.log('ingredient+++',item)
                return (
                  <TouchableOpacity
                   >
                    <Image
                    
                      style={{width:30,height:30}}
                      source={item.image}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>:null}

          
          <View
            style={{
              marginHorizontal: wp(4),
              marginTop:!icons ? wp(3):wp(8),
              paddingBottom: wp(5),
            }}>
            <ReadMore
              numberOfLines={13}
              style={Stylesheet.Rodnae_txt8}
              seeMoreStyle={{color: '#A2A2A2',fontSize:10,fontFamily:family.medium}}
              seeLessStyle={{color: 'transparent'}}
              seeMoreText='Give me more details'
              >
              {Data.description}
            </ReadMore>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Exports;
