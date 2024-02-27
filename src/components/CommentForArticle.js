import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stylesheet from '../constant/Stylesheet';
import {
  NewsArticle_Cmnt_APIs,
  NewsArticle_viewCmnt_APIs,
  NewsArticle_cmntLiDis_APIs,
} from './ApiScreen';
import {useSelector} from 'react-redux';
import {family} from '../constant/Index';
import Indicator from './Indicator';

const CommentForArticle = ({loader,  Data, close}) => {
  const user = useSelector(state => state.user.user);
  const [LoadingCursor, setLoadingCursor] = useState(false);
  const [clrchage, setClrchage] = useState(false);
  const [clrchage2ns, setClrchage2nd] = useState(false);
  const [clrchage3rd, setClrchage3rd] = useState(false);

  const flatListRef = useRef(null);

  const [viewcomment, setViewcomment] = useState([]);
  // console.log('viewcomment=========cdcds=====', viewcomment);

  useEffect(() => {
    View_Comment();
    setLoadingCursor(true);
  }, []);

  const View_Comment = async () => {
    NewsArticle_viewCmnt_APIs({
      url: `view-article-comments/${Data}`,
      Auth: user.token,
    })
      .then(res => {
        setViewcomment(res.comments.reverse());
        setLoadingCursor(false);
      })
      .catch(err => {
        console.log('err in view-article', err);
        setLoadingCursor(false);
      });
  };

  const [comment, setcomment] = useState('');

  const commentAPIData = async => {
    const formdata = new FormData();
    formdata.append('article_id', Data),
      formdata.append('comment', comment),
      NewsArticle_Cmnt_APIs(
        {url: 'article-create-comment', Auth: user.token},
        formdata,
      )
        .then(res => {
          console.log('comment response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            View_Comment();
            // setTimeout(() => {
            //   flatListRef.current.scrollToEnd({animated: true});
            // }, 100);
          }
        })
        .catch(err => {
          console.log('comment in barcode', err);
        });
  };

  const [comntstatus, setcomntstatus] = useState('');
  // console.log('comntstatus',comntstatus)

  const DisLikeApi = async txt => {
    const formdata = new FormData();
    formdata.append('article_id', Data),
      formdata.append('article_comment_id', txt),
      formdata.append('is_like', '0'),
      NewsArticle_cmntLiDis_APIs(
        {url: 'like-dislike-article-comment', Auth: user.token},
        formdata,
      )
        .then(res => {
          setcomntstatus(res);
          console.log('Dslike response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            View_Comment();
          }
        })
        .catch(err => {
          console.log('err in Dslike', err);
        });
  };

  const [comntstatus2, setcomntstatus2] = useState('');
  // console.log('comntstatus',comntstatus2)

  const LikeApi = async txt => {
    const formdata = new FormData();
    formdata.append('article_id', Data),
      formdata.append('article_comment_id', txt),
      formdata.append('is_like', '1'),
      NewsArticle_cmntLiDis_APIs(
        {url: 'like-dislike-article-comment', Auth: user.token},
        formdata,
      )
        .then(res => {
          setcomntstatus2(res);
          console.log('Like response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            View_Comment();
          }
        })
        .catch(err => {
          console.log('err in Like', err);
        });
  };

  return (
    <>
      <Modal transparent={true} animationType={'none'} visible={loader}>
        <View style={Stylesheet.modalBackground}>
          <View style={Stylesheet.Container}>
            <View
              style={[
                Stylesheet.Headerstyle,
                {justifyContent: 'space-between'},
              ]}>
              <TouchableOpacity onPress={() => close()}>
                <AntDesign
                  name="arrowleft"
                  size={22}
                  style={Stylesheet.arrowleft}
                />
              </TouchableOpacity>
              <Text style={Stylesheet.home_txt1}>Comments</Text>
              <Text style={Stylesheet.userIcon}></Text>
            </View>

            <View style={{marginTop: wp(5), paddingBottom: wp(38)}}>
              <FlatList
                // ref={flatListRef}
                // key={3}
                // showsHorizontalScrollIndicator={false}
                data={viewcomment}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        width: wp(90),
                        alignSelf: 'center',
                        margin: wp(4),
                      }}>
                      <View
                        style={{
                          width: wp(90),
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={{width: 50, height: 50, borderRadius: 100}}
                          source={item.user?.image?{uri:item.user.image}:require('../assets/avatar.png')}
                          resizeMode='contain'
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
                          width: wp(21),
                          top: wp(3),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // backgroundColor:'red'
                        }}>
                        <TouchableOpacity
                          onPress={() => LikeApi(item.id)}
                          style={{
                            width: wp(11),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: family.regular,
                              right: wp(1),
                              color: '#000',
                              top: 4,
                            }}>
                            {item.like_count > 0 ? item.like_count : null}
                          </Text>
                          <AntDesign
                            name={
                              item.is_like == false || item.is_like == null
                                ? 'like2'
                                : 'like1'
                            }
                            size={20}
                            color={'#000'}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => DisLikeApi(item.id)}
                          style={{
                            width: wp(13),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: family.regular,
                              right: wp(1),
                              color: '#000',
                            }}>
                            {item.dislike_count > 0 ? item.dislike_count : null}
                          </Text>
                          <AntDesign
                            name={
                              item.is_like == true || item.is_like == null
                                ? 'dislike2'
                                : 'dislike1'
                            }
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
                backgroundColor: 'white',
                borderRadius: 50,
                bottom: wp(3),
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
              }}>
              <TextInput
                style={{
                  width: wp(75),
                  color: '#000',
                  paddingLeft: wp(5),
                  fontSize: 14,
                  fontFamily: family.regular,
                  top: 1.5,
                }}
                placeholderTextColor={'#5FB9E8'}
                placeholder="Write here...."
                value={comment}
                onChangeText={text => setcomment(text)}
                multiline={true}
              />
              <TouchableOpacity
                onPress={() => {
                  commentAPIData(), setcomment('');
                }}>
                <Ionicons
                  name="send"
                  size={25}
                  style={{color: '#5FB9E8', right: wp(3), top: 1.5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {LoadingCursor && <Indicator />}
    </>
  );
};
export default CommentForArticle;
