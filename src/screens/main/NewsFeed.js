import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {family} from '../../constant/Index';
import {ArticleNewsAPIs, SearchAPI} from '../../components/ApiScreen';
import {useSelector} from 'react-redux';
import Indicator from '../../components/Indicator';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SeatchBar from '../../components/seatchBar';
import Loader from '../../components/loader';

const NewsFeed = ({navigation}) => {
  const [searchResults, setSearchResults] = useState('');
  const [indicatorCursor, setIndicatorCursor] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [allNewsFeed, setallNewsFeed] = useState([]);

  const user = useSelector(state => state.user.user);

  const [Artiles, setArtiles] = useState([]);
  const [News, setNews] = useState([]);

  useEffect(() => {
    setIndicatorCursor(true);
    hitFuction();
  }, []);

  const hitFuction = async () => {
    ArticleNewsAPIs({url: 'article-news-list', Auth: user.token})
      .then(res => {
        console.log('resresresresresresres',res)
        setArtiles(res.article);
        setNews(res.news);
        setallNewsFeed(res)
        setSearchData('');
        setIndicatorCursor(false);

        console.log('res', res.message);
      })
      .catch(err => {
        console.log('err in article-list', err);
        setIndicatorCursor(false);
      });
  };

  const onSearch = txt => {
    if (txt == '') {
      hitFuction();
    } else {
      SearchAPI({url: `article-news-search/${txt}`, Auth: user.token})
        .then(res => {
          console.log('++++++++++++', res);
          setSearchData(res.data);
          setNews('');
          setArtiles('');
        })
        .catch(err => {
          console.log('err in product-list', err);
        });
    }
  };

  const NewsProducts = ({item, index}) => {
    return (
      <View style={{marginLeft: 5}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailsForNews', {id: item.id})}
          style={[
            Stylesheet.RecommendedProducts_View,
            {
              width: wp(37),
              // alignItems: 'center',
              height: 160,
              margin: wp(1),
            },
          ]}>
          {/* <View
            style={[
              Stylesheet.prodctsBG,
              {width: wp(36), height: hp(15), marginTop: 2, marginLeft: 2,backgroundColor: '#F8F8F8',},
            ]}> */}
          <Image
            style={[
              Stylesheet.RecommendedProducts_image,
              {width: wp(37), height: hp(14), borderRadius: 5},
            ]}
            source={{uri: item.image}}
            resizeMode="contain"
          />
          {/* </View> */}

          <Text style={[Stylesheet.producttxt, {marginLeft: 8}]}>
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
  const Articleproduct = ({item, index}) => {
    return (
      <View style={{marginLeft: 5}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailsForArticle', {id: item.id})
          }
          style={[
            Stylesheet.RecommendedProducts_View,
            {
              width: wp(37),
              height: 160,
              margin: wp(1),
            },
          ]}>
       
          <Image
            style={[
              Stylesheet.RecommendedProducts_image,
              {width: wp(37), height: hp(14), borderRadius: 5},
            ]}
            source={{uri: item.image}}
            resizeMode="contain"
          />

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
  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailsForArticle', {id: item.id})
          }
          style={Stylesheet.RecommendedProducts_View}>
          <View style={Stylesheet.prodctsBG}>
            <Image
              style={Stylesheet.RecommendedProducts_image}
              source={{uri: item.image}}
              resizeMode="contain"
            />
          </View>

          <Text style={Stylesheet.producttxt}>
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

  const _categoriesItem = ({item, index}) => {
    return (
      <View style={{marginLeft: 5}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailsForArticle', {id: item.id})
          }
          style={[
            Stylesheet.RecommendedProducts_View,
            {
              width: wp(37),
              height: 160,
              margin: wp(1),
            },
          ]}>
       
          <Image
            style={[
              Stylesheet.RecommendedProducts_image,
              {width: wp(37), height: hp(14), borderRadius: 5},
            ]}
            source={{uri: item.img_url}}
            resizeMode="contain"
          />

          <Text style={[Stylesheet.producttxt, {}]}>
            {item.title.length > 15
              ? item.title.substring(0, 36) + '...'
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
      {indicatorCursor && <Indicator />}
      <View style={Stylesheet.Headerstyle2}>
        <Text style={Stylesheet.home_txt1}>News Feed</Text>
      </View>

      <SeatchBar serchtext={txt => onSearch(txt)} />
      <ScrollView>
        <View>
          {News?.length ? (
            <>
              <View style={[Stylesheet.txt1_View, {marginTop: 13}]}>
                <Text style={[Stylesheet.ProductName_txt1, {left: wp(2.5)}]}>
                  News
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('NewsList')}>
                  <Text style={Stylesheet.ProductName_txt2}>See more</Text>
                </TouchableOpacity>
              </View>
              <View style={{height: hp(26),marginTop:10,}}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={News}
                  renderItem={NewsProducts}
                  // ListFooterComponent={({item, index}) => {
                  //   console.log('mkknmk', item);
                  //   return (
                  //     <TouchableOpacity
                  //       onPress={() => navigation.navigate('NewsList')}>
                  //       {News?.length > 1 ? (
                  //         <View style={{marginTop: wp(26)}}>
                  //           <EvilIcons
                  //             name="arrow-right"
                  //             size={45}
                  //             color="#A2A2A2"
                  //           />
                  //         </View>
                  //       ) : null}
                  //     </TouchableOpacity>
                  //   );
                  // }}
                />
              </View>
            </>
          ) : null}

          {Artiles?.length ? (
            <>
              <View style={[Stylesheet.txt1_View, {marginTop: wp(0)}]}>
                <Text style={[Stylesheet.ProductName_txt1, {left: wp(2.5)}]}>
                  Articles
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ArticlesList')}>
                  <Text style={Stylesheet.ProductName_txt2}>See more</Text>
                </TouchableOpacity>
              </View>
              <View style={{height: hp(26),marginTop:10,}}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={Artiles}
                  renderItem={Articleproduct}
                  // ListFooterComponent={({item, index}) => {
                  //   return (
                  //     <TouchableOpacity
                  //       onPress={() => navigation.navigate('ArticlesList')}>
                  //       {Artiles?.length > 1 ? (
                  //         <View style={{marginTop: wp(26)}}>
                  //           <EvilIcons
                  //             name="arrow-right"
                  //             size={45}
                  //             color="#A2A2A2"
                  //           />
                  //         </View>
                  //       ) : null}
                  //     </TouchableOpacity>
                  //   );
                  // }}
                />
              </View>
            </>
          ) : null}

          {searchData?.length ? (
            <>
              <View style={Stylesheet.txt1_View}>
                <Text style={[Stylesheet.ProductName_txt1, {left: wp(4)}]}>
                  Search result
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ArticlesList')}>
                  <Text style={Stylesheet.ProductName_txt2}>{'    '}</Text>
                </TouchableOpacity>
              </View>
              <View style={{height: hp(20)}}>
                <FlatList
                  numColumns={3}
                  showsHorizontalScrollIndicator={false}
                  // horizontal={true}
                  data={searchData}
                  renderItem={renderItem}
                  // ListFooterComponent={({item,index})=>{
                  //   return (
                  //     <TouchableOpacity   onPress={() =>
                  //       navigation.navigate('ArticlesList')
                  //     }>
                  //    {searchData?.length >1 ? <View style={{marginTop:wp(26)}}>
                  //         <EvilIcons name="arrow-right" size={45} color="#A2A2A2"/>
                  //       </View>:null}
                  //     </TouchableOpacity>
                  //   );
                  // }}
                />
              </View>
            </>
          ) : null}

<View>
  <FlatList
  data={allNewsFeed.news_list}
  renderItem={({item,index})=>{
    return (
      <View style={{}}>
          <View style={[Stylesheet.txt1_View, {marginTop: wp(0)}]}>
                <Text style={[Stylesheet.ProductName_txt1, {left: wp(2.5)}]}>
                  {item?.category_name}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ArticlesList')}>
                  <Text style={Stylesheet.ProductName_txt2}>See more</Text>
                </TouchableOpacity>
              </View>

        <View style={{height: hp(26),marginTop:10,}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={item?.news}
            renderItem={_categoriesItem}
            // ListFooterComponent={({item, index}) => {
            //   return (
            //     <TouchableOpacity
            //       onPress={() =>
            //         navigation.navigate('ProductsList', {id: 'baked',name: 'Baked Goods',
            //         })
            //       }>
            //       {allNewsFeed ? (
            //         <View
            //           style={{
            //             width: wp(26),
            //             height: 90,
            //             borderRadius: 10,
            //             // backgroundColor:'#F8F8F8',
            //             alignItems: 'center',
            //             justifyContent: 'center',
            //             marginTop: 10,
            //           }}>
            //           <Text
            //             style={[
            //               Stylesheet.ProductName_txt2,
            //               {right: 0},
            //             ]}>
            //             See more
            //           </Text>
            //         </View>
            //       ) : null}
            //     </TouchableOpacity>
            //   );
            // }}
          />
        </View>
      </View>
    );
  }}
  />
</View>

          {/* <View style={Stylesheet.txt1_View}>
          <Text style={Stylesheet.ProductName_txt1}>Recipes</Text>
          <TouchableOpacity>
          <Text style={Stylesheet.ProductName_txt2}>See more</Text>
          </TouchableOpacity>
        </View>
        <View style={{height:hp(29),}}>
          <FlatList
            horizontal={true}
            data={producData3}
            renderItem={Articleproduct}
          />
        </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default NewsFeed;
