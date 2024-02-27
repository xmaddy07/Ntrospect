import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {family} from '../constant/Index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Stylesheet from '../constant/Stylesheet';
import LinearGradient from 'react-native-linear-gradient';

const JournalInput = ({visible, onClose, foodDetails, navigation}) => {
  const [inputValue, setInputValue] = useState('');
  const [caloriesPerServing, setCaloriesPerServing] = useState(null);

  const calculateCaloriesPerServing = () => {
    const calories = parseFloat(foodDetails.totalCalories);
    const servingSize = parseFloat(foodDetails.servingSize);
    const additionalValue = parseFloat(inputValue);

    if (!isNaN(calories) && !isNaN(servingSize) && !isNaN(additionalValue) && servingSize !== 0) {
      const totalAnswer = calories / servingSize;
      const result = totalAnswer * additionalValue;
      setCaloriesPerServing(result.toFixed(2));
    } else {
      // Handle invalid input
      setCaloriesPerServing(null);
    }
  };
  
  

  

  return (
   
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.container}>
        
        <View style={[styles.modalContainer,{  height:caloriesPerServing? 330:300,}]}>
 
          <Text
            style={
              styles.txt
            }>{`How much ${foodDetails.foodName} did you consume?`}</Text>

          <View style={{}}>

              <View style={[Stylesheet.flexView2,{marginTop:5}]}>
                <Text style={styles.Lugala_txt3}>Calorie</Text>
                <Text style={styles.Lugala_txt4}>{foodDetails.totalCalories}</Text>
              </View>

              <View style={[Stylesheet.flexView2,{marginTop:5}]}>
                <Text style={styles.Lugala_txt3}>serving size</Text>
                <Text style={styles.Lugala_txt4}>{foodDetails.servingSize}</Text>
              </View>
       

          </View>
<View style={{alignSelf:'center'}}>
          <TextInput
            style={styles.input}
            placeholder="Enter serving size"
            placeholderTextColor={'gray'}
            onChangeText={setInputValue}
            value={inputValue}
          />
          </View>
  {caloriesPerServing?  <View style={{  flexDirection: 'row',
    justifyContent:'space-around',
    marginTop:10,}}>
                <Text style={styles.Lugala_txt3}>Consume Calories</Text>
                <Text style={styles.Lugala_txt4}>{caloriesPerServing}</Text>
              </View>:null}
              <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:40}}>
            <TouchableOpacity 
            onPress={()=>onClose()}
            style={styles.Cancel}>
              <Text style={[styles.txt2,{color:'#5FB9E8'}]}>Cancel</Text>
            </TouchableOpacity>
           
            <TouchableOpacity 
            onPress={calculateCaloriesPerServing}
            style={styles.add}>
              <Text style={styles.txt2}>Add</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(4,4,4,0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    width: 300,
    height: 330,
    borderRadius: 10,
    elevation: 2,
    // alignItems: 'center',s
    // justifyContent:'center',
  },
  input: {
    width: 240,
    height: 40,
    borderColor: 'gray',
    // borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
    borderRadius: 5,
    marginTop: 20,
    fontSize: 14,
    backgroundColor:'#FFFFFF',
    elevation:1.5,
    textAlign:'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignSelf:'center'
  },
  add: {
    width: 120,
    height: 40,
    backgroundColor: '#5FB9E8',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Cancel: {
    width: 120,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth:0.7,
    borderColor:'#5FB9E8',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#000',
    fontFamily: family.bold,
    fontSize: 11,
    marginTop: 20,
    textAlign: 'center',
    marginHorizontal:30
  },
  txt2: {color: '#FFFFFF', fontSize: 14, fontFamily: family.semibold},
  flexView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Lugala_txt8: {
    color: '#000',
    fontSize: 14,
    fontFamily: family.semibold,
  },
  Lugala_txt9: {
    color: '#6D6D6D',
    fontSize: 12,
    fontFamily: family.medium,
  },
  Lugala_txt3: {
    color: '#000',
    fontSize: 12,
    fontFamily: family.semibold,
  },
  Lugala_txt4: {
    fontSize: 12,
    fontFamily: family.regular,
    color: '#5FB9E8',
    // marginVertical: 5,
  },
});

export default JournalInput;
