import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchVideo } from '../actions';

const availableVideos = [
    {label: "Reaction time", path: "videos/Reaction_Time.mp4", transcript: "videos/transcript.json"},
    {label: "Reaction time 2", path: "videos/Reaction_Time.mp4", transcript: "videos/transcript.json"},
]


const DemoIntroduction = (props: any)=>{
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0)
    
    const goToVideoDetails = ()=>{
        props.setDisplayVideoDetails(true);
        const videoPath = availableVideos[selectedVideoIndex]['path'];
        const transcriptPath = availableVideos[selectedVideoIndex]['transcript']
        const videoTitle = availableVideos[selectedVideoIndex]['label']
        props.fetchVideo(videoTitle, videoPath, transcriptPath);
    }

    const handleVideoSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        event.preventDefault();
        setSelectedVideoIndex(parseInt(event.target.value))
    }

    return(
        <div className="ui large center aligned header">
            <h2>Welcome to our demo please select video</h2>
            <select className="ui fluid selection dropdown" value={selectedVideoIndex} onChange={handleVideoSelectionChange}>
                {availableVideos.map((option, index) => (
                <option value={index} key={index}>{option.label}</option>
                ))}
            </select>
            <button className="ui button primary" onClick={goToVideoDetails}>Start demo</button>
      </div>
    )
}


export default connect(null, { fetchVideo })(DemoIntroduction);