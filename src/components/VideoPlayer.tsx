import React, { useEffect, useRef } from "react"

type videoPlayerProps = {
    src: string,
    videoOnPlay: boolean,
    setVideoOnPlay:React.Dispatch<React.SetStateAction<boolean>>
  };

const VideoPlayer: React.FC<videoPlayerProps>  = (props) =>{
    const videoRef = useRef<HTMLVideoElement>(null)
    
    useEffect(()=>{        
        if(props.videoOnPlay === true) {
            videoRef.current && videoRef.current.play();
        }
        else{
            videoRef.current && videoRef.current.pause();
        }
    }, [props.videoOnPlay])

    return(
        <div>
            <div>
                <video 
                    ref={videoRef} 
                    src={props.src}
                    controls
                    width="100%" 
                    height="auto"
                    onEnded={() => props.setVideoOnPlay(false)}
                    onPause={() => props.setVideoOnPlay(false)}
                    onPlay={() => props.setVideoOnPlay(true)}
                />
            </div>
        </div>
    )
}

export default VideoPlayer