import React, { useRef, useState, useEffect } from "react"
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true })

type videoPlayerProps = {
    src: string
  };

const VideoPlayer: React.FC<videoPlayerProps>  = (props) =>{
    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoPlaying, setVideoPlaying] = useState(false) 
    const [ready, setReady] = useState(false)
    const [gif, setGif] = useState('')
    
    const load = async () =>{
        await ffmpeg.load()
        setReady(true)
    }

    useEffect(()=>{
        // fix for ffmpeg error https://github.com/ffmpegwasm/react-app/issues/3#issuecomment-991958164
        const script = document.createElement("script");
        script.src = "../coi-serviceworker.js";
        script.async = true;
        document.body.appendChild(script);
        load();
    }, [])
    
    const playVideo = (event: any) => {
        videoRef.current && videoRef.current.play();
        setVideoPlaying(true)
    };

    const pauseVideo = (event: any) => {
        videoRef.current && videoRef.current.pause();
        setVideoPlaying(false)
    };

    const cropVideo = async () =>{
        ffmpeg.FS('writeFile', 'input_video.mp4', await fetchFile(props.src));

        await ffmpeg.run('-i', `input_video.mp4`, '-t', '2', '-ss', '10.0', '-f', 'mp4', 'cropped_video.mp4')
        
        const data = ffmpeg.FS('readFile', 'cropped_video.mp4')

        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
        setGif(url)
    }

    return(
        <div>
            <div>
                <video 
                    ref={videoRef} 
                    src={props.src} 
                    width="400" 
                    height="400" 
                    controls 
                    onEnded={() => setVideoPlaying(false)}
                    onPause={() => setVideoPlaying(false)}
                    onPlay={() => setVideoPlaying(true)}
                />
            </div>
            {videoPlaying ? <button className="ui button" onClick={pauseVideo.bind(this)}>Pause</button>:
                <button className="ui button" onClick={playVideo.bind(this)}>Play</button>
            }
            {ready?  <button onClick={cropVideo}>convert</button>: null}
            {gif && <video src={gif} controls />}
        </div>
    )
}

export default VideoPlayer