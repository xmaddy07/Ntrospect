import {StyleSheet, Text, View} from 'react-native';
import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Privacy_Policy from '../screens/auth/Privacy_Policy';
import Term from '../screens/auth/Term';
import Splash from '../screens/auth/Splash';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Forgot_Password from '../screens/auth/Forgot_Password';
import Verify from '../screens/auth/Verify';
import Change_Password from '../screens/auth/Change_Password';
import Index from '../bottomtab/Index';
import ArticlesList from '../screens/main/ArticlesList';
import EditProfile from '../screens/auth/EditProfile';
import Favorites from '../screens/main/Favorites';
import Coments from '../screens/main/Coments';
import Subscription from '../screens/main/Subscription';
import Exports from '../screens/main/Exports';
import Onboarding from '../screens/main/Onboarding';
import {useDispatch, useSelector} from 'react-redux';
import AddArticles from '../screens/main/AddArticles';
import Food_Journal from '../screens/main/Food_Journal';
import DetailsForNews from '../screens/main/DetailsForNews';
import DetailsForArticle from '../screens/main/DetailsForArticle';
import NewsList from '../screens/main/NewsList';
import ProductsList from '../screens/main/ProductsList';
import DetailsForProducts from '../screens/main/DetailsForProducts';
import RelatedItemPrduct from '../screens/main/RelatedItemPrduct';
import RelatedItemNews from '../screens/main/RelatedItemNews';
import RelatedItemArticl from '../screens/main/RelatedItemArticl';
import UserGuid from '../screens/main/UserGuid';
import About from '../screens/main/About';
import Location from '../screens/main/Location';
import ResetPassword from '../screens/auth/resetPassword';
import Setting from '../screens/main/Setting';
import Lugala from '../screens/main/Lugala';
import Brand from '../screens/main/Brand';
import Company from '../screens/main/Company';
import Manufacture from '../screens/main/Manufacture';

const Stack = createNativeStackNavigator();

const Root = () => {
  const user = useSelector(state => state.user.user);
  const isOnboardingCompleted = useSelector(state => state.screen.completed);
  // console.log('===========klk===',isOnboardingCompleted)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user === null ? (
          <Fragment>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Forgot_Password" component={Forgot_Password} />
            <Stack.Screen name="Verify" component={Verify} />
            <Stack.Screen name="Change_Password" component={Change_Password} />
            <Stack.Screen name="Privacy_Policy" component={Privacy_Policy} />
            <Stack.Screen name="Term" component={Term} />
         
          </Fragment>
        ) : (
          <Fragment>
            {isOnboardingCompleted === false ? (
              <Fragment>
                <Stack.Screen name="Onboarding" component={Onboarding} />
              </Fragment>
            ) : (
              <Fragment>
                <Stack.Screen name="Index" component={Index} />
                <Stack.Screen name="ProductsList" component={ProductsList} />
                <Stack.Screen name="Lugala" component={Lugala} />
                <Stack.Screen name="Brand" component={Brand} />
                <Stack.Screen name="Company" component={Company} />
                <Stack.Screen name="Manufacture" component={Manufacture} />
                <Stack.Screen name="DetailsForProducts" component={DetailsForProducts} />
                <Stack.Screen name="NewsList" component={NewsList} />
                <Stack.Screen name="ArticlesList" component={ArticlesList} />
                <Stack.Screen name="Favorites" component={Favorites} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="Food_Journal" component={Food_Journal} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="Exports" component={Exports} />
                
                <Stack.Screen name="Coments" component={Coments} />
                <Stack.Screen name="Subscription" component={Subscription} />
                <Stack.Screen name="AddArticles" component={AddArticles} />
                <Stack.Screen
                  name="DetailsForNews"
                  component={DetailsForNews}
                />
                <Stack.Screen
                  name="DetailsForArticle"
                  component={DetailsForArticle}
                />
                   <Stack.Screen
                  name="RelatedItemPrduct"
                  component={RelatedItemPrduct}
                />
                   <Stack.Screen
                  name="RelatedItemNews"
                  component={RelatedItemNews}
                />
                   <Stack.Screen
                  name="RelatedItemArticl"
                  component={RelatedItemArticl}
                />
                  <Stack.Screen
                  name="UserGuid"
                  component={UserGuid}
                /> 
                 <Stack.Screen
                name="About"
                component={About}
              />
                <Stack.Screen
                name="Location"
                component={Location}
              />
              
              
              </Fragment>
            )}
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
