import {combineReducers} from "redux";
import authReducer from "./authReducer";
export default combineReducers({
    replaceMe: () => 5,
    auth: authReducer
});