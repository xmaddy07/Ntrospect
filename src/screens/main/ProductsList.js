import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  RefreshControl,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {family, images} from '../../constant/Index';
import {ProductlistAPIs, SearchAPI} from '../../components/ApiScreen';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Loader from '../../components/loader';
import Indicator from '../../components/Indicator';
import {UIActivityIndicator} from 'react-native-indicators';
import SeatchBar from '../../components/seatchBar';

export default function ProductsList({navigation, route}) {
  const {id} = route.params;
  const {name} = route.params;

  const user = useSelector(state => state.user.user);

  const [clrchange, setclrchange] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [backEnd, setBackEnd] = useState(0);

  const [searchResults, setSearchResults] = useState('');
  const [DataList, setDataList] = useState([]);


console.log('id',id)
console.log('DataList',DataList)

  useEffect(() => {
    news_hitApi
    _CategoryDetails(id)
  }, []);
  const news_hitApi = async => {
    ProductlistAPIs({
      url: `home-product/${id}?page=${pagination}`,
      Auth: user.token,
    })
      .then(res => {
        console.log('res',res)
        // setDataList(res.product_list);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err in product-list', err);
        setIsLoading(false);
      });
  };

  const _CategoryDetails = async => {
    ProductlistAPIs({
      url: `product-by-category/${id}?page=${pagination}`,
      Auth: user.token,
    })
      .then(res => {
        setDataList(res.product_list);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err in product-list', err);
        setIsLoading(false);
      });
  };

  const onSearch = async => {
    if (searchResults == '') {
      news_hitApi();
    } else {
      SearchAPI({url: `home-product-search/${searchResults}`, Auth: user.token})
        .then(res => {
          console.log('response of response a[pi',res)
          setDataList(res.recommendation);
          setIsLoading(false);
        })
        .catch(err => {
          console.log('err in product-list', err);
          setIsLoading(false);
        });
    }
  };

  const handleEndReached = () => {
    if (!isLoading && pagination < backEnd) {
      setPagination(pagination => pagination + 1);
      news_hitApi();
    }
  };

  const renderFooter = () => {
    return isLoading ? <UIActivityIndicator size={25} color="#5FB9E8" /> : null;
  };

  const Articleproduct = ({item, index}) => {

    return (
      <View style={{paddingBottom: 5,margin:2}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailsForProducts', {id: item.id})}
          activeOpacity={0.8}
          style={Stylesheet.Articleproduct_View}>
                     <View style={Stylesheet.prodctsBG2}>
             <Image
            style={Stylesheet.articleProducts_image}
            source={{uri: item?.images}}
            resizeMode="contain"
          />
          
          </View>

          <Text numberOfLines={1} style={Stylesheet.ArticleCart_txt2}>
              {item?.title?.length < 20
                ? `${item?.title}`
                : `${item?.title?.substring(0, 25)}...`}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={3}
              style={[Stylesheet.ArticleCart_txt5]}>
              {item?.description?.length < 50
                ? `${item?.description}`
                : `${item?.description?.substring(0, 30)}...`}
            </Text>
            <Text style={[Stylesheet.ArticleCart_txt4, {marginLeft:5}]}>
              {moment(item?.published_at).format('D/M/YYYY')}
            </Text>
         
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={Stylesheet.Container}>
      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>

        <Text style={Stylesheet.home_txt1}>{name}</Text>
        <Text>{'    '}</Text>
      </View>
      {/* <SeatchBar serchtext={setSearchResults} hitapi={onSearch}/> */}
   
      <View style={{flex: 1, marginBottom: 10,}}>
        <FlatList
        numColumns={3}
          data={DataList}
          // data={Artileslist}
          renderItem={Articleproduct}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleEndReached}
          ListFooterComponent={renderFooter}
        />
      </View>
    </View>
  );
}
