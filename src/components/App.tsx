import React from 'react';
import TextField from './TextField';
import VideoPlayer from './VideoPlayer';
import Helpers from '../Helpers';

const App: React.FC = () => {
  return (
    <div className="ui container">
      <Helpers />
      <VideoPlayer />
      <TextField text="please provide me a lot of text" />
    </div>
  );
}

export default App;
