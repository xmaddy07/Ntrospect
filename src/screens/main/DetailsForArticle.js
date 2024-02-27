import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  ImageBackground
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {family, images} from '../../constant/Index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ReadMore from '@fawazahmed/react-native-read-more';
import Indicator from '../../components/Indicator';
import {
  NewsArticle_Detail_APIs,
  NewsArticle_LikeDis_APIs,
  NewsArticle_AddFav_APIs,
} from '../../components/ApiScreen';
import {useSelector} from 'react-redux';
import moment from 'moment';
import CommentForArticle from '../../components/CommentForArticle';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';





const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const DetailsForArticle = ({navigation, route}) => {
  const {id} = route.params;
  // console.log('id.........', id);

  const user = useSelector(state => state.user.user);

  const [clrchage3rd, setClrchage3rd] = useState(false);

  const [ShowComment, setShowComment] = useState(false);
  const [indicatorCursor, setIndicatorCursor] = useState(false);

  const [DetailData, setDetailData] = useState([]);
  const [recomand_Data, setRecomand_Data] = useState([]);

  useEffect(() => {
    DetailArticle(id);
  }, []);

  const DetailArticle = async id => {
    setIndicatorCursor(true);
    NewsArticle_Detail_APIs({
      url: 'article-detail',
      Auth: user.token,
      id: id,
    })
      .then(res => {
        setIndicatorCursor(false);
        if (res.status == 'error') {
        } else if (res.status == 'success') {
          setDetailData(res.data);
          setRecomand_Data(res.recommendation)
          setIndicatorCursor(false);
        }
      })
      .catch(err => {
        console.log('err in Filter-list', err);
        setIndicatorCursor(false);
      });
  };
  ////////// like
  const LikeApi = async () => {
    const formdata = new FormData();
    formdata.append('article_id', id),
      formdata.append('is_like', '1'),
      NewsArticle_LikeDis_APIs(
        {url: 'article-like-dislike', Auth: user.token},
        formdata,
      )
        .then(res => {
          console.log('LikeDslike response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            DetailArticle(id);
          }
        })
        .catch(err => {
          console.log('err in LikeDslike', err);
        });
  };
  ////// dis like

  const DisLikeApi = async () => {
    const formdata = new FormData();
    formdata.append('article_id', id),
      formdata.append('is_like', '0'),
      NewsArticle_LikeDis_APIs(
        {url: 'article-like-dislike', Auth: user.token},
        formdata,
      )
        .then(res => {
          console.log('LikeDslike response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            DetailArticle(id);
          }
        })
        .catch(err => {
          console.log('err in LikeDslike', err);
        });
  };
  //////favorit

  const Whislist_API = async () => {
    setClrchage3rd(true);
    const formdata = new FormData();
    formdata.append('article_id', id),
      NewsArticle_AddFav_APIs(
        {url: 'add-fav-article', Auth: user.token},
        formdata,
      )
        .then(res => {
          console.log('add-fav response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            DetailArticle(id);
          }
        })
        .catch(err => {
          console.log('err in add-fav', err);
        });
  };

 
  const parentMethod = data => {
    setShowComment(!ShowComment);
    DetailArticle(id);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{paddingBottom:10,marginLeft:8,}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('RelatedItemArticl',{id:item.id})}
          style={Stylesheet.Rodnae_view9}>
             <View style={Stylesheet.prodctsBG}>
            <Image
              style={{width: wp(24), height: hp(10), borderRadius: 3}}
              source={{uri: item.image}}
              resizeMode="contain"
            />
          </View>

          <Text style={[Stylesheet.producttxt,{marginLeft:5}]}>{item.title.length > 15
                ? item.title.substring(0, 20) + '...'
                : item.title}</Text>
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
      {indicatorCursor && <Indicator />}
      {ShowComment && <CommentForArticle Data={id} close={parentMethod} />}


      <ScrollView>
        <View>
          <View>
            <View style={Stylesheet.Rodnae_view1}></View>
          

            <View>
            <View>
                <ImageBackground
                  style={Stylesheet.Rodnae_image1}
                  source={{uri: DetailData?.image}}
                  resizeMode="contain">
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <AntDesign
                        name="arrowleft"
                        size={22}
                        style={[Stylesheet.arrowleft, {color: '#D9DADC'}]}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => Whislist_API()}
                      style={Stylesheet.hearto}>
                      <AntDesign
                        name={DetailData?.is_fav ? 'heart' : 'hearto'}
                        size={22}
                        color={DetailData?.is_fav ? 'red' : '#5FB9E8'}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{alignItems: 'center', marginTop: 60}}>
                    <Text
                      style={[
                        Stylesheet.detailAuttxt,
                        {marginHorizontal: 30, textAlign: 'center',color:'#FFFFFF'},
                      ]}>
                      {DetailData.title}
                    </Text>
                    <Text
                      style={[
                        Stylesheet.detailAuttxt,
                        {fontFamily: family.medium,color:'#FFFFFF',fontSize:14},
                      ]}>
                      {moment(DetailData.published_at).format('YYYY MMM DD')}
                    </Text>
                  </View>
                </ImageBackground>
              </View>


              <View style={{marginHorizontal: wp(4), marginTop: wp(5)}}>
                <ReadMore
                  numberOfLines={10}
                  style={Stylesheet.Rodnae_txt8}
                  seeMoreStyle={{color: '#A2A2A2',fontSize:10,fontFamily:family.medium}}
                  seeLessStyle={{color: 'transparent'}}>
                  {DetailData?.content_data}
                </ReadMore>
              </View>

              <View style={{marginTop: 10}}>
                {/* <BannerAd
                  unitId={adUnitId}
                  size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                  }}
                /> */}
              </View>

            {recomand_Data?  <View style={{marginTop: wp(5)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={Stylesheet.Rodnae_txt9}>Popular Articles</Text>
                  <TouchableOpacity
                    >
                    <Text style={Stylesheet.Rodnae_txt11}></Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={recomand_Data}
                    renderItem={renderItem}
                    ListEmptyComponent={
                      <Text style={[Stylesheet.emptytxt, {margin: 120}]}>
                        No data available
                      </Text>
                    }
                  />
                </View>
              </View>:null}

            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsForArticle;
// Smarties, Nesquik, Stouffer's, Vittel, and Maggi. Nestlé has
//                   447 factories, operates in 189 countries, and employs around
//                   339,00