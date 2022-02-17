import React from 'react';
import { connect } from 'react-redux';


const CroppedVideo = (props:any) =>{
    if(!props.video){
        return null;
    }
    return(
        <div>
            <video src={props.video.path} controls/>
        </div>
    );
    
}

export default CroppedVideo;