import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReadMore from '@fawazahmed/react-native-read-more';

const Term = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF',paddingBottom:wp(8)}}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" color="#5FB9E8" size={26} />
        </TouchableOpacity>
        <Text style={styles.header_text}>Terms & Conditions</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}>
          <AntDesign name="close" color="#5FB9E8" size={22} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.text_box}>
          <ReadMore
            numberOfLines={14}
            style={styles.Rodnae_txt8}
            seeMoreStyle={{color: '#5FB9E8'}}
            seeLessStyle={{color: '#5FB9E8'}}>
            Please read the following terms and conditions as these terms of use
            ( “Terms”) constitute a legally binding agreement between you and
            the Company regarding your use of the Site and any services offered
            by the Company including but not limited to delivery of specialised
            content via the Site, any mobile or internet connected device or
            otherwise (the "the Service").“User” or “You”: means any person who
            access or avail this site of the Company for the purpose of hosting,
            publishing, sharing, transacting, displaying or uploading
            information or views and includes other persons jointly
            participating in using the site of the Company By accessing the Site
            or Service and/or by clicking "I agree", you agree to be bound by
            these Terms. You hereby represent and warrant to the Company that
            you are at least eighteen (18) years of age or above and are capable
            of entering, performing and adhering to these Terms and that you
            agree to be bound by the following terms and conditions. While
            individuals under the age of 18 may utilize the Service of the site,
            they shall do so only with the involvement & guidance of their
            parents and/or legal guardians, under such Parent /Legal guardian’s
            registered account. You agree to register prior to uploading any
            content and/or comment and any other use or services of this Site
            and provide your details including but not limited to complete name,
            age, email address, residential address, contact number.
          </ReadMore>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: wp(89),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: hp(4),
    flexDirection: 'row',
  },
  header_text: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  text_box: {
    marginTop: hp(8),
    marginHorizontal:wp(5)

  },
  text: {
    color: '#666666',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  Rodnae_txt8: {
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: wp(7),
  },
});
export default Term;
