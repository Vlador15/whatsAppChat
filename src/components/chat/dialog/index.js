import classes from './styles.module.scss';
import { Context } from './../../../index';
import { useContext, useRef } from 'react';
import { Header } from './Header';
import { Message } from './Message';
import { Footer } from './Footer';
import { observer } from 'mobx-react-lite';

/* 
  TODO: 
  1. Сделать страницу после "перейти в чат", где будет форма 
  и ввод двух параметров с сохранением их куда-то

  2. Далее научиться делать запросы в ту штуку и отлавливать сообщения

  3. Сделать кнопку "добавить номер", плюсик (кнопка), после введения
  делается запрос и создается чат. 
*/

export const Dialog = observer(() => {
  const { user } = useContext(Context);
  const autoScroll = useRef(null);

  autoScroll.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className={classes.dialog}>
      <Header
        activeDialog={user.activeDialog}
        isActiveDialog={user.isActiveDialog}
        dialog={user.activeDialog}
      />
      <main className={classes.dialog__container}>
        {user.isActiveDialog ? (
          <>
            <div className={classes.dialog__wrapper}>
              {user.activeDialog.messages.map((message, index) => (
                <Message message={message} key={index} />
              ))}
              <p className={classes.dialog__scroll} ref={autoScroll}></p>
            </div>
          </>
        ) : (
          <div className={classes.dialog__error}>
            Для начала диалога создайте или выберите чат!
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
});
