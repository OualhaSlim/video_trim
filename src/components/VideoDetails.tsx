import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import TextField from './TextField';
import VideoPlayer from './VideoPlayer';
import CroppedVideo from './CroppedVideo';

const override = `
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;
`;

const VideoDetails = (props: any)=>{
    const [videoOnPlay, setVideoOnPlay] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    
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

    return(
        <>
        {isLoading || !props.video? <div>
            <div className="ui huge header center aligned">Creating video in progress...</div>
                <RingLoader color={'#36D7B7'} css={override} loading={isLoading} size={200} />
            </div>
        : <div className="ui grid padded" >
            <div className="two column row">
                <div className='column'>
                    <h3>Details for: {props.video.title}</h3>
                    <p>
                        duration: {props.video.duration} seconds
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

export default connect(mapStateToProps, null)(VideoDetails);