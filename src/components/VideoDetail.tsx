import React from 'react';
import { connect } from 'react-redux';
import { fetchVideo } from '../actions';



const VideoDetail = (props: any)=>{
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
    <div>
        <h3>Details for:</h3>
        <p>
            Title: {props.video.title}
            <br/>
            duration: {props.video.duration}
            <br/>
            number of speakers: {props.video.nbSpeakers}
        </p>
    </div>);
};

const mapStateToProps = (state: any) =>{
    return { video: state.selectedVideo };
};

export default connect(mapStateToProps, { fetchVideo })(VideoDetail);