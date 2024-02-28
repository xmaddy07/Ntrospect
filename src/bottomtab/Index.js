import {Image, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/main/Home';
import Products from '../screens/main/Products';
import NewsFeed from '../screens/main/NewsFeed';
import Favorites from '../screens/main/Favorites';
import {family, images} from '../constant/Index';
import Stylesheet from '../constant/Stylesheet';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Lugala from '../screens/main/Lugala';
import Brand from '../screens/main/Brand';
import Company from '../screens/main/Company';
import Manufacture from '../screens/main/Manufacture';
import {colors} from '../components/Colors';
import {useSelector} from 'react-redux';
import NewsList from '../screens/main/NewsList';
import ArticlesList from '../screens/main/ArticlesList';
import Food_Journal from '../screens/main/Food_Journal';
import MyProfile from '../screens/main/MyProfile';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// const MiddleStackPro = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
//     {/* <Stack.Screen
//       name="Lugala"
//       component={Lugala}
//       options={{headerShown: false}}
//     /> */}

//     <Stack.Screen
//       name="Brand"
//       component={Brand}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="Company"
//       component={Company}
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       name="Manufacture"
//       component={Manufacture}
//       options={{headerShown: false}}
//     />
//   </Stack.Navigator>
// );

const MiddleStackNews = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="NewsFeed"
      component={NewsFeed}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ArticlesList"
      component={ArticlesList}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="NewsList"
      component={NewsList}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
const MiddleStackProfile = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyProfile"
      component={MyProfile}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Favorites"
      component={Favorites}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default function BIndex({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Products"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: wp(18),
          width: wp(100),
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor:'#3B3B3B'
      }}>
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarLabel: 'Products',
          tabBarLabelStyle: {
            bottom: 5,
            fontSize: 9,
            fontFamily: family.regular,
            
          },

          tabBarIcon: ({focused}) => (
            <Image
              tintColor={focused ? colors.main : '#3B3B3B'}
              style={{width: 22, height: 22}}
              source={images.KNIFE}
              resizeMode="contain"
            />
          ),
        }}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: 'Products'}),
        })}
      />

      <Tab.Screen
        name="Food_Journal"
        component={Food_Journal}
        options={{
          tabBarLabel: 'Journal',
          tabBarLabelStyle: {
            bottom: 5,
            fontSize: 9,
            fontFamily: family.regular,
          },

          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={'fire'}
              size={28}
              style={{color: focused ? colors.main : '#3B3B3B'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? colors.main : '#B8B9BB',
                width: 70,
                height: 70,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                bottom: 15,
              }}
            >
              <Image
                style={[
                  Stylesheet.scanImage,
                  { tintColor: focused ? '#FFFFFF' : '#000' },
                ]}
                source={images.scanner}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarStyle: { display: "none" },
   
        })}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: 'Home' }),
        })}
      />
      <Tab.Screen
        name="NewsFeed"
        component={MiddleStackNews}
        options={{
          tabBarLabel: 'NewsFeed',
          tabBarLabelStyle: {
            bottom: 5,
            fontSize: 9,
            fontFamily: family.regular,
          },

          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name={'book-open'}
              size={25}
              style={{color: focused ? colors.main : '#3B3B3B', top: 3}}
            />
          ),
        }}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: 'NewsFeed'}),
        })}
      />
      <Tab.Screen
        name="MyProfile"
        component={MiddleStackProfile}
        options={{
          
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            bottom: 7,
            fontSize: 9,
            fontFamily: family.regular,
          },
          

          tabBarIcon: ({focused}) => (
            <FontAwesome
              name={'user'}
              size={25}
              style={{color: focused ? colors.main : '#3B3B3B', top: 2}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
