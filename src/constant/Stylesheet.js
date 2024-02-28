import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {family} from '../constant/Index';

export default StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    height: hp(35),
    width: wp(90),
    marginTop: wp(25),
    // backgroundColor:'red'
  },
  checkButton: {
    height: hp(7.5),
    width: wp(75),
    backgroundColor: '#5FB9E8',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(5),
  },
  checkButton_txt1: {
    color: '#FFFFFF',
    fontFamily: family.medium,
    fontSize: 12,
    letterSpacing: 0.2,
    // textAlign:'left'
  },
  Headerstyle: {
    height: hp(8),
    width: wp(100),
    backgroundColor: '#FFFFFF',
    // elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Headerstyle2: {
    height: hp(8),
    width: wp(100),
    backgroundColor: '#FFFFFF',
    // elevation: 1,
    // borderBottomColor: '#5FB9E8',
    // borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  home_txt1: {
    color: '#000',
    fontFamily: family.semibold,
    fontSize: 16,
  },
  userIcon: {
    color: '#000',
    right: 12,
  },
  closeIcon: {
    color: '#000',
    left: wp(5),
  },
  blanktxt: {
    height: wp(8),
    width: wp(9),
    // marginLeft: wp(2),
  },
  search_input: {
    width: wp(45),
    borderRadius: 10,
    color: '#000',
    paddingLeft: wp(4),
    justifyContent: 'center',
    top: 3,
  },
  search_inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F7F7F7',
    width: wp(75),
    height: hp(6.3),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  searchIcon: {
    width: wp(12),
    height: wp(12),
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: wp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  enterIcon: {
    width: wp(6),
    height: wp(6),
    // right:wp(10)
  },
  RecommendedProducts_View: {
    width: wp(26),
    height: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // marginLeft: wp(3),
    margin: wp(1.5),
    alignItems:'center'
  },
  NewsFeed_View: {
    width: wp(42),
    height: hp(27),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    marginTop: wp(3),
    margin: wp(4),
    paddingBottom: wp(5),
  },
  NewsFeed_image: {
    width: wp(42),
    height: hp(18),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  NewsListview:{
    width: wp(95),
    height: hp(12),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf:'center',
    // borderTopLeftRadius: 10
    // borderTopRightRadius: 10,
  },
  listimgBG: {
    width: wp(30),
    height: hp(12),
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },  

  Articleproduct_View: {
    width: wp(30),
    height: hp(20),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: wp(3),
    marginLeft: 5,
  },

  RecommendedProducts_image: {
    width:65,
    height:60,
    // borderRadius:5
  },
  prodctsBG: {
    width: wp(26),
    height: hp(11),
    // backgroundColor: '#F8F8F8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prodctsBG2: {
    width: wp(30),
    height: hp(11),
    backgroundColor: '#F8F8F8',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NewsFeed_nametxt: {
    color: '#000',
    fontSize: 11,
    fontFamily: family.medium,
    marginTop: wp(3),
    marginHorizontal: wp(1.5),
  },
  Recommended_descriptiontxt: {
    width: wp(35),
    color: '#000',
    fontSize: 12,
    fontFamily: family.regular,
    left: 6,
  },
  NewsProducts_descriptiontxt: {
    width: wp(39),
    color: '#000',
    fontSize: 12,
    fontFamily: family.regular,
    left: wp(2),
    marginTop: wp(3),
  },
  ProductName_txt1: {
    color: '#000',
    fontSize: 14,
    fontFamily: family.semibold,
    left: wp(3),
  },
  ProductName_txt2: {
    color: '#5FB9E8',
    fontSize: 10,
    fontFamily: family.medium,
    right: wp(3),
  },
  txt1_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(3),
    alignItems: 'center',
  },
  producttxt: {
    color: '#000',
    fontSize: 11,
    fontFamily: family.medium,
    top: 7,
    // marginLeft: 3,
    // textAlign:'center'
  },
  arrowleft: {
    color: '#000',
    left: 12,
  },
  ArticleCart_view1: {
    width: wp(55),
    height: hp(17),
  },


  ArticleCart_txt1: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: family.bold,
  },
  ArticleCart_txt2: {
    color: '#000',
    fontSize: 12,
    fontFamily: family.semibold,
    marginLeft: 5,
  },
  ArticleCart_view4: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(3),
    justifyContent: 'center',
  },
  ArticleCart_txt3: {
    width: wp(50),
    color: '#000',
    fontSize: 14,
    fontFamily: family.bold,
    left: wp(5),
    top: wp(1),
  },
  articleProducts_image: {
    width: wp(28),
    height: wp(22),
    borderRadius: 3,
  },
  ArticleCart_txt4: {
    color: '#989BA9',
    fontFamily: family.regular,
    fontSize: 12,
  },
  ArticleCart_txt5: {
    color: '#000',
    fontFamily: family.regular,
    fontSize: 10,
    marginLeft: 5,
    width: wp(55),
  },
  chartIcon: {
    backgroundColor: '#F7F7F7',
    width: wp(11),
    height: wp(11),
    right: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  Articlelist_view1: {
    backgroundColor: '#FFFFFF',
    width: wp(90),
    height: hp(12),
    elevation: 2,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: wp(2),
    justifyContent: 'center',
  },

  Articlelist_view2: {
    width: wp(30),
    height: hp(10),
    alignItems: 'center',
  },
  Articlelist_view3: {
    width: wp(60),
    height: hp(10),
  },
  Articlelist_image: {
    width: wp(43),
    height: hp(16),
    borderRadius: 10,
  },
  Articlelist_txt1: {
    color: '#000',
    fontFamily: family.semibold,
    fontSize: 12,
  },
  Articlelist_txt2: {
    color: '#5FB9E8',
    fontFamily: family.medium,
    fontSize: 12,
  },
  Articlelist_txt3: {
    color: '#000',
    fontFamily: family.regular,
    fontSize: 12,
  },
  RecomendProduct_txt1: {
    color: '#000',
    fontFamily: family.semibold,
    fontSize: 16,
  },
  RecomendProduct_txt2: {
    color: '#000',
    fontFamily: family.medium,
    fontSize: 14,
    left: wp(2),
    marginTop: wp(2),
  },
  RecomendProduct_View: {
    width: wp(43),
    height: hp(22),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    marginTop: wp(3),
    alignSelf: 'center',
  },
  fav_view1: {
    width: wp(43),
    // height: hp(26),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: wp(3),
    margin: wp(2),
    left: wp(3),
    paddingBottom: 5,
  },
  RecomendProduct_image: {
    width: wp(43),
    height: hp(16),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fav_image: {
    width:150,
    height:100,
    alignSelf:'center',
    marginTop:3
  },
  Recomendation_txt1: {
    color: '#000',
    fontFamily: family.semibold,
    fontSize: 16,
  },
  Recomendation_txt2: {
    color: '#000',
    fontFamily: family.medium,
    fontSize: 14,
    left: wp(4),
  },
  Recomendation_View: {
    width: wp(43),
    height: hp(20),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    marginTop: wp(3),
    alignSelf: 'center',
  },
  Recomendation_image: {
    width: wp(43),
    height: hp(16),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    height: hp(10),
    width: wp(40),
    marginTop: wp(15),
    marginRight: wp(3),
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  Nestle_txt1: {
    color: '#000',
    fontFamily: family.regular,
    fontSize: 14,
    textAlign: 'justify',
    margin: wp(5),
    lineHeight: wp(8),
  },
  Nestle_txt2: {
    color: '#0474FB',
    fontFamily: family.light,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  Nestle_txt3: {
    color: '#000000',
    fontFamily: family.bold,
    fontSize: 12,
  },
  Nestle_txt4: {
    color: '#262626',
    fontFamily: family.medium,
    fontSize: 12,
    textDecorationLine: 'underline',
    width:220,
    // marginLeft: wp(4),
  },

  nestleImage: {
    height:190,
    width:wp(95) ,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: wp(2),
  },
  Nestle_CerealView: {
    height: hp(9),
    width: wp(78),
    backgroundColor: '#FAFAFA',
    elevation:2,
    justifyContent:'space-around',
    borderBottomRightRadius:15,
    borderTopLeftRadius:15,
    flexDirection:'row',
    alignItems:'center',
    marginTop:5,
    // borderWidth:0.5,
    // borderColor:'#6D6D6D'
  },
  Rodnae_view1: {
    flexDirection: 'row',
    left: wp(5),
  },
  Rodnae_txt1: {
    color: '#000000',
    fontFamily: family.semibold,
    fontSize: 14,
  },
  Rodnae_txt2: {
    color: '#000000',
    fontFamily: family.light,
    fontSize: 12,
    left: wp(2),
  },
  Rodnae_view2: {
    flexDirection: 'row',
    left: wp(3),
    marginTop: wp(2),
  },
  Rodnae_view3: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: wp(5),
    alignItems: 'center',
    marginHorizontal: wp(2),
  },
  Rodnae_view4: {
    flexDirection: 'row',
  },
  Rodnae_view5: {
    flexDirection: 'row',
    alignItems: 'center',
    // left: wp(2),
    // backgroundColor:'red'
  },
  Rodnae_view6: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Rodnae_view7: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 2,
  },
  Rodnae_txt3: {
    color: '#000000',
    fontFamily: family.semibold,
    fontSize: 14,
  },
  Rodnae_txt4: {
    color: '#000000',
    fontFamily: family.light,
    fontSize: 12,
    left: wp(2),
  },
  Rodnae_txt5: {
    color: '#5FB9E8',
    fontFamily: family.medium,
    fontSize: 12,
    marginLeft:2
  },
  Rodnae_txt6: {
    color: '#000',
    fontFamily: family.medium,
    fontSize: 12,
    marginLeft:2
  },
  Rodnae_txt7: {
    color: '#5FB9E8',
    fontFamily: family.medium,
    fontSize: 7,
    // marginRight:4,
    // top: 3,
  },
  Rodnae_txt8: {
    color: '#000000',
    fontFamily: family.regular,
    fontSize: 14,
    lineHeight: wp(7),
  },
  cmntcircle: {
    width: 9,
    height: 9,
    backgroundColor: '#5FB9E8',
    borderRadius: 50,
    position: 'absolute',
    alignSelf: 'flex-end',
    left: 15,
    bottom: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  more: {
    color: '#000',
    fontFamily: family.regular,
    fontSize: 14,
    lineHeight: wp(7),
    // height:hp(2)
  },

  Rodnae_txt9: {
    color: '#000000',
    fontFamily: family.medium,
    fontSize: 14,
    left: wp(3.5),
  },
  Rodnae_image1: {
    width: wp(100),
    height: 250,
  },
  posterimg: {
    // backgroundColor: 'red',
    width: '100%',
    height: 220,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Rodnae_view8: {
    alignItems: 'center',
    marginHorizontal: wp(4),
    height: hp(25),
    marginTop: wp(3),
  },
  Rodnae_view9: {
    width: wp(26),
    height: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: wp(3),
    // margin: wp(1.5),
  },
  Rodnae_image2: {
    width: wp(25),
    height: wp(25),
  },
  Rodnae_txt10: {
    width: wp(42),
    color: '#000',
    fontSize: 14,
    fontFamily: family.regular,
    left: wp(2),
    marginTop: wp(3),
  },
  Rodnae_txt11: {
    color: '#5FB9E8',
    fontSize: 12,
    fontFamily: family.regular,
    right: wp(5),
  },
  text: {
    color: '#5FB9E8',
    // textAlign: 'right',
    fontFamily: family.semibold,
    fontSize: 14,
    // marginRight: wp(7),
    // marginTop: hp(7),
  },
  detailAuttxt:{
    color: '#FFFFFF',
    fontFamily: family.semibold,
    fontSize: 16,
  },
  circle: {
    width: wp(60),
    height: wp(60),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#67BCE8',
    borderRadius: wp(30),
    alignSelf: 'center',
    marginTop: hp(10),
    justifyContent: 'center',
    shadowColor: '#67BCE8',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  image: {
    alignSelf: 'center',
    width: wp(70),
    height: wp(70),
    marginTop: wp(15),
    // backgroundColor:'red'
  },
  upper_text: {
    color: '#5FB9E8',
    fontSize: 18,
    fontFamily: family.semibold,
    alignSelf: 'center',
    marginTop: hp(8),
  },
  lower_text: {
    color: '#000000',
    fontSize: 16,
    fontFamily: family.regular,
    alignSelf: 'center',
    marginTop: hp(1),
    textAlign: 'center',
  },
  onbord_txt1: {
    color: '#000000',
    fontSize: 18,
    fontFamily: family.regular,
    textAlign: 'center',
  },
  onbord_txt2: {
    color: '#000000',
    fontSize: 16,
    fontFamily: family.regular,
    textAlign: 'right',
  },
  onbord_txt3: {
    color: '#000000',
    fontSize: 18,
    fontFamily: family.regular,
  },
  onbord_txt4: {
    color: '#5FB9E8',
    fontSize: 18,
    fontFamily: family.semibold,
    // textAlign: 'right',
  },
  onbord_txt5: {
    color: '#000000',
    fontSize: 18,
    fontFamily: family.regular,
  },
  onbord_txt6: {
    color: '#5FB9E8',
    fontSize: 18,
    fontFamily: family.semibold,
    // textAlign: 'right',
  },
  onbord_txt7: {
    color: '#000000',
    fontSize: 14,
    fontFamily: family.regular,
  },
  onbord_txt8: {
    color: '#5FB9E8',
    fontSize: 14,
    fontFamily: family.semibold,
  },
  onbord_txt9: {
    color: '#000000',
    fontSize: 14,
    fontFamily: family.regular,
    // textAlign: 'right',
  },
  onbord_txt10: {
    color: '#000000',
    fontSize: 16,
    fontFamily: family.regular,
    marginLeft: wp(5),
  },
  onbord_txt11: {
    color: '#5FB9E8',
    fontSize: 14,
    fontFamily: family.semibold,
  },

  onbord_touch: {
    right: wp(5),
    alignSelf: 'flex-end',
    top: wp(5),
  },
  onbord_View1: {
    width: wp(100),
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  onbord_View2: {
    // width: wp(55),
    alignSelf: 'center',
    marginTop: wp(15),
  },
  onbord_View3: {
    width: wp(65),
    alignSelf: 'center',
    marginTop: wp(10),
  },
  onbord_View4: {
    // width: wp(75),
    // alignSelf: 'center',
    marginTop: wp(15),
    flexDirection: 'row',
    // backgroundColor:'red',
    marginLeft: 15,
  },
  Textinput: {
    width: wp(20),
    height: wp(11),
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingLeft: wp(7),
    color: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 5,
  },
  Textinpu2: {
    width: wp(22),
    height: hp(6),
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginLeft: wp(6),
    elevation: 2,
  },
  QTxt1: {
    color: '#3F3F3F',
    fontSize: 14,
    fontFamily: family.semibold,
  },
  Radiotxt: {
    color: '#000',
    fontSize: 14,
    fontFamily: family.medium,
  },
  button: {
    backgroundColor: '#5FB9E8',
    width: wp(60),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  button_txt: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: family.semibold,
  },

  profileimg: {
    width: wp(22),
    height: wp(22),
    borderRadius: 100,
    // marginTop:15
  },

  editprofileimg: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile_txt1: {
    color: '#000',
    fontSize: 16,
    fontFamily: family.semibold,
  },
  profile_txt2: {
    color: '#000',
    fontSize: 14,
    fontFamily: family.semibold,
  },
  profile_txt3: {
    color: '#000',
    fontSize: 10,
    fontFamily: family.regular,
  },
  profile_txt4: {
    color: '#000',
    fontSize: 14,
    fontFamily: family.medium,
  },
  profileimg_view: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
  },
  profile_line: {
    width: wp(80),
    height: hp(0.1),
    backgroundColor: '#5FB9E8',
    alignSelf: 'center',
    marginTop: wp(5),
  },
  profile_icon: {
    width: 20,
    height: 20,
  },
  alrtBG: {
    backgroundColor: 'rgba(4, 4, 4,0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertsview: {
    width: wp(80),
    height: hp(16),
    backgroundColor: '#F4F8F9',
    borderRadius: 10,
  },
  alrttetxt: {
    color: '#3F3F3F',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    margin: 15,
  },
  Ok: {
    color: '#5FB9E8',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  editprofileimg_view: {
    alignSelf: 'center',
    marginTop: wp(5),
  },
  edit_inputstyle: {
    width: wp(80),
    height: hp(6),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    color: '#000',
    paddingLeft:10,
    marginTop: wp(2),

    elevation: 1.5,
  },
  edit_txt1: {
    color: '#000',
    fontSize: 14,
    fontFamily: family.medium,
    left: wp(1),
  },
  blurView: {
    // backgroundColor: 'rgba(16, 15, 15,0.3)',
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanImage: {
    width: wp(11),
    height: wp(11),
  },
  hearto: {
    marginRight: 15,
  },
  heartoFvt: {
    alignSelf: 'flex-end',
    margin: 8,
  },
  hala: {
    width: wp(12),
    height: wp(12),
  },
  panda: {
    width: wp(12),
    height: wp(12),
  },
  vegan: {
    width: wp(12),
    height: wp(12),
  },
  Lugala_txt1: {
    color: '#000',
    fontSize: 14,
    fontFamily: family.medium,
    marginLeft: wp(4),
    marginTop: wp(8),
  },
  Lugala_txt2: {
    color: '#839DBC',
    fontSize: 12,
    fontFamily: family.regular,
  },
  Lugala_txt3: {
    color: '#000',
    fontSize: 14,
    fontFamily: family.medium,
  },
  Lugala_txt4: {
    color: '#000',
    fontSize: 14,
    fontFamily: family.regular,
    color: '#5FB9E8',
    // marginVertical: 5,
  },

  Lugala_Ingredients: {
    padding: wp(2),
    backgroundColor: '#E9E9E9',
    borderRadius: 6,
    margin: wp(0.5),
  },
  flexView: {
    marginTop: wp(2),
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: wp(2),
  },
  flexView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginTop: wp(3),
  },
  line: {
    width: wp(22),
    height: wp(0.4),
    backgroundColor: '#5FB9E8',
    // alignSelf:'flex-start',
    marginTop: wp(3),
    left: wp(5),
  },
  jornal_View1: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: wp(3),
  },
  jornal_today: {
    width: wp(20),
    height: hp(4),
    // backgroundColor: '#FFFFFF',
    // elevation:1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 0.5,
    // borderColor: '#707070',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  jornal_week: {
    width: wp(20),
    height: hp(4),
    // backgroundColor: '#FFFFFF',
    // elevation:1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 0.5,
    // borderColor: '#707070',
  },
  jornal_year: {
    width: wp(20),
    height: hp(4),
    // backgroundColor: '#FFFFFF',
    // elevation:1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 0.5,
    // borderColor: '#707070',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  clrbox: {
    width:12 ,
    height: 12,
    backgroundColor: '#0772EF',
    borderRadius: 10,
    marginTop: wp(2),
  },
  journal_txt1: {
    color: '#000',
    fontSize: 12,
    fontFamily: family.regular,
    left: wp(2),
    marginTop: wp(2),
  },
  journal_txt2: {
    color: '#000',
    fontSize: 14,
    fontFamily: family.semibold,
    textAlign: 'center',
    marginTop: wp(5),
  },
  flatlistView: {
    width: wp(90),
    height: hp(10),
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderRadius: 5,
    margin:4,
    justifyContent:'space-evenly',
    alignSelf:'center'
  },
  flatlisttxt1:{
    color: '#000',
    fontSize: 14,
    fontFamily: family.medium,
  },
  flatlisttxt2:{
    color: '#B6B6B6',
    fontSize: 11,
    fontFamily: family.regular,
    marginLeft:5
  },
  fleex1:{
flexDirection:'row',
alignItems:'center'
  },
  journal_img1: {
    width: wp(18),
    height: hp(8),
    borderWidth: 1,
    borderColor: '#5FB9E8',
    borderRadius: 5,
    marginLeft: wp(2),
    marginTop: wp(2.3),
  },
  journal_txt3: {
    color: '#000',
    fontSize: 12,
    fontFamily: family.medium,
  },
  leftline: {
    width: wp(20),
    height: hp(10),
    marginLeft: wp(2),
    // backgroundColor:'pink',
    borderWidth: 1,
    borderColor: '#5FB9E8',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  camView: {
    position: 'absolute',
    width: wp(70),
    height: hp(35),
    alignSelf: 'center',
    tintColor: '#FFFFFF',
    top: -50,
  },
  barcodeimg: {
    width: wp(80),
    height: hp(30),
  },
  pieTxt: {
    color: '#262626',
    fontSize:20,
    fontFamily: family.semibold,
    position: 'absolute',
    alignSelf: 'center',
    top:48,
  },
  clrbox2: {
    width: wp(5),
    height: wp(5),
    backgroundColor: '#0772EF',
    borderRadius: 3,
    marginTop: wp(2),
  },
  Lugala_txt5: {
    width: wp(18),
    color: '#F18F8F',
    left: wp(2),
    marginTop: 3,
    fontSize: 12,
    fontFamily: family.medium,
  },
  Lugala_txt6: {
    width: wp(18),
    color: '#FFC114',
    fontSize: 12,
    fontFamily: family.medium,
    left: wp(2),
    marginTop: 3,
  },
  Lugala_txt7: {
    width: wp(18),
    color: '#6FDB77',
    fontSize: 12,
    fontFamily: family.medium,
    left: wp(2),
    marginTop:3,
  },
  color: '#5B2D90',
  fontSize: 14,
  fontFamily: family.medium,
  Lugala_txt8: {
    width: wp(18),
    color: '#7FC8F4',
    fontSize: 12,
    fontFamily: family.medium,
    left: wp(2),
    marginTop: 3,
  },
  piecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(100),
    justifyContent: 'space-evenly',
    marginTop: wp(5),
  },
  direction: {
    flexDirection: 'row',
  },
  salttxt: {
    color: '#000000',
    fontFamily: family.regular,
    fontSize: 14,
    lineHeight: wp(6),
    // textAlign:'center'
  },
  profile_txt5: {
    color: '#000000',
    fontFamily: family.semibold,
    fontSize: 14,
    textAlign: 'center',
  },
  fomo: {
    width: wp(45),
    height: wp(45),
    alignSelf: 'center',
    marginTop: wp(5),
  },
  icon: {
    width: wp(15),
    height: wp(15),
  },
  icontxt: {
    color: '#839DBC',
    fontFamily: family.medium,
    fontSize: 10,
    top: wp(2),
    textAlign: 'center',
  },
  example: {
    // paddingVertical: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: wp(20),
  },
  title: {
    fontSize: 20,
  },
  datepick: {
    width: wp(50),
    height: hp(6),
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: wp(2),
    flexDirection: 'row',
    elevation:2,
  },
  calender: {
    width: wp(90),
    height: hp(42),
    borderRadius: 10,
    // backgroundColor:'red'
  },
  datepickTxt: {
    fontFamily: family.regular,
    fontSize: 14,
    paddingLeft: wp(3),
  },
  checkView: {
    borderWidth: 1,
    borderColor: '#5FB9E8',
    borderRadius: wp(10),
    width: wp(4),
    height: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderTouch: {
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownView1: {
    width: wp(80),
    height: hp(8),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 1,
    flexDirection: 'row',
    // marginLeft:wp(3)
  },
  arrowStyle: {
    backgroundColor: '#5FB9E8',
    width: wp(7),
    height: wp(7),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    top: wp(3.5),
    right: wp(8),
  },
  dropdownSheet: {
    width: wp(80),
    height: hp(18),
    elevation: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    // position:'absolute',
    // marginTop:hp(6.5),
    zIndex: 1000,
  },
  ///////////////////////////////
  dropdown: {
    width: wp(60),
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 5,
  },
  containerStyle: {
    borderRadius: 10,
    maxHeight: hp(15),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: family.regular,
    color: '#000',
    paddingLeft: wp(3),
  },
  selectedTextStyle: {
    fontSize: 13,
    color: '#3F3F3F',
    fontFamily: family.regular,
    // backgroundColor: '#FFFFFF',
    // margin:-2
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
    borderRadius: 10,
  },
  selectedStyle: {
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: '#FFFFFF',
    borderColor: '#5FB9E8',
    margin: -5,
  },
  halalfood: {
    width:wp(98),
    height:200,
    alignSelf: 'center',
    borderRadius:10
    // marginTop: wp(3),
  },
  hiding: {
    fontSize: 12,
    color: '#000',
    fontFamily: family.bold,
  },
  detail: {
    fontSize: 12,
    color: '#000',
    fontFamily: family.regular,
    letterSpacing: 0.5,
  },
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#707070',
    width: wp(18),
    height: hp(4),
    borderColor: '#999999',
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: wp(5),
    top: wp(6),
  },

  timeText: {
    fontSize: 16,
    fontFamily: family.medium,
    marginHorizontal: wp(1),
    color: '#000',
    paddingLeft: wp(4),
  },
  myfood: {
    width: 16,
    height: 14,
    backgroundColor: '#5FB9E8',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heightinput: {
    width: wp(80),
    height: hp(6),
    backgroundColor: '#FFFFFF',
    elevation: 1.5,
    borderRadius: 10,
    color: '#000',
    paddingLeft: wp(3),
  },
  heigharrow: {
    width: wp(5.5),
    height: wp(5.5),
    backgroundColor: '#5FB9E8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    right: wp(13),
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  modalBackgroundM: {
    flex: 1,
    alignItems: 'flex-end',
  },
  activityIndicatorWrapperM: {
    backgroundColor: '#FFFFFF',
    // height: hp(20),
    width: wp(40),
    marginTop: wp(2),
    marginRight: wp(3),
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 8,
    paddingTop: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  txt1M: {
    color: '#1F2937',
    marginLeft: wp(0.8),
    fontSize: 12,
    fontFamily: family.medium,
    // marginTop: wp(2),
  },
  txt2M: {
    color: '#1F2937',
    marginTop: 5,
    marginLeft: wp(2),
    fontSize: 12,
    fontFamily: family.medium,
    // marginTop: wp(3),
  },
  lineM: {
    height: hp(0.2),
    width: wp(35),
    backgroundColor: '#E4E4E4',
    // marginTop: wp(1),
    alignSelf: 'center',
  },
  ViewM: {
    // marginTop: wp(1),
    marginVertical: wp(0.7),
    height: hp(4),
    width: wp(35),
    justifyContent: 'center',
    backgroundColor: '#5FB9E8',
    alignSelf: 'center',
    borderRadius: 5,
  },
  closeIconM: {
    color: '#000',
  },
  chartIconM: {
    backgroundColor: 'transparent',
    width: wp(12),
    height: hp(10),
    right: wp(3.3),
    top: wp(6),
  },
  emptytxt: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: family.light,
    color: '#666666',
  },
  guidTxtH: {
    fontSize: 16,
    fontFamily: family.semibold,
    color: '#000',
    marginTop: 10,
  },
  guidTxtP: {
    fontSize: 14,
    fontFamily: family.regular,
    color: '#000',
    marginTop: 2,
    top: 8,
    paddingLeft: 5,
  },
  guidTxtABP: {
    fontSize: 14,
    fontFamily: family.regular,
    color: '#000',
    marginTop: 10,
    letterSpacing: 0.5,
    lineHeight: 25,
    textAlign: 'left',
    marginHorizontal: 0,
  },
  dot: {
    backgroundColor: '#000',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotflex: {flexDirection: 'row', alignItems: 'center'},
  alergilist: {
    borderColor: '#E8E7EA',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius:9
    // elevation:0.2,
  },
  blueBG: {
    width: wp(100),
    height: hp(28),
    backgroundColor: '#5FB9E8',
  },
  imgBG: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#5FB9E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  underLines1: {
    width: wp(100),
    height: 0.9,
    backgroundColor: '#E2E2E2',
    marginTop: 5,
  },
  NutrientsCircle:{
    width:wp(30),
    height:hp(20),
    backgroundColor:'#FFFFFF',
    elevation:2,
    margin:5,
    borderRadius:8,
    alignItems:'center'
  }
});
