import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ImageBackground
} from 'react-native';
import React, {useState,useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {family, images} from '../../constant/Index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ReadMore from '@fawazahmed/react-native-read-more';
import { Detail_API, SearchAPI } from '../../components/ApiScreen';
import Loader from '../../components/loader';
import { useSelector } from 'react-redux';
import moment from 'moment';
import SeatchBar from '../../components/seatchBar';


const Brand = ({navigation,route}) => {
  const {name,id}=route.params
  const user = useSelector(state => state.user.user);
  const [indicator, setIndicator] = useState(false);
  const [detail, setDetailss] = useState([]);
  const [searchResults, setSearchResults] = useState('');
  const [SearchData, setSearchData] = useState([]);
  console.log('SearchData',SearchData)

    useEffect(() => {
    Detail_data(id);
  }, []);
  const Detail_data = async => {
    Detail_API({url: 'product-brand', Auth: user.token, id: id})
      .then(res => {
        setDetailss(res.products);
      })
      .catch(err => {
        console.log('err in article-list', err);
      });
  };

  const onSearch = (txt) => {
    console.log('txt',txt)
    if (txt == '') {
      Detail_data();
    } else {
      SearchAPI({url: `product-brand/${id}/${txt}`, Auth: user.token,})
        .then(res => {
          console.log('res res res++++++++++',res)
          setSearchData(res.products);
          setSearchResults(txt)
        })
        .catch(err => {
          console.log('err in product-list', err);
        });
    }
  };
  

  
  // const Detail_data = async id => {
  //   Detail_API({url: 'product-detail', Auth: user.token, id: id})
  //     .then(res => {
  //       setDetailss(res.product.brand);
  //       setIndicator(false);
  //     })
  //     .catch(err => {
  //       console.log('err in article-list', err);
  //       setIndicator(false);
  //     });
  // };



  const Articleproduct = ({item, index}) => {
    return (
      <View style={{margin: 2}}>
        <TouchableOpacity
      
          activeOpacity={0.8}
          style={Stylesheet.Articleproduct_View}>
          <View
            style={[
              Stylesheet.prodctsBG2,
              {
                // backgroundColor:'green',
              },
            ]}>
            <ImageBackground
              style={Stylesheet.articleProducts_image}
              source={{uri:item.images}}
              resizeMode="contain"
              borderRadius={3}>
   
            </ImageBackground>
          </View>

          <Text numberOfLines={1} style={Stylesheet.ArticleCart_txt2}>
            {item?.title?.length < 20
              ? `${item?.title}`
              : `${item?.title?.substring(0, 25)}...`}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={3}
            style={[Stylesheet.ArticleCart_txt5,{width:90,}]}>
            {item?.description?.length < 50
              ? `${item?.description}`
              : `${item?.description?.substring(0, 25)}...`}
          </Text>
          <Text style={[Stylesheet.ArticleCart_txt4, {marginLeft: 5}]}>
            {moment(item?.published_at).format('D/M/YYYY')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _searchItem = ({item, index}) => {
    return (
      <View style={{margin: 2}}>
        <TouchableOpacity
      
          activeOpacity={0.8}
          style={Stylesheet.Articleproduct_View}>
          <View
            style={[
              Stylesheet.prodctsBG2,
              {
                // backgroundColor:'green',
              },
            ]}>
            <ImageBackground
              style={Stylesheet.articleProducts_image}
              source={{uri:item.images}}
              resizeMode="contain"
              borderRadius={3}>
   
            </ImageBackground>
          </View>

          <Text numberOfLines={1} style={Stylesheet.ArticleCart_txt2}>
            {item?.title?.length < 20
              ? `${item?.title}`
              : `${item?.title?.substring(0, 25)}...`}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={3}
            style={[Stylesheet.ArticleCart_txt5,{width:90,}]}>
            {item?.description?.length < 50
              ? `${item?.description}`
              : `${item?.description?.substring(0, 25)}...`}
          </Text>
          <Text style={[Stylesheet.ArticleCart_txt4, {marginLeft: 5}]}>
            {moment(item?.updated_at).format('D/M/YYYY')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={Stylesheet.Container}>
      {indicator && <Loader />}
      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>{name}</Text>
        <Text>{'    '}</Text>
      </View>
      <SeatchBar  serchtext={(txt)=>onSearch(txt)}/>
  {!SearchData ?   <View style={{flex: 1, marginBottom: 10,}}>
        <FlatList
        numColumns={3}
          data={detail}
          renderItem={Articleproduct}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>:null}
    {SearchData?  <View style={{flex: 1, marginBottom: 10,}}>
        <FlatList
        numColumns={3}
          data={SearchData}
          renderItem={_searchItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>:null}
    </View>
  );
};

export default Brand;
