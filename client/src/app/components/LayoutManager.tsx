import React from 'react';
import Clock from './Clock';
import Notification from './Notification';
import Weather from './Weather';
import ContentManager from './ContentManager';

/**
 * The application has differnt layout states depending on the availible content
 * this component manages the layout based on the availible content
 *  */
const LayoutManger = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="basis-1/4 h-screen pt-10 flex flex-col justify-center">
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
      <div className="basis-3/4 flex flex-col h-screen items-center justify-center">
        <ContentManager />
      </div>
    </div>
  );
};
export default LayoutManger;

// <div className="flex">
//   {/* <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
//     Tabs
//   </button>
//   <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
//     History
//   </button> */}
//   <div
//     className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-full inline-flex backdrop-blur-md bg-opacity-20 "
//     role="alert"
//   >
//     <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
//       New
//     </span>
//     <span className="font-semibold mr-2 text-left flex-auto">Tabs</span>
//     <svg
//       className="fill-current opacity-75 h-4 w-4"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 20 20"
//     >
//       <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
//     </svg>
//   </div>
//   <div
//     className="p-2 bg-indigo-800 items-center justify-center text-indigo-100 leading-none rounded-full flex backdrop-blur-md bg-opacity-20 "
//     role="alert"
//   >
//     <span className="font-semibold text-center p">Tabs</span>
//   </div>
// </div>
