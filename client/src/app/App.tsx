import React from 'react';
import './App.scss';
import Layout from './components/Layout';
import AudioStreamHeader from './features/AudioStreamer/AudioStreamHeader';

function App() {
  return (
    <>
      <AudioStreamHeader />
      <Layout />
    </>
  );
}

export default App;
