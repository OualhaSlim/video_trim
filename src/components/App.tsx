import React, { useState } from 'react';
import Header from './Header';
import VideoDetails from './VideoDetails';
import DemoIntroduction from './DemoIntroduction';


const App: React.FC = () => {
  const [displayVideoDetails, setDisplayVideoDetails] = useState(false)
  return (
    <div className="ui container">
      <Header />
      { displayVideoDetails===false? 
        <DemoIntroduction setDisplayVideoDetails={setDisplayVideoDetails} />
      : <VideoDetails />
      }
    </div>
  );
}

export default App;
