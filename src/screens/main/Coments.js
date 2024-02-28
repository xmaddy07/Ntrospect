import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stylesheet from '../../constant/Stylesheet';
import {commentAPI, viewCommentAPI} from '../../components/ApiScreen';
import {useSelector} from 'react-redux';
import {family} from '../../constant/Index';
import Indicator from '../../components/Indicator';

const Coments = ({navigation, route}) => {
  const {Data} = route.params;
  const user = useSelector(state => state.user.user);
  const [LoadingCursor, setLoadingCursor] = useState(false);
  const [clrchage, setClrchage] = useState(false);
  const [clrchage2ns, setClrchage2nd] = useState(false);
  const [clrchage3rd, setClrchage3rd] = useState(false);

  const flatListRef = useRef(null);

  const [viewcomment, setViewcomment] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      View_Comment();
    });
    return unsubscribe;
  }, [navigation]);

  const View_Comment = async () => {
    setLoadingCursor(true);
    viewCommentAPI({
      url: `view-product-comments/${Data}`,
      Auth: user.token,
    })
      .then(res => {
        setViewcomment(res.comments);
        setLoadingCursor(false);
      })
      .catch(err => {
        console.log('err in article-list', err);
        setLoadingCursor(false);
      });
  };

  const [comment, setcomment] = useState('');

  const commentAPIData = async => {
    const formdata = new FormData();
    formdata.append('product_id', Data),
      formdata.append('comment', comment),
      commentAPI({url: 'create-comment', Auth: user.token}, formdata)
        .then(res => {
          console.log('comment response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            View_Comment();
            setTimeout(() => {
              flatListRef.current.scrollToEnd({animated: true});
            }, 100);
          }
        })
        .catch(err => {
          console.log('comment in barcode', err);
        });
  };

  return (
    <View style={Stylesheet.Container}>
      {LoadingCursor && <Indicator />}
      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>Comments</Text>
        <Text style={Stylesheet.userIcon}></Text>
      </View>

      <View style={{marginTop: wp(5), paddingBottom: wp(38)}}>
        <FlatList
          ref={flatListRef}
          key={3}
          data={viewcomment}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={{width: wp(90), alignSelf: 'center', margin: wp(4)}}>
                <View
                  style={{
                    width: wp(90),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 50, height: 50, borderRadius: 100}}
                    source={{uri: item.user.image}}
                  />
                  <Text
                    style={{
                      color: 'black',
                      left: wp(3),
                      fontSize: 14,
                      fontFamily: family.semibold,
                    }}>
                    {item.user.username}
                  </Text>
                </View>

                <View style={{marginTop: wp(3), paddingLeft: wp(2)}}>
                  <Text
                    style={{
                      color: '#939393',
                      fontSize: 12,
                      fontFamily: family.regular,
                    }}
                    numberOfLines={3}>
                    {item.comment}
                  </Text>
                </View>

                <View
                  style={{
                    borderWidth: 0.3,
                    marginTop: wp(4),
                    borderColor: '#B8B9BB',
                  }}></View>
                <View
                  style={{
                    width: wp(30),
                    top: wp(3),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: wp(15),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: family.regular,
                        right: wp(1),
                        color: clrchage ? '#5FB9E8' : '#000',
                      }}>
                      {item.like.length > 1 ? item.like.length > 1 : null}
                    </Text>
                    <AntDesign
                      name="like2"
                      size={20}
                      color={clrchage ? '#5FB9E8' : '#000'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: wp(15),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: family.regular,
                        right: wp(1),
                        color: clrchage2ns ? '#5FB9E8' : '#000',
                      }}>
                      {item.like.length > 1 ? item.like.length > 1 : null}
                    </Text>
                    <AntDesign
                      name="dislike2"
                      size={20}
                      color={clrchage2ns ? '#5FB9E8' : '#000'}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    borderWidth: 0.3,
                    marginTop: wp(7),
                    borderColor: '#B8B9BB',
                  }}></View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: wp(95),
          alignSelf: 'center',
          height: hp(8),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 5,
          backgroundColor: 'white',
          borderRadius: 50,
          bottom: wp(3),
        }}>
        <TextInput
          style={{
            width: wp(75),
            color: '#000',
            paddingLeft: wp(5),
            fontSize: 14,
            fontFamily: family.regular,
            top: 2,
          }}
          placeholderTextColor={'#5FB9E8'}
          placeholder="Write here...."
          value={comment}
          onChangeText={text => setcomment(text)}
        />
        <TouchableOpacity
          onPress={() => {
            commentAPIData(), setcomment('');
          }}>
          <Ionicons
            name="send"
            size={25}
            style={{color: '#5FB9E8', right: wp(3), top: 2}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Coments;
