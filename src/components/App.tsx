import React from 'react';
import Header from './Header';
import VideoDetails from './VideoDetails';


const App: React.FC = () => {
  return (
    <div>
      
      <div className="ui container">
      <Header />
        <VideoDetails />
      </div>
    </div>
  );
}

export default App;
