import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AudioStreamHeader = () => {
  const {
    audio: {
      serverIsListening,
      serverIsLoadingResponse,
      transcripts,
      serverErrorMsg,
    },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (serverErrorMsg) {
      toast.error(serverErrorMsg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [serverErrorMsg]);
  const n = transcripts.length - 1;
  return (
    <>
      {(serverIsListening || serverIsLoadingResponse) && (
        <div className="bg-white absolute top-0 right-0 flex justify-between rounded-full items-center m-3 z-50 mx-w-3/4 max-w-full max-h-20">
          {serverIsListening && transcripts[n] !== '' && (
            <div className="ml-5 mr-5 p-3">{transcripts[n]}</div>
          )}

          <div className="w-20 h-20 rounded-full flex animated-gradient-bg  justify-center items-center">
            {serverIsListening ? (
              <i className="fa-solid fa-microphone text-5xl text-muted"></i>
            ) : (
              <div
                className="text-muted inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default AudioStreamHeader;
