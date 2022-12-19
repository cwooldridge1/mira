import { useEffect, useRef } from 'react';

type Props = {};

const Clock = (props: Props) => {
  const timeRef = useRef<HTMLParagraphElement>(null);
  // Inside your Javascript file
  const updateTime = () => {
    let today = new Date();
    let h = today.getHours() % 12;
    let m = today.getMinutes();
    let elem = timeRef.current;
    const formatTime = (i: number) => (i < 10 ? `0${i}` : i);
    if (elem) elem.innerText = formatTime(h) + ':' + formatTime(m);
  };
  useEffect(() => {
    updateTime();
    setInterval(updateTime, 1000);
  }, []);
  return (
    <p ref={timeRef} className="text-9xl grow font-light tracking-tighter"></p>
  );
};

export default Clock;
