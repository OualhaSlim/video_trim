import React from 'react';
import { connect } from 'react-redux';


const CroppedVideo = (props:any) =>{
    console.log("heeeeeeeeere")
    if(!props.video){
        return (
            <div>
                Hello Im a video    
            </div>
          );
    }
    return(
        <div>
            <video src={props.video.path} controls/>
        </div>
    );
    
}

export default CroppedVideo;