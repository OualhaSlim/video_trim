import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { fetchVideo } from '../actions';
import TextField from './TextField';
import VideoPlayer from './VideoPlayer';
import CroppedVideo from './CroppedVideo';

const override = `
  display: block;
  margin: auto;
  border-color: red;
`;

const VideoDetails = (props: any)=>{
    const [videoOnPlay, setVideoOnPlay] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    console.log("rerendering")
    
    useEffect(()=>{
        // fix for ffmpeg error https://github.com/ffmpegwasm/react-app/issues/3#issuecomment-991958164
        const script = document.createElement("script");
        script.src = "../coi-serviceworker.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])

    useEffect(()=>{
        setIsLoading(false)
    }, [props.croppedVideo])

    console.log(props)
    return(
        <>
        {isLoading? <PacmanLoader color={'#36D7B7'} loading={isLoading} css={override} size={150} />
        : !props.video ? <div>
                            Select a video please:
                            <button 
                                className="ui button primary"
                                onClick={()=> props.fetchVideo()}
                            >
                                Video1
                            </button>
                        </div>
        : <div className="ui grid">
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
                <TextField  videoOnPlay={videoOnPlay} setVideoOnPlay={setVideoOnPlay} setIsLoading={setIsLoading}/>
            </div>
            <CroppedVideo video={props.croppedVideo} />
        </div>}
    </>
    )
};

const mapStateToProps = (state: any) =>{
    return { 
        video: state.videos_store.source_video,
        croppedVideo : state.videos_store.cropped_video
    };
};

export default connect(mapStateToProps, { fetchVideo })(VideoDetails);