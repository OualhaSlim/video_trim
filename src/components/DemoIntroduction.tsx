import React from 'react';
import { connect } from 'react-redux';
import { fetchVideo } from '../actions';

const availableVideos = [
    {label: "Reaction time", path: "videos/Reaction_Time.mp4", transcript: "videos/transcript.json"},
    {label: "Reaction time 2", path: "videos/Reaction_Time.mp4", transcript: "videos/transcript.json"},
]

const DemoIntroduction = (props: any)=>{
    
    const goToVideoDetails = (event: React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        props.setDisplayVideoDetails(true);
        const selectedVideoIndex = parseInt(event.currentTarget.value)
        console.log(selectedVideoIndex)
        const videoPath = availableVideos[selectedVideoIndex]['path'];
        const transcriptPath = availableVideos[selectedVideoIndex]['transcript']
        const videoTitle = availableVideos[selectedVideoIndex]['label']
        props.fetchVideo(videoTitle, videoPath, transcriptPath);
    }

    return(
        <div className="ui large center aligned header">
            <h2>Welcome to our demo please select a video</h2>
                <div className="ui stackable four column grid">
                    {availableVideos.map((option, index) => (
                    <button 
                        className='ui button primary column' 
                        style={{"marginTop": "30px"}}
                        value={index} 
                        key={index}
                        onClick={goToVideoDetails}
                        >
                            {option.label}
                        </button>
                    ))}
            </div>
      </div>
    )
}


export default connect(null, { fetchVideo })(DemoIntroduction);