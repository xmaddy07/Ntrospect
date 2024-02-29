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
import {BothArticlesList, Sub_Category_APi} from '../../components/ApiScreen';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Loader from '../../components/loader';
import Indicator from '../../components/Indicator';
import {UIActivityIndicator} from 'react-native-indicators';
import {SearchAPI} from '../../components/ApiScreen';
import SeatchBar from '../../components/seatchBar';

export default function ArticlesList({navigation, loader,route}) {


  const user = useSelector(state => state.user.user);

  const [searchResults, setSearchResults] = useState('');
  const [modal, setModal] = useState(false);
  const [clrchange, setclrchange] = useState('');
  const [LoadingCursor, setLoadingCursor] = useState(false);
  const [indicatorCursor, setIndicatorCursor] = useState(false);
    const [subDetail, setSubDetail] = useState([]);


  const [Artileslist, setArtileslist] = useState([]);
  const [category, setCategory] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [backEnd, setBackEnd] = useState(0);

  const handleEndReached = () => {
    if (!isLoading && pagination < backEnd) {
      setPagination(pagination => pagination + 1);
      Article_hitApi();
    }
  };
  const renderFooter = () => {
    return isLoading ? <UIActivityIndicator size={25} color="#5FB9E8" /> : null;
  };



  

  useEffect(() => {
    Article_hitApi();
  }, []);
  const Article_hitApi = async () => {
    setIsLoading(true);
    BothArticlesList({url: `article-list?page=${pagination}`, Auth: user.token})
      .then(res => {
        setArtileslist(res.article);
        setCategory(res.categories);
        setBackEnd(res.meta.last_page);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err in article-list', err);
        setIsLoading(false);
      });
  };



  
  //////Sub_Category_APi
;

  const SubCategory_data = async id => {
    setIndicatorCursor(true);
    Sub_Category_APi({
      url: 'article-subcategory-list',
      Auth: user.token,
      id: id,
    })
      .then(res => {
        setSubDetail(res.article);
        setIndicatorCursor(false);

      })
      .catch(err => {
        console.log('err in article-list', err);
        setIndicatorCursor(false);
      });
  };
/////search api

  const onSearch = (txt) => {
    if (txt == '') {
      Article_hitApi();
    } else {
      SearchAPI({url: `article-list-search/${txt}`, Auth: user.token})
        .then(res => {
          setArtileslist(res.article);
          setSubDetail(res.article);
          console.log('res', res.article);
          setSearchResults(txt)
        })
        .catch(err => {
          console.log('err in product-list', err);
        });
    }
  };

  const Articlelistitemss = ({item, index}) => {
    return (
      <View style={{paddingBottom: 5,margin:2}}>
        <TouchableOpacity
          onPress={() =>navigation.navigate('DetailsForArticle', {id: item.id})}
          activeOpacity={0.8}
          style={Stylesheet.NewsListview}>
          <View style={{marginLeft:10}}>
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
            <Text style={[Stylesheet.ArticleCart_txt4, {marginLeft: 5}]}>
              {moment(item?.published_at).format('D/M/YYYY')}
            </Text>
          </View>
          <View style={Stylesheet.listimgBG}>
            <Image
              style={{width: wp(28), height: hp(11), borderRadius: 3}}
              source={{uri: item?.image}}
              resizeMode="cover"
            />
          </View>
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
      {indicatorCursor && <Indicator />}
      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>

        <Text style={Stylesheet.home_txt1}>
          {clrchange ? clrchange : 'Articles'}
        </Text>
        <Text>{'   '}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop: wp(3),
          marginHorizontal: 6,
        }}>
    
<SeatchBar filter={parentModal} serchtext={(txt)=>onSearch(txt)}/>

      </View>
      <View style={{flex: 1,marginTop:5}}>
        <FlatList
          data={clrchange ? subDetail : Artileslist}
          numColumns={3}
          renderItem={Articlelistitemss}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={!searchResults?handleEndReached:null}
          ListFooterComponent={renderFooter}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('AddArticles')}
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            bottom: wp(5),
            right: wp(5),
          }}>
          <Image
            style={{width: wp(10), height: wp(10)}}
            source={images.add}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {/* ///////////// Modal */}
        <Modal transparent={true} animationType={'none'} visible={modal}>
          <View style={Stylesheet.modalBackgroundM}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-start',
                top: wp(3),
                left: wp(2),
                backgroundColor: 'transparent',
                width: 40,
                height: 40,
              }}
              onPress={() => setModal(false)}></TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={Stylesheet.chartIconM}></TouchableOpacity>

            {/* <View style={Stylesheet.activityIndicatorWrapperM}>
              {category.map(item => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setclrchange(item.name),
                        SubCategory_data(item.id),
                        setModal(false);
                    }}
                    style={[
                      Stylesheet.ViewM,
                      {
                        backgroundColor:
                          clrchange === item.name ? '#5FB9E8' : null,
                      },
                    ]}>
                    <Text style={Stylesheet.txt1M}>{item.description}</Text>
                  </TouchableOpacity>
                  <View style={Stylesheet.lineM}></View>
                </>
              ))}
            </View> */}
          </View>
        </Modal>
    </View>
  );
}
