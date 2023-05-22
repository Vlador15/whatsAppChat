import classes from './styles.module.scss';

export const Message = ({ message: { text, time, isSender } }) => {
  return (
    <div
      className={`${classes.message} ${
        !isSender ? classes.message__left : classes.message__right
      }`}
    >
      <div className={classes.message__container}>
        <p className={classes.message__text}>{text}</p>
        <p className={classes.message__time}>{time}</p>
      </div>
    </div>
  );
};
