import React from 'react'
import Root from './src/index/Root'
import {  Provider as PaperProvider} from 'react-native-paper'
import { Provider } from 'react-redux'
import Mystore from './src/ReduxToolkit/MyStore'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'

let persistor=persistStore(Mystore)


const App = () => {
  return (
    <Provider store={Mystore}>
    <PersistGate persistor={persistor}>
    <PaperProvider >
 <Root/>
 </PaperProvider>
 </PersistGate>
    </Provider>

 
  )
}

export default App
