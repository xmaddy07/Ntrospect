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
import {
  BothArticlesList,
  FilterAPI,
  SearchAPI,
} from '../../components/ApiScreen';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import ListModal from '../../components/ListModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/loader';
import Indicator from '../../components/Indicator';
import {UIActivityIndicator} from 'react-native-indicators';
import SeatchBar from '../../components/seatchBar';

export default function NewsList({navigation, loader}) {
  const user = useSelector(state => state.user.user);

  const [searchResults, setSearchResults] = useState('');
  const [modal, setModal] = useState(false);
  const [clrchange, setclrchange] = useState('');
  console.log('object', clrchange);
  const [LoadingCursor, setLoadingCursor] = useState(false);
  const [indicatorCursor, setIndicatorCursor] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [backEnd, setBackEnd] = useState(0);

  const category = ['Recommendations', 'New to old','Most popular'];
  const [filter, setFilter] = useState([]);

  const [Newslist, setNewslist] = useState([]);

  const handleEndReached = () => {
    if (!isLoading && pagination < backEnd) {
      setPagination(pagination => pagination + 1);
      news_hitApi();
    }
  };

  const renderFooter = () => {
    return isLoading ? <UIActivityIndicator size={25} color="#5FB9E8" /> : null;
  };

  //

  useEffect(() => {
    news_hitApi();
  }, []);
  const news_hitApi = async () => {
    setIsLoading(true);
    BothArticlesList({url: `news-list?page=${pagination}`, Auth: user.token})
      .then(res => {
        setNewslist(res.news);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err in news-list', err);
        setIsLoading(false);
      });
  };

  const Filter = async clrchange => {
    setIndicatorCursor(true);
    FilterAPI({
      url: 'news-list',
      Auth: user.token,
      name: clrchange,
    })
      .then(res => {
        if (res.status == 'error') {
        } else if (res.status == 'success') {
          setFilter(res.news);
          setIndicatorCursor(false);
        }
      })
      .catch(err => {
        console.log('err in Filter-list', err);
        setIndicatorCursor(false);
      });
  };

  const onSearch = txt => {
    if (txt == '') {
      news_hitApi();
    } else {
      SearchAPI({url: `news-list-search/${txt}`, Auth: user.token})
        .then(res => {
          setNewslist(res.news);
          setFilter(res.news);
          setSearchResults(txt);
        })
        .catch(err => {
          console.log('err in product-list', err);
        });
    }
  };

  const newslistitemss = ({item, index}) => {
    return (
      <View style={{paddingBottom: 5,margin:2}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailsForNews', {id: item.id})}
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
                : `${item?.description?.substring(0, 75)}...`}
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
          {'News'}
        </Text>
        <Text>{'    '}</Text>
      </View>
      <SeatchBar
        filter={parentModal}
        filtertrue={true}
        serchtext={txt => onSearch(txt)}
      />
      <View style={{flex: 1,marginTop:10}}>
        <FlatList
          data={clrchange ? filter : Newslist}
          renderItem={newslistitemss}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={!searchResults ? handleEndReached : null}
          ListFooterComponent={renderFooter}
        />
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

          <View style={Stylesheet.activityIndicatorWrapperM}>
            {category.map(item => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setclrchange(item), setModal(false);
                    Filter(
                      clrchange == 'New to old'
                        ? 'newest'
                        : clrchange == 'Most popular'
                        ? 'most_View'
                        :  clrchange == 'Most popular'
                        ? 'recommendation'
                        :null,
                    );
                  }}
                  style={[
                    Stylesheet.ViewM,
                    {
                      backgroundColor: clrchange === item ? '#5FB9E8' : null,
                    },
                  ]}>
                  <Text style={Stylesheet.txt1M}>{item}</Text>
                </TouchableOpacity>
                <View style={Stylesheet.lineM}></View>
              </>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}
