import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchVideo } from '../actions';
import TextField from './TextField';
import VideoPlayer from './VideoPlayer';

const VideoDetails = (props: any)=>{
    const [videoOnPlay, setVideoOnPlay] = useState(false)
    console.log(props)
    if (!props.video){
        return (
        <div>
            Select a video please:
            <button 
                className="ui button primary"
                onClick={()=> props.fetchVideo()}
            >
                Video1
            </button>
        </div>
        )
    }
    return (
    <div className="ui grid">
        <div className="two column row">
            <div className='column'>
                <h3>Details for: video1</h3>
                <p>
                    Title: {props.video.title}
                    <br/>
                    duration: {props.video.duration}
                    <br/>
                    number of speakers: {props.video.nbSpeakers}
                </p>
            </div>
            <div className='column'>
                <VideoPlayer src={props.video.videoPath} videoOnPlay={videoOnPlay} setVideoOnPlay={setVideoOnPlay}/>
            </div>
        </div>
        <div className='row'>
            <TextField text={props.video.text} src={props.video.videoPath} timeStamp={props.video.timeStamp} videoOnPlay={videoOnPlay} setVideoOnPlay={setVideoOnPlay}/>
        </div>
    </div>);
};

const mapStateToProps = (state: any) =>{
    return { video: state.selectedVideo };
};

export default connect(mapStateToProps, { fetchVideo })(VideoDetails);