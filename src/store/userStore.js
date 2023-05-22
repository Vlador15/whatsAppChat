import { makeAutoObservable } from 'mobx';

export default class UserStore {
  apiTokenInstance = '';
  idInstance = '';
  dialogs = [
    {
      chatId: 1,
      name: 'Vlad (фейк)',
      time: '12:00',
      messages: [
        {
          text: 'Привет, как дела?',
          time: '20:00',
          isSender: false,
        },
        {
          text: 'Всё хорошо!',
          time: '20:01',
          isSender: true,
        },
      ],
    },
    {
      chatId: 2,
      name: 'Vlad Kucher (фейк)',
      time: '12:01',
      messages: [
        {
          text: 'Привет!',
          time: '10:00',
          isSender: false,
        },
      ],
    },
  ];

  isActiveDialog = false;
  _activeDialog = '';

  constructor() {
    makeAutoObservable(this);
  }

  // получить учетные данные
  setCredentials = ({ apiTokenInstance, idInstance }) => {
    this.apiTokenInstance = apiTokenInstance;
    this.idInstance = idInstance;
  };

  // фильтрация диалогов по имени пользователя
  filterDialogsByName = (text) => {
    return this.dialogs.filter(
      (dialog) =>
        dialog.name.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) > -1
    );
  };

  // список всех диалогов
  getDialogs = () => {
    return this.dialogs;
  };

  // добавить новый диалог
  addDialog = (dialog) => {
    if (dialog) {
      const isDialog = this.dialogs.find((x) => x.chatId === dialog.chatId);

      if (isDialog) return this.updateDialogs(dialog);
      return this.dialogs.push(dialog);
    }
  };

  // обновить существующий диалог
  updateDialogs(dialog) {
    const currentDialog = this.dialogs.find((x) => x.chatId === dialog.chatId);
    if (currentDialog) {
      currentDialog.messages = [...currentDialog.messages, ...dialog.messages];
    }
  }

  // установить активный чат по его ID
  setActiveDialog = (chatId) => {
    this._activeDialog = chatId;
    this.isActiveDialog = true;
  };

  // получить последнее сообщение в диалоге
  getLastMessage = (chatId) => {
    const dialog = this.dialogs.find((x) => x.chatId === chatId);

    if (dialog) {
      return dialog.messages.at(-1) || {};
    } else {
      return '';
    }
  };

  // получить активный диалог
  get activeDialog() {
    return this.dialogs.find((x) => x.chatId === this._activeDialog);
  }

  getActiveDialog = () => {
    return this.activeDialog;
  };

  getMessages = (id) => {
    return this.dialogs[id].messages;
  };

  addMessage = (message) => {
    if (message) this.activeDialog.messages.push(message);
  };

  get credentials() {
    return {
      apiTokenInstance: this.apiTokenInstance,
      idInstance: this.idInstance,
    };
  }
}
