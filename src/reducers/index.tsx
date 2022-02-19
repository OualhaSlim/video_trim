import { combineReducers } from 'redux';
import { 
    FETCH_VIDEO,
    TRIM_VIDEO
} from "../actions/types";

const videosReducer = (state= {}, action:any)=>{
    if(action.type === FETCH_VIDEO){
        return {...state, source_video: action.payload, video_on_display: action.payload}
    }
    else if(action.type === TRIM_VIDEO){
        return {...state, video_on_display: action.payload}
    }

    return state;
};

export default combineReducers({
    videos_store: videosReducer
});