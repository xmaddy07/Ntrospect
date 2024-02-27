import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {family} from '../../constant/Index';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {ArticleNewsAPIs, SearchAPI} from '../../components/ApiScreen';
import Indicator from '../../components/Indicator';
import SeatchBar from '../../components/seatchBar';
import {logoutUser} from '../../ReduxToolkit/MyUserSlice';

const Products = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const [indicatorCursor, setIndicatorCursor] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [isScrolling, setScrolling] = useState(false);


  // Function to handle the end of scrolling
  const handleScrollEnd = () => {
    setScrolling(false);
  };

 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    hitFuction();
  }, []);

  const [recomemded, setRecomemded] = useState([]);
  const [allcategories, setAllcategories] = useState([]);

  const hitFuction = async () => {
    setIndicatorCursor(true);
    ArticleNewsAPIs({url: 'home-product-list', Auth: user.token})
      .then(res => {
        setIndicatorCursor(false);
        if (res.message == 'Unauthenticated.') {
          dispatch(logoutUser());
        }
        setRecomemded(res.recommendation);
        setAllcategories(res.categories);
        setSearchData('');
      })
      .catch(err => {
        console.log('err in products', err);
        setIndicatorCursor(false);
      });
  };
  const onSearch = txt => {
    if (txt == '') {
      hitFuction();
    } else {
      SearchAPI({
        url: `product-list-search/${txt}`,
        Auth: user.token,
        barcode: txt,
      })
        .then(res => {
          console.log('res', res);
          setSearchData(res.products);
          setsugges('');
          setbaked('');
          setjuice('');
        })
        .catch(err => {
          console.log('err in product-list', err);
        });
    }
  };

  const RecommendedProducts = ({item, index}) => {
    // console.log('item',item)
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailsForProducts', {id: item.id,name:'Recommended'})}
          style={[
            Stylesheet.RecommendedProducts_View,
            {
              width: wp(37),
              height: 160,
              margin: wp(1),
            },
          ]}>
          <View
            style={[
              Stylesheet.prodctsBG,
              {width: wp(36), height: hp(15), marginTop: 2, marginLeft: 2},
            ]}>
            <Image
              style={[
                Stylesheet.RecommendedProducts_image,
                {width: 100, height:100},
              ]}
              source={{uri: item.images}}
              resizeMode="contain"
            />
          </View>

          <Text style={[Stylesheet.producttxt, {}]}>
            {item.title.length > 15
              ? item.title.substring(0, 25) + '...'
              : item.title}
          </Text>
          {/* <Text style={[Stylesheet.Recommended_descriptiontxt,{}]}>
    {item?.description.length >10
        ? item?.description.substring(0, 17) + '...'
        : item?.description}
    </Text> */}
        </TouchableOpacity>
      </View>
    );
  };
  const BakedGoods = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailsForProducts', {id: item.id,})
          }
          style={Stylesheet.RecommendedProducts_View}>
          <View style={Stylesheet.prodctsBG}>
            <Image
              style={Stylesheet.RecommendedProducts_image}
              source={{uri: item.images}}
              resizeMode="contain"
            />
          </View>

          <Text style={Stylesheet.producttxt}>
            {item.title.length > 15
              ? item.title.substring(0, 20) + '...'
              : item.title}
          </Text>
          {/* <Text style={[Stylesheet.Recommended_descriptiontxt,{}]}>
          {item?.description.length >10
              ? item?.description.substring(0, 17) + '...'
              : item?.description}
          </Text> */}
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={Stylesheet.Container}>
      {/* <StatusBar
        backgroundColor="#FFFFFF" // Status bar background color
        barStyle="dark-content" // Content color (dark or light)
      /> */}
      {indicatorCursor && <Indicator />}
      <View style={Stylesheet.Headerstyle2}>
        <Text style={Stylesheet.home_txt1}>Products</Text>
      </View>
      {/* <SeatchBar serchtext={txt => onSearch(txt)} /> */}
      <ScrollView >
        <View style={{paddingBottom: wp(5)}}>
          {recomemded?.length ? (
            <View>
              <View style={Stylesheet.txt1_View}>
                <Text style={Stylesheet.ProductName_txt1}>
                  {'Recommended for you'}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductsList', {
                      id: 'suggestions',
                      name: 'Suggested Products',
                    })
                  }>
                  <Text style={Stylesheet.ProductName_txt2}>See more</Text>
                </TouchableOpacity>
              </View>
              <View style={{height: hp(22)}}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={recomemded}
                  onScrollEndDrag={handleScrollEnd}
                  renderItem={RecommendedProducts}
                  ListFooterComponent={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ProductsList', {
                            id: 'suggestions',
                            name: 'Suggested Products',
                          })
                        }>
                        {recomemded?.length > 1 ? (
                          <View
                            style={{
                              width: wp(26),
                              height: 90,
                              borderRadius: 10,
                              // backgroundColor:'#F8F8F8',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 10,
                            }}>
                            <Text
                              style={[Stylesheet.ProductName_txt2, {right: 0}]}>
                              See more
                            </Text>
                          </View>
                        ) : null}
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          ) : null}
<View>
  <FlatList
  data={allcategories}
  renderItem={({item,index})=>{
    return (
      <View style={{}}>
        <View style={Stylesheet.txt1_View}>
          <Text style={Stylesheet.ProductName_txt1}>
            {item.category_name}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductsList', {
                id:item.category_id,
                name:item.category_name,
              })
            }>
            <Text style={Stylesheet.ProductName_txt2}>See more</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: hp(19),marginTop:10}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={item.products}
            onScrollEndDrag={handleScrollEnd}
            renderItem={BakedGoods}
            ListFooterComponent={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductsList', {id: 'baked',name: 'Baked Goods',
                    })
                  }>
                  {allcategories ? (
                    <View
                      style={{
                        width: wp(26),
                        height: 90,
                        borderRadius: 10,
                        // backgroundColor:'#F8F8F8',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}>
                      <Text
                        style={[
                          Stylesheet.ProductName_txt2,
                          {right: 0},
                        ]}>
                        See more
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }}
  />
</View>

        </View>
      </ScrollView>
    </View>
  );
};

export default Products;
