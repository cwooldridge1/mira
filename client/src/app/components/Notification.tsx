import React from 'react';
import Tile from './ui/Tile';

type Props = {
  title: string;
  desc: string;
  img?: string;
};

const Notification = ({ title, desc, img }: Props) => {
  return (
    <Tile>
      <>
        {img && (
          <div className="shrink-0">
            <img
              className="h-100 w-12"
              src={require(`../../styles/notification-icons/${img}`)}
              alt={img}
            />
          </div>
        )}
      </>
      <div>
        <div className="text-xl font-medium text-black">{title}</div>
        <p className="text-slate-500">{desc}</p>
      </div>
    </Tile>
  );
};

export default Notification;
