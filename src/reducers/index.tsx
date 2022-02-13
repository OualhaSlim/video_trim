import { combineReducers } from 'redux';
import { 
    FETCH_VIDEO
} from "../actions/types";

const selectedVideoReducer = (selectedVideo = null, action:any)=>{
    if(action.type === FETCH_VIDEO){
        return action.payload
    }

    return null;
};

export default combineReducers({
    selectedVideo: selectedVideoReducer
});