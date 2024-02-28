import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FavoriteModal from '../../components/FavoriteModal';
import {View_WhishAPI} from '../../components/ApiScreen';
import {useSelector} from 'react-redux';
import Loader from '../../components/loader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {NewsArticle_AddFav_APIs} from '../../components/ApiScreen';
import SeatchBar from '../../components/seatchBar';

const Favorites = ({navigation}) => {
  const user = useSelector(state => state.user.user);
  const [modal, setModal] = useState(false);
  const [clrchange, setclrchange] = useState('Product');
  const [articledata, setarticledata] = useState([]);
  const [LoadingCursor, setLoadingCursor] = useState(false);
  const [getlength, setGetlength] = useState('');
  const [newsdata, setnewsdata] = useState([]);
  const [whishList, setWhishList] = useState([]);

  useEffect(() => {
    View_WhishList();
  }, []);

  const View_WhishList = async () => {
    setLoadingCursor(true);
    View_WhishAPI({
      url: 'view-fav-product-list',
      Auth: user.token,
    })
      .then(res => {
        setWhishList(res.product_list);
        setGetlength(res.product_list.length);
        setLoadingCursor(false);
      })
      .catch(err => {
        console.log('err in article-list', err);
        setLoadingCursor(false);
      });
  };

  const newslist = async () => {
    setLoadingCursor(true);
    View_WhishAPI({
      url: 'view-fav-news-list ',
      Auth: user.token,
    })
      .then(res => {
        console.log('object', res.length);
        setnewsdata(res.news_list);
        setLoadingCursor(false);
      })
      .catch(err => {
        console.log('err in news-list', err);
        setLoadingCursor(false);
      });
  };

  console.log('clrchange', clrchange);

  const articlelist = async () => {
    setLoadingCursor(true);
    View_WhishAPI({
      url: 'view-fav-article-list',
      Auth: user.token,
    })
      .then(res => {
        setarticledata(res.article_list);
        setLoadingCursor(false);
      })
      .catch(err => {
        console.log('err in article-list', err);
        setLoadingCursor(false);
      });
  };



  //////for news
  const Whislist_News = async id => {
    const formdata = new FormData();
    formdata.append('news_id', id),
      NewsArticle_AddFav_APIs({url: 'add-fav-news', Auth: user.token}, formdata)
        .then(res => {
          console.log('add-fav response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            newslist();
          }
        })
        .catch(err => {
          console.log('err in add-fav', err);
        });
  };
  //////for article
  const Whislist_article = async id => {
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
            articlelist();
          }
        })
        .catch(err => {
          console.log('err in add-fav', err);
        });
  };

  //////for product
  const Whislist_product = async id => {
    const formdata = new FormData();
    formdata.append('product_id', id),
      NewsArticle_AddFav_APIs(
        {url: 'add-fav-product', Auth: user.token},
        formdata,
      )
        .then(res => {
          console.log('add-fav-product', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            View_WhishList();
          }
        })
        .catch(err => {
          console.log('err in add-fav', err);
        });
  };

  const Articlelistproduct = ({item, index}) => {
    return (
      <View style={{margin: 2}}>
        <TouchableOpacity
          onPress={() => {
            clrchange == 'Product'
              ? navigation.navigate('DetailsForProducts', {id: item.id})
              : clrchange == 'News'
              ? navigation.navigate('DetailsForNews', {id: item.id})
              : clrchange == 'Articles'
              ? navigation.navigate('DetailsForArticle', {id: item.id})
              : null;
          }}
          activeOpacity={0.8}
          style={Stylesheet.Articleproduct_View}>
          <View
            style={[
              Stylesheet.prodctsBG2,
              {
              },
            ]}>
            <ImageBackground
              style={Stylesheet.articleProducts_image}
              source={{uri: item?.images}}
              resizeMode="contain"
              borderRadius={3}>
              <TouchableOpacity
                onPress={() => {
                  clrchange == 'Product'
                    ? Whislist_product(item.id)
                    : clrchange == 'News'
                    ? Whislist_News(item.id)
                    : clrchange == 'Articles'
                    ? Whislist_article(item.id)
                    : null;
                }}
                style={Stylesheet.heartoFvt}>
                <AntDesign
                  name={item.is_fav ? 'heart' : 'hearto'}
                  size={20}
                  color={item.is_fav ? 'red' : '#5FB9E8'}
                />
              </TouchableOpacity>
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
            style={[Stylesheet.ArticleCart_txt5]}>
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
  const parentModal = () => {
    setModal(true);
  };

  return (
    <View style={Stylesheet.Container}>
      {LoadingCursor && <Loader />}
   
      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
          <AntDesign name="arrowleft" size={25} style={Stylesheet.closeIcon} />
        </TouchableOpacity>

        <Text style={Stylesheet.home_txt1}>{'My Favorites'}</Text>
        <Text style={Stylesheet.home_txt1}>{'  '}</Text>
      </View>

      <SeatchBar filter={parentModal} filtertrue={true} />

      <View style={{flex: 1}}>
        <FlatList
          numColumns={3}
          keyExtractor={(item, index) => item.key}
          data={
            clrchange == 'News'
              ? newsdata
              : clrchange == 'Articles'
              ? articledata
              : whishList
          }
          renderItem={Articlelistproduct}
          ListEmptyComponent={
            <Text style={Stylesheet.emptytxt}>No data available</Text>
          }
        />
      </View>

      {/* ///////////// Modal */}
      <Modal transparent={true} animationType={'none'} visible={modal}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginHorizontal: 5,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              width: 35,
              height: 35,
            }}
            onPress={() => setModal(false)}></TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModal(false)}
            style={{
              backgroundColor: 'transparent',
              width: 35,
              height: 35,
            }}></TouchableOpacity>
        </View>
        <View style={Stylesheet.modalBackgroundM}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              elevation: 2,
              height: 120,
              width: '38%',
              marginTop: 5,
              marginRight: wp(3),
              borderRadius: 5,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={[
                Stylesheet.ViewM,
                {backgroundColor: clrchange === 'Product' ? '#5FB9E8' : null},
              ]}
              onPress={async () => {
                setclrchange('Product');
                View_WhishList();
                setModal(false);
              }}>
              <Text style={Stylesheet.txt1M}>Product</Text>
            </TouchableOpacity>
            <View style={Stylesheet.lineM}></View>


            <TouchableOpacity
              style={[
                Stylesheet.ViewM,
                {backgroundColor: clrchange === 'News' ? '#5FB9E8' : null},
              ]}
              onPress={() => {
                setclrchange('News');
                newslist();
                setModal(false);
              }}>
              <Text style={Stylesheet.txt1M}>News</Text>
            </TouchableOpacity>
            <View style={Stylesheet.lineM}></View>
            <TouchableOpacity
              style={[
                Stylesheet.ViewM,
                {backgroundColor: clrchange === 'Articles' ? '#5FB9E8' : null},
              ]}
              onPress={() => {
                setclrchange('Articles');
                articlelist();
                setModal(false);
              }}>
              <Text style={Stylesheet.txt1M}>Articles</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Favorites;
