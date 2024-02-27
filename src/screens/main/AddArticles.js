import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
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
import {family, images} from '../../constant/Index';
import Button from '../../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  AddArticlesAPI,
  Category_APi,
  Sub_Category_APi,
} from '../../components/ApiScreen';
import {useSelector} from 'react-redux';
import Loader from '../../components/loader';
import Indicator from '../../components/Indicator';
import moment from 'moment';

const AddArticles = ({navigation}) => {
  const user = useSelector(state => state.user.user);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState('');
  const [category, setCategory] = useState([]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState('');
  console.log('value2', value2);

  const [subcategory, setSubcategory] = useState('');
  // console.log('subcategory]]]]]]]]]]]]', subcategory);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [LoadingCursor, setLoadingCursor] = useState(false);
  const [LoadingCursor2, setLoadingCursor2] = useState(false);

  const picker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  useEffect(() => {
    Article_hitApi();
  }, []);

  const Article_hitApi = async () => {
    setLoadingCursor(true);
    Category_APi({url: 'article-category-list', Auth: user.token})
      .then(res => {
        setCategory(res.article);
        setLoadingCursor(false);
      })
      .catch(err => {
        console.log('err in article-list', err);
        setLoadingCursor(false);
      });
  };

  const [subDetail, setSubDetail] = useState([]);

  console.log('subDetail]]]]]]]]]]]]', subDetail);



  const Add = async () => {
    setLoadingCursor(true);
    const formdata = new FormData();
    formdata.append('image', {
      uri: image,
      type: 'image/jpg',
      name: `image${new Date()}.jpg`,
    }),
    
      formdata.append('image', image),
      formdata.append('published_at',moment().format()),
      formdata.append('title', title),
      formdata.append('category', value1),
      formdata.append('subcategory', value2),
      formdata.append('description', description),
      AddArticlesAPI({url: 'article-add', Auth: user.token}, formdata)
        .then(res => {
          setLoadingCursor(false);
          console.log('addArticle response', res);
          if (res.status == 'error') {
          } else if (res.status === 'success') {
            navigation.goBack();
          }
        })
        .catch(err => {
          console.log('err in addArticle', err);
          setLoadingCursor(false);
        });
  };

  return (
    <View style={Stylesheet.Container}>
      {LoadingCursor && <Loader />}
      {LoadingCursor2 && <Indicator />}
      <View style={[Stylesheet.Headerstyle, {justifyContent: 'space-between'}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>Add Articles</Text>
        <Text style={Stylesheet.userIcon}>{'   '}</Text>
      </View>
      <ScrollView>
        <View style={{paddingBottom: wp(10)}}>
          <TouchableOpacity
            onPress={() => picker()}
            style={{
              width: wp(30),
              height: wp(30),
              alignSelf: 'center',
              marginTop: wp(5),
            }}>
            <Image
              style={{width: wp(30), height: wp(30), borderRadius: wp(15)}}
              source={image ? {uri: image} : images.add}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text
            style={{
              color: '#000',
              fontFamily: family.medium,
              fontSize: 14,
              marginTop: wp(10),
              marginLeft: wp(9),
            }}>
            Articles Name
          </Text>
          <View
            style={{
              width: wp(85),
              height: hp(7),
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 2,
              color: '#000',
              marginTop: 10,
              alignSelf: 'center',
            }}>
            <TextInput
              style={{width: wp(75), color: '#000'}}
              placeholder="Enter Articles Name"
              placeholderTextColor={'#AFAFAF'}
              fontsize={14}
              fontFamily={family.regular}
              value={title}
              onChangeText={txt => setTitle(txt)}
              multiline={true}
            />
          </View>

          <View style={{zIndex: 1000, marginTop: wp(8), alignSelf: 'center'}}>
            <Text style={Stylesheet.edit_txt1}>Category</Text>

            <DropDownPicker
              dropDownDirection="BOTTOM"
              open={open1}
              value={value1}
              items={category.map(item => ({
                label: item.name,
                value: item.id,
              }))}
              setOpen={setOpen1}
              setValue={setValue1}
              setCategory={setCategory}
              listMode="SCROLLVIEW"
              placeholder="Enter Metric System"
              onChangeSearchText={txt => {
                setItemsCity(txt);
              }}
              onSelectItem={item => {
                console.log('item', item);
                if (value1 != null) {
                  setLoadingCursor2(true)
                  Sub_Category_APi({
                    url: 'article-subcategory-list',
                    Auth: user.token,
                    id: value1,
                  })
                    .then(res => {
                      setLoadingCursor2(false)
                      if (res.status == 'error') {
                      } else if (res.status === 'success') {
                        setSubDetail(res.article);
                      }
                      
                      // console.log('res',res.message)
                    })
                    .catch(err => {
                      console.log('err in article-list', err);
                      setLoadingCursor2(false)

                    });
                }
              }}
              arrowIconContainerStyle={{
                backgroundColor: '#5FB9E8',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                // left: wp(2),
              }}
              // listItemContainerStyle={{height: wp(8)}}
              // listItemLabelStyle={{height: wp(8)}}
              // showArrowIcon={false}
              labelStyle={{
                fontFamily: family.regular,
                fontSize: 14,
              }}
              textStyle={{
                fontFamily: family.regular,
                fontSize: 14,
              }}
              placeholderStyle={{
                color: '#AFABAB',
                fontFamily: family.regular,
                fontSize: 14,
              }}
              style={{
                width: wp(85),
                height: hp(7),
                // minHeight: 35,
                borderWidth: 0,
                borderColor: '#E8E7EA',
                backgroundColor: '#FFFFFF',
                elevation: 1,
                borderRadius: 10,
                marginBottom: 35,
                marginTop: 10,
              }}
              dropDownContainerStyle={{
                width: wp(85),
                maxHeight: wp(20),
                borderWidth: 0,
                borderColor: '#E8E7EA',
                backgroundColor: '#FFFFFF',
                elevation: 1,
              }}
              selectedItemContainerStyle={{backgroundColor: '#5FB9E8'}}
              selectedItemLabelStyle={{color: 'white'}}
            />
          </View>

          <View style={{zIndex: 100, alignSelf: 'center'}}>
            <Text style={Stylesheet.edit_txt1}>Subcategory</Text>

            <DropDownPicker
              dropDownDirection="BOTTOM"
              open={open2}
              value={value2}
              items={subDetail?.map(item => ({
                label: item.name,
                value: item.id,
              }))}
              setOpen={setOpen2}
              setValue={setValue2}
              setCategory={setSubDetail}
              listMode="SCROLLVIEW"
              placeholder="Enter Metric System"
              onChangeSearchText={txt => {
                setCategory(txt);
              }}
              arrowIconContainerStyle={{
                backgroundColor: '#5FB9E8',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                // left: wp(2),
              }}
              // listItemContainerStyle={{height: wp(8)}}
              // listItemLabelStyle={{height: wp(8)}}
              // showArrowIcon={false}
              labelStyle={{
                fontFamily: family.regular,
                fontSize: 14,
              }}
              textStyle={{
                fontFamily: family.regular,
                fontSize: 14,
              }}
              placeholderStyle={{
                color: '#AFABAB',
                fontFamily: family.regular,
                fontSize: 14,
              }}
              style={{
                width: wp(85),
                height: hp(7),
                // minHeight: 35,
                borderWidth: 0,
                borderColor: '#E8E7EA',
                backgroundColor: '#FFFFFF',
                elevation: 1,
                borderRadius: 10,
                marginBottom: 28,
                marginTop: 10,
              }}
              dropDownContainerStyle={{
                width: wp(85),
                maxHeight: wp(20),
                borderWidth: 0,
                borderColor: '#E8E7EA',
                backgroundColor: '#FFFFFF',
                elevation: 1,
              }}
              selectedItemContainerStyle={{backgroundColor: '#5FB9E8'}}
              selectedItemLabelStyle={{color: 'white'}}
            />

          {/* {!subDetail?  <View
              style={{
                backgroundColor: '#FFFFFF',
                elevation:2,
                width: wp(85),
                height: hp(7),
                borderRadius: 10,
                position: 'absolute',
                top: wp(8),
              }}></View>:null} */}
          </View>

          <Text
            style={{
              color: '#000',
              fontFamily: family.medium,
              fontSize: 14,

              marginLeft: wp(9),
            }}>
            Add Articles
          </Text>
          <View
            style={{
              width: wp(85),
              height: hp(20),
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              // alignItems: 'center',
              // justifyContent: 'center',
              elevation: 2,
              color: '#000',
              marginTop: 10,
              alignSelf: 'center',
            }}>
            <TextInput
              style={{width: wp(80), color: '#000', paddingLeft: wp(5)}}
              placeholder="Write here..."
              placeholderTextColor={'#AFAFAF'}
              fontsize={14}
              fontFamily={family.regular}
              numberOfLines={7}
              multiline={true}
              textAlignVertical={'top'}
              value={description}
              onChangeText={txt => setDescription(txt)}
            />
          </View>

          <View style={{marginTop: wp(10)}}>
            <Button title="Add" onPress={() => Add()} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddArticles;
