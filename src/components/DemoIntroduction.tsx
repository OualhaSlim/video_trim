import React from 'react';
import { connect } from 'react-redux';
import { fetchVideo } from '../actions';


const DemoIntroduction = (props: any)=>{
    
    const goToVideoDetails = ()=>{
        props.setDisplayVideoDetails(true)
        props.fetchVideo();
    }

    return(
        <div className="ui large center aligned header">
            <h2>Welcome to our demo</h2>
            <button className="ui button primary" onClick={goToVideoDetails}>Start demo</button>
      </div>
    )
}


export default connect(null, { fetchVideo })(DemoIntroduction);