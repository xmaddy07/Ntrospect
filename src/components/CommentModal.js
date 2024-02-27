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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Stylesheet from '../constant/Stylesheet';
import {
  commentAPI,
  viewCommentAPI,
  NewsArticle_cmntLiDis_APIs,
} from './ApiScreen';
import {useSelector} from 'react-redux';
import {family} from '../constant/Index';
import Indicator from './Indicator';

const CommentModal = ({loader, y, Data, close}) => {
  // console.log('comenyt data----',Data)
  const user = useSelector(state => state.user.user);
  const [LoadingCursor, setLoadingCursor] = useState(false);
  const [clrchage, setClrchage] = useState(false);
  const [clrchage2ns, setClrchage2nd] = useState(false);
  const [focus, setfocus] = useState(false);

  const flatListRef = useRef(null);

  const [viewcomment, setViewcomment] = useState();
  console.log('object', viewcomment);

  useEffect(() => {
    View_Comment();
    setLoadingCursor(true);
  }, []);

  const View_Comment = async () => {
    viewCommentAPI({
      url: `view-product-comments/${Data}`,
      Auth: user.token,
    })
      .then(res => {
        setViewcomment(res.comments.reverse());
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
          // console.log('comment response', res);
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
  const [comntstatus2, setcomntstatus2] = useState('');
  // console.log('comntstatus',comntstatus2)



  const [comntstatus, setcomntstatus] = useState('');


  return (
    <>
      <Modal transparent={true} animationType={'none'} visible={loader}>
        <View style={Stylesheet.modalBackground}>
          <View style={Stylesheet.Container}>
            <View
              style={{
                height: hp(8),
                width: wp(100),
                backgroundColor: '#FFFFFF',
                elevation: 1,
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => close()}>
                <AntDesign
                  name="arrowleft"
                  size={22}
                  style={[Stylesheet.arrowleft,{   left: 0,marginLeft:10}]}
                />
              </TouchableOpacity>
              <Text style={[Stylesheet.home_txt1,{marginLeft:10, fontSize: 16}]}>Comments</Text>
              <Text style={{marginLeft:5,color:'#000',fontSize: 12,  fontFamily: family.medium,}}>{`(${viewcomment?.length})`}</Text>
            </View>

            <View style={{marginTop: wp(5), paddingBottom: wp(38)}}>
              <FlatList
                // ref={flatListRef}
                // key={3}
                // keyExtractor={(item, index) => item.key}
                data={viewcomment}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  // console.log('=======================================', item);
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
                          // alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: '#E2E2E2',
                          }}
                          source={
                            item.user?.image
                              ? {uri: item.user.image}
                              : require('../assets/avatar.png')
                          }
                        />
                        <View style={{marginLeft:10}}>
                        <Text
                          style={{
                            color: 'black',
                            // left: wp(3),
                            fontSize: 14,
                            fontFamily: family.semibold,
                          }}>
                          {item.user.username}
                        </Text>
                        <View style={{}}>
                        <Text
                          style={{
                            color: '#262626',
                            fontSize: 12,
                            fontFamily: family.regular,
                            width:270
                          }}
                          numberOfLines={3}>
                          {item.comment}
                        </Text>
                      </View>
                      </View>
                      </View>

                

                      <View
                        style={{
                          borderWidth: 0.25,
                          marginTop: wp(4),
                          borderColor: '#E2E2E2',
                        }}></View>
                      {/* <View
                        style={{
                          width: wp(20),
                          top: wp(3),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
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
                      </View> */}

                      {/* <View
                        style={{
                          borderWidth: 0.3,
                          marginTop: wp(7),
                          borderColor: '#B8B9BB',
                        }}></View> */}
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
                height: hp(7),
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius:5,
                borderWidth:0.8,
                borderColor:'#6D6D6D',
                bottom: wp(3),
                elevation:1,
              }}>
              <TextInput
                style={{
                  width: wp(75),
                  color: '#000',
                  paddingLeft:focus?wp(5): wp(20),
                  fontSize: 14,
                  fontFamily: family.regular,
                  top: 1.5,
                }}
                placeholderTextColor={'#6D6D6D'}
                placeholder="Write your comment here...."
                value={comment}
                onChangeText={text => setcomment(text)}
                multiline={true}
                onFocus={()=>setfocus(!focus)}
              />
           {focus ?   <TouchableOpacity
                onPress={() => {
                  commentAPIData(), setcomment('');
                }}>
                <FontAwesome
                  name="send"
                  size={25}
                  style={{color: '#262626', right: wp(3), top: 1.5}}
                />
              </TouchableOpacity>:null}
            </View>
          </View>
        </View>
      </Modal>
      {LoadingCursor && <Indicator />}
    </>
  );
};
export default CommentModal;
