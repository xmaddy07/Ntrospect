import { TextInput, View, Keyboard, Button ,TouchableOpacity,Image} from 'react-native'
import React,{PureComponent,ref, useRef} from 'react'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import Search from 'react-native-search-box';


export default function SeatchBar({serchtext,hitapi,filter,filtertrue,}) {

    const searchBoxRef = useRef(null);
    const   onSearch = (searchText) => {
        return new Promise((resolve, reject) => {
            serchtext(searchText)
            resolve();
            hitapi()
        });
    }

    
    // Important: You must return a Promise
    const  beforeFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('beforeFocus');
            resolve();
        });
    }
 
    // Important: You must return a Promise
    const  onFocus = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onFocus', text);
            resolve();
        });
    }
 
    // Important: You must return a Promise
  const  afterFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('afterFocus');
            resolve();
        });
    }



  return (
<View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
    <View style={{marginTop:5,width:filtertrue? wp(85):wp(95),}}>
    <Search
        ref={searchBoxRef}
      onSearch={onSearch}
      backgroundColor={'#DADADA'}
      tintColorDelete={'#DADADA'}
      inputStyle={{
        backgroundColor:'#FFFFFF',
        color:'#000',
        height:33
      }}
      cancelButtonStyle={{
        color:'#FFFFFF'
      }}
     
      
      
    />
 

  
  </View>
{filtertrue?  <TouchableOpacity
          onPress={() => filter()}
          style={{   
          backgroundColor: '#DADADA',
          width: wp(11),
          height: hp(6.25),
          top:2.3,
          alignItems: 'center',
          justifyContent: 'center',
          }}>
          <Image
            style={{width: 18, height: 18}}
            source={require('../assets/filter.png')}
            resizeMode="contain"
          />
          </TouchableOpacity>:null}
  </View>
  )
}

