import React from 'react';
import './App.scss';
import Layout from './components/Layout';
import AudioStreamHeader from './features/AudioStreamer/AudioStreamHeader';

// const { app } = window.require('@electron/remote');
function App() {
  return (
    <>
      <AudioStreamHeader />
      <Layout />
    </>
  );
}

export default App;
