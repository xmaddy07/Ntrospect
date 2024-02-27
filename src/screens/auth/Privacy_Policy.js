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


const Privacy_Policy = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF',paddingBottom:wp(8)}}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" color="#5FB9E8" size={26} />
        </TouchableOpacity>
        <Text style={styles.header_text}>Privacy Policy</Text>
        <TouchableOpacity 
        onPress={()=>navigation.goBack()}
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
            În ciuda opiniei publice, Lorem Ipsum nu e un simplu text fără sens.
            El îşi are rădăcinile într-o bucată a literaturii clasice latine din
            anul 45 î.e.n., făcând-o să aibă mai bine de 2000 ani. Profesorul
            universitar de latină de la colegiul Hampden-Sydney din Virginia,
            Richard McClintock, a căutat în bibliografie unul din cele mai rar
            folosite cuvinte latine "consectetur", întâlnit în pasajul Lorem
            Ipsum, şi căutând citate ale cuvântului respectiv în literatura
            clasică, a descoperit la modul cel mai sigur sursa provenienţei
            textului. Lorem Ipsum provine din secţiunile 1.10.32 şi 1.10.33 din
            "de Finibus Bonorum et Malorum" (Extremele Binelui şi ale Răului) de
            Cicerone, scrisă în anul 45 î.e.n. Această carte este un tratat în
            teoria eticii care a fost foarte popular în perioada Renasterii.
            Primul rând din Lorem Ipsum, "Lorem ipsum dolor sit amet...", a fost
            luat dintr-un rând din secţiunea 1.10.32. Pasajul standard de Lorem
            Ipsum folosit încă din secolul al XVI-lea este reprodus mai jos
            pentru cei interesaţi. Secţiunile 1.10.32 şi 1.10.33 din "de Finibus
            Bonorum et Malorum" de Cicerone sunt de asemenea reproduse în forma
            lor originală, impreună cu versiunile lor în engleză din traducerea
            de către H. Rackham din 1914.
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
export default Privacy_Policy;
