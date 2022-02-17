import { combineReducers } from 'redux';
import { 
    FETCH_VIDEO,
    CROP_VIDEO
} from "../actions/types";

const videosReducer = (state = {}, action:any)=>{
    if(action.type === FETCH_VIDEO){
        return {...state, 'source_video': action.payload}
    }
    else if(action.type === CROP_VIDEO){
        return {...state, 'cropped_video': action.payload}
    }

    return state;
};

export default combineReducers({
    videos_store: videosReducer
});