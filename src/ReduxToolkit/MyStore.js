import MyUserSlice from "./MyUserSlice";
import MarkAsScreen from "./MarkAsScreen";
import WhisListSlice from "./WhisListSlice";
import LikeDislikeSlice from "./LikeDislikeSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "@react-native-async-storage/async-storage";

let persistConfig = {
    key: 'root',
    storage,
    whitelist:['user','screen','wishlist','likes']
  };
  let rootReducer=combineReducers({
    user:MyUserSlice,
    screen:MarkAsScreen,
    wishlist:WhisListSlice,
    likes:LikeDislikeSlice,
  });
  let persistedReducer=persistReducer(persistConfig, rootReducer)

const Mystore = configureStore({
    reducer:persistedReducer
});
export default Mystore