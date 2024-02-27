import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
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
import CommentModal from '../../components/CommentModal';

const RelatedItemPrduct = ({navigation, route}) => {
  const {id} = route.params;
  console.log('id.........', id);

  const user = useSelector(state => state.user.user);
  const [ShowComment, setShowComment] = useState(false);
  const [indicatorCursor, setIndicatorCursor] = useState(false);
  const [All_Data, setAll_Data] = useState([]);
  // console.log('object+++++++++++++', All_Data);
  const [recomand_Data, setRecomand_Data] = useState([]);

  useEffect(() => {
    setIndicatorCursor(true);
    DetailProduct(id);
  }, []);

  const DetailProduct = async id => {
    NewsArticle_Detail_APIs({
      url: 'product-detail',
      Auth: user.token,
      id: id,
    })
      .then(res => {
        if (res.status == 'error') {
        } else if (res.status == 'success') {
          setAll_Data(res.product);
  console.log('object+++++++++++++', res);

          // setRecomand_Data(res.recommendation);
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
    formdata.append('product_id', id),
      formdata.append('is_like', '1'),
      NewsArticle_LikeDis_APIs(
        {url: 'like-dislike', Auth: user.token},
        formdata,
      )
        .then(res => {
          console.log('LikeDslike response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            DetailProduct(id);
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
      NewsArticle_LikeDis_APIs({url: 'product_id', Auth: user.token}, formdata)
        .then(res => {
          console.log('LikeDslike response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            DetailProduct(id);
          }
        })
        .catch(err => {
          console.log('err in LikeDslike', err);
        });
  };
  //////favorit

  const Whislist_API = async () => {
    const formdata = new FormData();
    formdata.append('product_id', id),
      NewsArticle_AddFav_APIs(
        {url: 'add-fav-product', Auth: user.token},
        formdata,
      )
        .then(res => {
          console.log('add-fav response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            DetailProduct(id);
          }
        })
        .catch(err => {
          console.log('err in add-fav', err);
        });
  };

  const parentMethod = data => {
    setShowComment(!ShowComment);
    DetailProduct(id);
  };

 

  return (

    <View style={Stylesheet.Container}>
      {indicatorCursor && <Indicator />}
      {ShowComment && <CommentModal Data={id} close={parentMethod} />}

      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>
          {All_Data?.title?.length > 15
            ? All_Data?.title?.substring(0, 15) + '...'
            : All_Data.title}
        </Text>
        <Text >{'    '}</Text>
      </View>

      <ScrollView>
        <View>
          <View>
            <View style={Stylesheet.Rodnae_view1}></View>
            <View style={Stylesheet.Rodnae_view2}>
              <Text style={Stylesheet.Rodnae_txt3}>Date:</Text>
              <Text style={[Stylesheet.Rodnae_txt4, {top: 2}]}>
                {moment(All_Data.created_at).format('M-D-YYYY')}
              </Text>
            </View>

            <View>
              <View>
                <Image
                  style={Stylesheet.Rodnae_image1}
                  source={{uri: All_Data?.images}}
                  // source={require('../../assets/poster1.jpg')}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={() => Whislist_API()}
                  style={Stylesheet.hearto}>
                  <AntDesign
                    name={All_Data?.is_fav ? 'heart' : 'hearto'}
                    size={22}
                    color={All_Data?.is_fav ? '#5FB9E8' : '#000'}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View style={Stylesheet.Rodnae_view5}>
                  <View style={Stylesheet.Rodnae_view4}>
                    <Text
                      style={[
                        Stylesheet.Rodnae_txt5,
                        {
                          color:
                            All_Data?.is_like == false ||
                            All_Data?.is_like == null
                              ? '#000'
                              : '#000',
                        },
                      ]}>
                      {All_Data?.like_count > 0 ? All_Data?.like_count : null}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        {
                          LikeApi();
                        }
                      }}>
                      <AntDesign
                        name={
                          All_Data?.is_like == false ||
                          All_Data?.is_like == null
                            ? 'like2'
                            : 'like1'
                        }
                        size={20}
                        style={{
                          color:
                            All_Data?.is_like == false ||
                            All_Data?.is_like == null
                              ? '#000'
                              : '#000',
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={Stylesheet.Rodnae_view6}>
                    <Text
                      style={[
                        Stylesheet.Rodnae_txt6,
                        {
                          color:
                            All_Data?.is_like == false ||
                            All_Data?.is_like == null
                              ? '#000'
                              : '#000',
                        },
                      ]}>
                      {All_Data?.dislike_count > 0
                        ? All_Data?.dislike_count
                        : null}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        DisLikeApi();
                      }}>
                      <AntDesign
                        name={
                          All_Data?.is_like == true || All_Data?.is_like == null
                            ? 'dislike2'
                            : 'dislike1'
                        }
                        size={20}
                        style={{
                          color:
                            All_Data?.is_like == true ||
                            All_Data?.is_like == null
                              ? '#000'
                              : '#000',
                          top: 4,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={Stylesheet.Rodnae_view7}>
                  <Text style={[Stylesheet.Rodnae_txt7, {color: '#000'}]}>
                    {All_Data?.comment_count}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowComment(true);
                    }}>
                    <FontAwesome5
                      name="comment-dots"
                      size={20}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginHorizontal: wp(4), marginTop: wp(5)}}>
                <ReadMore
                  numberOfLines={4}
                  style={Stylesheet.Rodnae_txt8}
                  seeMoreStyle={{color: '#5FB9E8'}}
                  seeLessStyle={{color: '#5FB9E8'}}>
                  {All_Data?.description}
                </ReadMore>
              </View>

            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RelatedItemPrduct;

