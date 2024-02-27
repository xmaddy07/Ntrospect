import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';

const UserGuid = ({navigation}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <View style={Stylesheet.Container}>
      <View style={[Stylesheet.Headerstyle, {justifyContent: 'space-between'}]}>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>User Guide</Text>

        <Text>{'       '}</Text>
      </View>
      <ScrollView>
        <View style={{paddingBottom: 20}}>
          <Image
            style={{width: '100%', height: 200, marginTop: 15}}
            source={require('../../assets/guide.png')}
            resizeMode="contain"
          />
          {!showMore ? (
            <View style={{marginHorizontal: 15, marginTop: 15}}>
              <Text style={Stylesheet.guidTxtH}>1. Exploring Recipes:</Text>
              <View style={Stylesheet.dotflex}>
                <View style={Stylesheet.dot}></View>
                <Text style={Stylesheet.guidTxtP}>
                  Browse the recipe catalog or use the search feature to find
                  specific recipes.
                </Text>
              </View>

              <View style={Stylesheet.dotflex}>
                <View style={Stylesheet.dot}></View>
                <Text style={Stylesheet.guidTxtP}>
                  Filter recipes based on dietary preferences, cuisines,
                  ingredients, and more.
                </Text>
              </View>

              <View style={Stylesheet.dotflex}>
                <View style={Stylesheet.dot}></View>
                <Text style={Stylesheet.guidTxtP}>
                  Tap on a recipe to view details such as ingredients,
                  instructions, and cooking time.
                </Text>
              </View>

              <View style={Stylesheet.dotflex}>
                <View style={Stylesheet.dot}></View>
                <Text style={Stylesheet.guidTxtP}>
                  Save recipes to your favorites for quick access later.
                </Text>
              </View>
              <TouchableOpacity 
              style={{left:60,bottom:12}}
              onPress={() => setShowMore(!showMore)}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                    color: '#5FB9E8',
                  }}>
                  {showMore ? 'See Less' : 'See More'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={{marginHorizontal: 15, marginTop: 15}}>
                <Text style={Stylesheet.guidTxtH}>1. Exploring Recipes:</Text>
                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Browse the recipe catalog or use the search feature to find
                    specific recipes.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Filter recipes based on dietary preferences, cuisines,
                    ingredients, and more.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Tap on a recipe to view details such as ingredients,
                    instructions, and cooking time.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Save recipes to your favorites for quick access later.
                  </Text>
                </View>
              </View>

              <View style={{marginHorizontal: 15, marginTop: 15}}>
                <Text style={Stylesheet.guidTxtH}>
                  2. Meal Planning and Grocery List:
                </Text>
                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Plan your meals for the week using the app's meal planning
                    feature.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Select recipes from the catalog and add them to specific
                    days or meals.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Automatically generate a grocery list based on the recipes
                    you've selected.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Customize the grocery list by adding or removing items as
                    needed.
                  </Text>
                </View>
              </View>

              <View style={{marginHorizontal: 15, marginTop: 15}}>
                <Text style={Stylesheet.guidTxtH}>3. Social Features:</Text>
                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Connect with friends or other users of the app.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Share recipes, meal plans, and cooking tips.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Explore community features such as forums or recipe
                    exchanges.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Follow other users to get updates on their activities and
                    discoveries.
                  </Text>
                </View>
              </View>

              <View style={{marginHorizontal: 15, marginTop: 15}}>
                <Text style={Stylesheet.guidTxtH}>
                  4. Tracking and Nutrition:
                </Text>
                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Log your food intake to track your meals and snacks.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Monitor your daily calorie intake and macronutrient
                    breakdown.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Set personal goals for weight management or dietary targets.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Access nutritional information for recipes and individual
                    ingredients.
                  </Text>
                </View>
              </View>

              <View style={{marginHorizontal: 15, marginTop: 15}}>
                <Text style={Stylesheet.guidTxtH}>
                  5. Troubleshooting and Support:
                </Text>
                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    If you encounter any issues, consult the app's FAQ section.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Reach out to the app's support team through the provided
                    contact information.
                  </Text>
                </View>

                <View style={Stylesheet.dotflex}>
                  <View style={Stylesheet.dot}></View>
                  <Text style={Stylesheet.guidTxtP}>
                    Check for app updates to ensure you have the latest features
                    and bug fixes.
                  </Text>
                </View>

                <Text style={Stylesheet.guidTxtP}>
                  That concludes our user guide for the food-related app. Enjoy
                  exploring recipes, planning meals, and connecting with others
                  who share your culinary interests!
                </Text>
              </View>
              <TouchableOpacity 
              style={{alignSelf:'flex-end',right:40,bottom:15}}
              onPress={() => setShowMore(!showMore)}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                    color: '#5FB9E8',
                  }}>
                  {!showMore ? 'See More' : 'See Less'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        
        </View>
      </ScrollView>
    </View>
  );
};

export default UserGuid;
