import React from 'react';
import './App.scss';
import Weather from './components/Weather';
import Clock from './components/Clock';
import Notification from './components/Notification';
import AppContainer from './components/ui/AppContainer';
// const { app } = window.require('@electron/remote');
function App() {
  return (
    <div className="flex flex-row h-screen">
      <div className="basis-1/4 h-screen pt-10">
        <Clock />
        <Weather />
        <div className="gap-8 columns-1 gap-y-10 p-3">
          <Notification
            title="Doctor Appointment"
            desc="Coming up at 11PM"
            img="google-calendar.png"
          />
          <Notification
            title="Trade Executed!"
            desc="Bought 100x shares of SPXL @ $100.21"
            img="alpaca.png"
          />
        </div>
      </div>
      <div className="basis-3/4 flex h-screen items-center justify-center">
        <AppContainer>
          <iframe
            className="w-full aspect-video h-full"
            src="https://www.youtube.com/embed/DArzZ3RvejU"
          ></iframe>
        </AppContainer>
      </div>
    </div>
  );
}

export default App;
