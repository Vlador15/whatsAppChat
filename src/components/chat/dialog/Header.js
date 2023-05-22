import classes from './styles.module.scss';
import avatar from '../../../assets/images/ava.jpg';

export const Header = ({ activeDialog, isActiveDialog, dialog }) => {
  return (
    <div className={classes.header}>
      <div className={classes.header__info}>
        {isActiveDialog && (
          <>
            <img
              className={classes.item__avatar}
              src={dialog.avatar || avatar}
              alt=""
              width="40"
              height="40"
            />
            <p>{activeDialog.name || ''}</p>
          </>
        )}
      </div>
      <div></div>
    </div>
  );
};
