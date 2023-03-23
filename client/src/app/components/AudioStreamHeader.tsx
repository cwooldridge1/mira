import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

const AudioStreamHeader = () => {
  const {
    audio: { serverIsListening, serverIsLoadingResponse, transcripts },
  } = useSelector((state: RootState) => state);

  return serverIsListening ? (
    <div className="bg-white absolute top-0 right-0 flex justify-between rounded-full items-center m-3 z-10 mx-w-3/4 max-w-full max-h-20">
      <div className="ml-5 mr-5 p-3">{transcripts.at(-1)}</div>
      <div className="w-20 h-20 rounded-full flex animated-gradient-bg  justify-center items-center">
        {serverIsListening && (
          <i className="fa-solid fa-microphone text-5xl text-muted"></i>
        )}
      </div>
    </div>
  ) : serverIsLoadingResponse ? (
    <div className="absolute top-0 right-0 m-3 w-20 h-20 rounded-full flex animated-gradient-bg  justify-center items-center z-10">
      <div
        className="text-muted inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AudioStreamHeader;
