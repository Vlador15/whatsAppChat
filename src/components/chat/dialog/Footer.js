import classes from './styles.module.scss';

import Input from '@mui/material/Input';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useState, useContext } from 'react';
import { getTime } from '../../../helpers';
import { sendMessageWA } from './../../../api/whatsappApi';
import { Context } from './../../../index';

export const Footer = () => {
  const [message, setMessage] = useState('');
  const { user } = useContext(Context);

  const sendMessage = () => {
    if (message.trim() !== '') {
      // отправляем сообщение пользователю в WA
      sendMessageWA({ user, message });

      // сохраняем сообщение в локальный стор
      user.addMessage({
        text: message,
        time: getTime(Date.now() / 1000),
        isSender: true,
      });
      setMessage('');
    }
  };

  const handleKeys = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={classes.footer}>
      {user.isActiveDialog && (
        <>
          <Input
            fullWidth
            placeholder="Введите сообщение"
            disableUnderline={true}
            className={classes.footer__input}
            value={message || ''}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeys}
          />

          <IconButton
            aria-label="send message"
            color="primary"
            onClick={() => sendMessage()}
          >
            <SendIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};
