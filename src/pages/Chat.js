import { Sidebar } from '../components/chat/sidebar';
import { Dialog } from '../components/chat/dialog';
import { handlerMessages } from '../api/whatsappApi';
import { useContext } from 'react';
import { Context } from './../index';

export const Chat = () => {
  const { user } = useContext(Context);

  setInterval(() => {
    handlerMessages({ user });
  }, 5000);

  return (
    <div className="row">
      <Sidebar />
      <Dialog />
    </div>
  );
};
