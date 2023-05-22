import avatar from '../../../assets/images/ava.jpg';
import classes from './styles.module.scss';

export const DialogItem = ({ dialog, onClick, getLastMessage }) => (
  <div className={classes.item} onClick={onClick}>
    <div className="row">
      <img
        className={classes.item__avatar}
        src={dialog.avatar || avatar}
        alt=""
        width="50"
        height="50"
      />
      <div className={classes.item__info}>
        <div className="row-between">
          <p>{dialog.name || ''}</p>
          <p>{getLastMessage.time || ' '}</p>
        </div>
        <p className={classes.item__text}>{getLastMessage.text || ' '}</p>
      </div>
    </div>
  </div>
);
