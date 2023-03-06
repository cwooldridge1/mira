/// <reference types="react-scripts" />
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        REACT_APP_LOCAL_URL : string;
        REACT_APP_CLOUD_URL : string;
      }
    }
  }

export {}