import classes from './styles.module.scss';
import { Context } from './../../../index';
import { useContext, useEffect, useState } from 'react';
import { DialogItem } from './DialogItem.js';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { observer } from 'mobx-react-lite';
import ModalAddDialog from '../../modals/modalAddDialog';

export const Sidebar = observer(() => {
  const { user } = useContext(Context);
  const [dialogs, setDialogs] = useState(user.dialogs);
  const [openModal, setOpenModal] = useState(false);

  const selectDialog = (dialog) => {
    user.setActiveDialog(dialog.chatId);
  };

  // todo: ошибка с фильтром, после очистки - не добавляет с первого раза новый чат
  const handleFilter = (e) => {
    const value = e.target.value;

    if (value.trim() !== '') {
      setDialogs(user.filterDialogsByName(value));
    } else {
      setDialogs(user.dialogs);
    }
  };

  useEffect(() => {
    setDialogs(user.dialogs);
  }, [user.dialogs]);

  return (
    <div className={classes.sidebar}>
      <header className={classes.sidebar__header}>
        <input
          type="text"
          placeholder="Поиск"
          onChange={(e) => handleFilter(e)}
        />
        <PersonAddAlt1Icon onClick={() => setOpenModal(true)} />
      </header>

      <main>
        <ModalAddDialog
          openModal={openModal}
          setOpenModal={setOpenModal}
          user={user}
        />
        {dialogs.map((dialog, index) => (
          <DialogItem
            dialog={dialog}
            getLastMessage={user.getLastMessage(dialog.chatId)}
            key={index}
            onClick={() => selectDialog(dialog)}
          />
        ))}
      </main>
    </div>
  );
});
