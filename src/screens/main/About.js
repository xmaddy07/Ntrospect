import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReadMore from '@fawazahmed/react-native-read-more';
import { family } from '../../constant/Index';


const About = ({navigation}) => {
  return (
    <View style={Stylesheet.Container}>
      <View style={[Stylesheet.Headerstyle, {justifyContent: 'space-between'}]}>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>About Ntrospect</Text>

        <Text>{'       '}</Text>
      </View>
      <ScrollView>
        <View style={{paddingBottom: 20}}>
          <Image
            style={{
              width:190,
              height:200,
              marginTop: 15,
              alignSelf: 'center',
            }}
            source={require('../../assets/logo.png')}
            resizeMode="cover"
          />
          <View style={{marginHorizontal: 30, marginTop: 15}}>
            
            <ReadMore
              numberOfLines={13}
              style={Stylesheet.guidTxtABP}
              seeMoreStyle={{color: '#A2A2A2',fontSize:10,fontFamily:family.medium}}
              seeLessStyle={{color: 'transparent'}}>
              Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression. Le Lorem Ipsum
              est le faux texte standard de l'imprimerie depuis les années 1500,
              quand un imprimeur anonyme assembla ensemble des morceaux de texte
              pour réaliser un livre spécimen de polices de texte. Il n'a pas
              fait que survivre cinq siècles, mais s'est aussi adapté à la
              bureautique informatique, sans que son contenu n'en soit modifié.
              Il a été popularisé dans les années 1960 grâce à la vente de
              feuilles Letraset contenant des passages du Lorem Ipsum, et, plus
              récemment, par son inclusion dans des applications de mise en page
              de texte, comme Aldus PageMaker.
            </ReadMore>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
