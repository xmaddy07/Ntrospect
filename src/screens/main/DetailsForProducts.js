import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Button,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {family, images} from '../../constant/Index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PieChart from 'react-native-pie-chart';
import {
  LikeDislikeApi,
  WhishAPI,
  barcodeApi,
  Detail_API,
} from '../../components/ApiScreen';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader';
import CommentModal from '../../components/CommentModal';
import moment from 'moment';
import JournalInput from '../../components/JournalInput';

const DetailsForProducts = ({navigation, route}) => {
  const {id} = route.params;
  const user = useSelector(state => state.user.user);


  const [clrchage, setClrchage] = useState(false);
  const [clrchage2ns, setClrchage2nd] = useState(false);
  const [clrchage3rd, setClrchage3rd] = useState(false);
  const [clrchage4th, setClrchage4th] = useState(false);
  const [indicator, setIndicator] = useState(false);

  const [ShowComment, setShowComment] = useState(false);
  const [Falsemodal, setFalsemodal] = useState(false);
  const [detail, setDetailss] = useState([]);
  const [recomand_Data, setRecomand_Data] = useState([]);
  useEffect(() => {
    setIndicator(true);
    Detail_data();
  }, []);

  const series = [detail?.unit, detail?.protein, detail?.fat, detail?.carbs];
  const sliceColor = ['#F18F8F', '#FFC114', '#6FDB77', '#7FC8F4'];
  const widthAndHeight = 120;

  const Detail_data = async => {
    Detail_API({url: 'product-detail', Auth: user.token, id: id})
      .then(res => {
        setDetailss(res.product);
        setRecomand_Data(res.recommendation);
        setIndicator(false);
      })
      .catch(err => {
        console.log('err in article-list', err);
        setIndicator(false);
      });
  };

  /////Like_API
  const LikeApi = async () => {
    setClrchage(true);
    const formdata = new FormData();
    formdata.append('product_id', id),
      formdata.append('is_like', '1'),
      LikeDislikeApi({url: 'like-dislike', Auth: user.token}, formdata)
        .then(res => {
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            Detail_data(id);
          }
        })
        .catch(err => {
          console.log('err in LikeDslike', err);
        });
  };

  ////Dislike_API
  const DisLikeApi = async () => {
    const formdata = new FormData();
    formdata.append('product_id', id),
      formdata.append('is_like', '0'),
      LikeDislikeApi({url: 'like-dislike', Auth: user.token}, formdata)
        .then(res => {
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            Detail_data(id);
          }
        })
        .catch(err => {
          console.log('err in LikeDslike', err);
        });
  };

  /////Whislist_API
  const Whislist_API = async () => {
    setClrchage3rd(true);
    const formdata = new FormData();
    formdata.append('product_id', id),
      WhishAPI({url: 'add-fav-product', Auth: user.token}, formdata)
        .then(res => {
          if (res.status == 'error') {
          } else if (res.status === 'success') {
          }
        })
        .catch(err => {
          console.log('err in add-fav', err);
        });
  };
  // console.log('object',detail?.comment_count)

  const [popupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const NewsProducts = ({item, index}) => {
    // console.log('item+++',item)
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailsForNews', {id: item.id})}
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
              ? item.title.substring(0, 18) + '...'
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

  const parentMethod = data => {
    setShowComment(!ShowComment);
  };
  return (
    <>
      {indicator && <Loader />}
      {ShowComment && <CommentModal Data={id} close={parentMethod} />}
      {popupVisible && (
        <JournalInput
          visible={popupVisible}
          onClose={closePopup}
          foodDetails={{
            foodName:detail.title,
            totalCalories: detail.calories,
            servingSize:detail.serving_size,
            weight:detail.weight,
          }}
          navigation={navigation}
        />
      )}
      <View style={Stylesheet.Container}>
        <View style={Stylesheet.Headerstyle}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Index')}>
            <AntDesign
              name="arrowleft"
              size={22}
              style={Stylesheet.arrowleft}
            />
          </TouchableOpacity>
          <Text style={Stylesheet.home_txt1}>{detail.title}</Text>
          <Text style={Stylesheet.userIcon}>{'   '}</Text>
        </View>

        <ScrollView>
          <View style={{paddingBottom: wp(5)}}>
            <View>
              <ImageBackground
                style={[Stylesheet.Rodnae_image1, {}]}
                source={{uri: detail.images}}
                resizeMode="contain">
                <TouchableOpacity
                  onPress={() => Whislist_API()}
                  style={[
                    Stylesheet.hearto,
                    {alignSelf: 'flex-end', margin: 20},
                  ]}>
                  <AntDesign
                    name={detail.is_fav || clrchage3rd ? 'heart' : 'hearto'}
                    size={22}
                    color={detail.is_fav || clrchage3rd ? 'red' : '#5FB9E8'}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style={Stylesheet.underLines1}></View>

            <View
              style={{
                flexDirection: 'row',
                width: 85,
                justifyContent: 'space-evenly',
                top: 3,
                alignSelf: 'flex-end',
                marginRight: 5,
              }}>
              <View style={[Stylesheet.Rodnae_view7, {}]}>
                <TouchableOpacity
                  onPress={() => {
                    setShowComment(true);
                  }}>
                  <FontAwesome5
                    name="comment-dots"
                    size={19}
                    color={
                      detail?.comment_count?.length < 1 ? '#000' : '#6D6D6D'
                    }
                  />
                  {detail?.comment_count ? (
                    <View style={Stylesheet.cmntcircle}>
                      <Text style={[Stylesheet.Rodnae_txt7, {color: '#000'}]}>
                        {detail.comment_count}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              </View>

              <View style={Stylesheet.Rodnae_view4}>
                <TouchableOpacity
                  onPress={() => {
                    {
                      LikeApi();
                    }
                  }}>
                  <Image
                    tintColor={
                      detail.is_like === false || detail.is_like === null
                        ? '#6D6D6D'
                        : '#000'
                    }
                    style={{
                      width: 15,
                      height: 15,
                    }}
                    source={
                      detail.is_like === false || detail.is_like === null
                        ? images.like2
                        : images.like1
                    }
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <Text
                  style={[
                    Stylesheet.Rodnae_txt5,
                    {
                      color:
                        detail.is_like == false || detail.is_like == null
                          ? '#000'
                          : '#000',
                    },
                  ]}>
                  {detail.like_count > 0 ? detail.like_count : null}
                </Text>
              </View>
              <View style={Stylesheet.Rodnae_view6}>
                <TouchableOpacity
                  onPress={() => {
                    DisLikeApi();
                  }}>
                  <Image
                    tintColor={
                      detail.is_like == true || detail.is_like == null
                        ? '#6D6D6D'
                        : '#000'
                    }
                    style={{
                      width: 15,
                      height: 15,
                    }}
                    source={
                      detail.is_like === true || detail.is_like == null
                        ? images.like4
                        : images.like3
                    }
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    Stylesheet.Rodnae_txt6,
                    {
                      color:
                        detail.is_like == false || detail.is_like == null
                          ? '#000'
                          : '#000',
                    },
                  ]}>
                  {detail.dislike_count > 0 ? detail.dislike_count : null}
                </Text>
              </View>
            </View>

            <View style={Stylesheet.underLines1}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: wp(5),
                marginHorizontal: 40,
              }}>
              {detail?.export?.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Exports', {Data: item, id: id,icons:true,product:true})
                    }>
                    <Image
                      style={Stylesheet.hala}
                      source={{uri: item.image}}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            {detail?.ingredients?.length ? (
              <View>
                <Text style={Stylesheet.Lugala_txt1}>{'Ingredients'}</Text>
                <View style={Stylesheet.flexView}>
                  {detail.ingredient_list.map(element => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Exports', {
                          Data: element,
                          id: id,
                        })
                      }
                      style={Stylesheet.Lugala_Ingredients}>
                      <Text style={Stylesheet.Lugala_txt2}>
                        {element.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null}

            <View style={Stylesheet.piecontainer}>
              <View>
                {detail?.protein ||
                detail?.fat ||
                detail?.carbs ||
                detail?.energy ? (
                  <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.88}
                    coverFill={'#F0F0F0'}
                  />
                ) : null}
                <Text style={Stylesheet.pieTxt}>
                  {Math.round(parseInt(detail.calories)).toLocaleString()}
                </Text>
              </View>
              <View>
                <View style={Stylesheet.direction}>
                  <View
                    style={[
                      Stylesheet.clrbox,
                      {backgroundColor: '#F84F66'},
                    ]}></View>
                  <Text style={[Stylesheet.Lugala_txt8, {color: '#F84F66'}]}>
                    Units
                  </Text>
                  <Text style={[Stylesheet.Lugala_txt8, {color: '#F84F66'}]}>
                    {detail?.unit}
                  </Text>
                </View>
                <View style={Stylesheet.direction}>
                  <View
                    style={[
                      Stylesheet.clrbox,
                      {backgroundColor: '#F18F8F'},
                    ]}></View>
                  <Text style={Stylesheet.Lugala_txt5}>Protein</Text>
                  <Text style={Stylesheet.Lugala_txt5}>
                    {parseInt(detail.protein).toFixed(0)}
                  </Text>
                </View>

                <View style={Stylesheet.direction}>
                  <View
                    style={[
                      Stylesheet.clrbox,
                      {backgroundColor: '#D78FF1'},
                    ]}></View>
                  <Text style={Stylesheet.Lugala_txt6}>Fat</Text>
                  <Text style={Stylesheet.Lugala_txt6}>
                    {parseInt(detail.fat).toFixed(0)}
                  </Text>
                </View>

                <View style={Stylesheet.direction}>
                  <View
                    style={[
                      Stylesheet.clrbox,
                      {backgroundColor: '#6FDB77'},
                    ]}></View>
                  <Text style={Stylesheet.Lugala_txt7}>Carbs</Text>
                  <Text style={Stylesheet.Lugala_txt7}>
                    {parseInt(detail.carbs).toFixed(0)}
                  </Text>
                </View>
                <View style={Stylesheet.direction}>
                  <View
                    style={[
                      Stylesheet.clrbox,
                      {backgroundColor: '#7FC8F4'},
                    ]}></View>
                  <Text style={Stylesheet.Lugala_txt8}>Calories</Text>
                  <Text style={Stylesheet.Lugala_txt8}>
                    {parseInt(detail.calories).toFixed(0)}
                  </Text>
                </View>
              </View>
            </View>

            {detail.weight ? (
              <View style={Stylesheet.flexView2}>
                <Text style={Stylesheet.Lugala_txt3}>Density</Text>
                <Text style={Stylesheet.Lugala_txt4}>{detail.weight+'g'}</Text>
              </View>
            ) : null}
              {detail.serving_size ? (
              <View style={[Stylesheet.flexView2,{marginTop:5}]}>
                <Text style={Stylesheet.Lugala_txt3}>serving size</Text>
                <Text style={Stylesheet.Lugala_txt4}>{detail.serving_size}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              // onPress={() => navigation.navigate('Index',{screen:'Food_Journal'})}
              onPress={openPopup}
              style={[
                Stylesheet.button,
                {marginTop: wp(12), alignSelf: 'center'},
              ]}>
              <Text style={Stylesheet.button_txt}>Add to my Journal</Text>
            </TouchableOpacity>

            <View style={[Stylesheet.flexView2, {marginTop: wp(10)}]}>
              <View>
                <Text style={Stylesheet.Lugala_txt3}>Brand</Text>
                <Text style={Stylesheet.Lugala_txt3}>Company</Text>
                {/* <View style={Stylesheet.line}></View> */}
                <Text style={[Stylesheet.Lugala_txt3, {}]}>Manufacture</Text>
              </View>

              <View>
                <TouchableOpacity
                style={{alignSelf:'flex-end'}}
                  onPress={() =>
                    navigation.navigate('Brand', {name:detail.brand.name,id:detail.brand.id})
                  }>
                  <Text
                    style={[
                      Stylesheet.Lugala_txt4,
                      {textDecorationLine: 'underline'},
                    ]}>
                    {/* {detail?.product?.company} */}
                    {detail.brand_name}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={{alignSelf:'flex-end'}}
                  onPress={() => navigation.navigate('Company', {companyData:detail.company})}>
                  <Text
                    style={[
                      Stylesheet.Lugala_txt4,
                      {textDecorationLine: 'underline',},
                    ]}>
                    {/* {detail?.product?.company} */}
                    {detail.company_name}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={{alignSelf:'flex-end'}}
                  onPress={() =>
                    navigation.navigate('Manufacture', {
                      id: id,
                      related: recomand_Data,
                    })
                  }>
                  <Text
                    style={[
                      Stylesheet.Lugala_txt4,
                      {textDecorationLine: 'underline'},
                    ]}>
                    {/* {detail?.product?.company} */}
                    {detail.manufacture_name}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: wp(10)}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={Stylesheet.Rodnae_txt9}>Suggested Products</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Recommended_Products')}>
                  <Text style={Stylesheet.Rodnae_txt11}>{'  '}</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, marginTop: 3}}>
                <FlatList
                  keyExtractor={item => item.id.toString()}
                  horizontal={true}
                  data={recomand_Data}
                  renderItem={NewsProducts}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default DetailsForProducts;
