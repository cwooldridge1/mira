import { useEffect, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
type Props = {};

const Weather = (props: Props) => {
  interface WeatherData {
    name: string;
    country: string;
    city: string;
    state: string;
    condition: string;
    temp: {
      current: number;
      max: number;
      min: number;
    };
  }
  const [info, setInfo] = useState<WeatherData>();
  const background = {
    sunny:
      'linear-gradient(284deg, #abccbb 26%, rgba(255,255,255,0) 69%), linear-gradient(160deg, #e4b814 52%, rgba(255,255,255,0) 62%), linear-gradient(147deg, #e37669 89%, rgba(255,255,255,0) 96%), linear-gradient(219deg, #f3d0dd 18%, rgba(255,255,255,0) 65%), radial-gradient(ellipse at -173% -79%, rgba(255,255,255,0) 0%, #271807 54%)',
    clear:
      'linear-gradient(72deg, #cce0d5 15%, rgba(255,255,255,0) 90%), linear-gradient(195deg, #f3b685 5%, rgba(255,255,255,0) 50%), linear-gradient(350deg, #20674a 29%, rgba(255,255,255,0) 78%), linear-gradient(228deg, #843e84 14%, rgba(255,255,255,0) 96%), radial-gradient(circle at -76% -48%, rgba(255,255,255,0) 0%, #d299cf 54%)',
    cloudy:
      'linear-gradient(72deg, #d8d7f6 33%, rgba(255,255,255,0) 90%), radial-gradient(circle at -76% -48%, rgba(255,255,255,0) 0%, #99a2d2 84%)',
    rainy:
      'linear-gradient(72deg, #62aff7 0%, rgba(255,255,255,0) 90%), radial-gradient(circle at -76% -48%, rgba(255,255,255,0) 0%, #bcc6fc 84%)',
    snow: 'linear-gradient(180deg, #cfcfcf 2%, rgba(233, 233, 233, 0) 89%), linear-gradient(185deg, rgba(255,255,255,0) 0%, #ffecfe 1%)',
    overcast:
      'linear-gradient(185deg, rgba(255,255,255,0) 0%, #7d7d7d 106%), linear-gradient(180deg, #6e97ff 2%, rgba(233, 233, 233, 0) 89%)',
  };

  async function getData() {
    await fetch(
      'https://api.weatherapi.com/v1/forecast.json?key=f676e0d30686474d99b160351221104&q=denver&days=1&aqi=no&alerts=no'
    )
      .then((r) => r.json())
      .then((d) => {
        setInfo({
          name: d.location.name,
          country: d.location.country,
          city: d.location.name,
          state: d.location.region,
          condition: d.current.condition.text,
          temp: {
            current: d.current.temp_f,
            max: d.forecast.forecastday[0].day.maxtemp_f,
            min: d.forecast.forecastday[0].day.mintemp_f,
          },
        });
        const condition = d.current.condition.text.toLowerCase();
        let elem = document.getElementById('root');
        if (elem) {
          elem.style.backgroundImage =
            condition === 'clear'
              ? background.clear
              : condition === 'sunny'
              ? background.sunny
              : condition.includes('cloudy')
              ? background.cloudy
              : condition.includes('rain') || condition.includes('drizzle')
              ? background.rainy
              : condition.includes('snow') || condition.includes('sleet')
              ? background.snow
              : condition.includes('overcast')
              ? background.overcast
              : background.overcast;
        }
      });
  }
  useEffect(() => {
    getData();
    setInterval(() => getData(), 200000);
    //eslint-disable-next-line
  }, []);

  return !info ? null : (
    <div className="flex flex-row text-black">
      <div className="flex overflow-hidden grid-cols-2 grid-rows-2 gap-10">
        <div className="">
          {info?.temp ? (
            <p className="text-7xl font-light tracking-tighter">
              {info?.temp?.current}
              <span className="align-top text-lg font-normal">°</span>
            </p>
          ) : null}
        </div>
        <div className="row-span-2 mt-2 justify-self-start truncate">
          <p className=" text-start font-light">{info?.condition}</p>
          {info?.temp ? (
            <p className="text-start font-light">
              <ArrowUpIcon className="h-2 inline-flex align-middle" />
              {info.temp?.max}
              <span className="align-top font-normal text-xs">°</span>{' '}
              <ArrowDownIcon className="h-2 inline-flex align-middle" />
              {info.temp?.min}
              <span className="align-top font-normal text-xs">°</span>
            </p>
          ) : null}

          <p className="text-xs text-start font-light  whitespace-nowrap">
            {info?.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
