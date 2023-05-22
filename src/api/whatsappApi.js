import axios from 'axios';
import { getTime } from '../helpers';

export const handlerMessages = ({ user }) => {
  try {
    const { apiTokenInstance, idInstance } = user.credentials;
    const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;

    axios.get(url).then(async (res) => {
      const data = res.data;
      if (data) {
        // обработка текстовых сообщений
        const typeMessage = data.body.messageData.typeMessage;
        if (
          typeMessage === 'extendedTextMessage' ||
          typeMessage === 'textMessage'
        ) {
          const contactInfo = await getContactInfo({
            user,
            chatId: data.body.senderData.chatId,
          });

          if (contactInfo) {
            const { avatar, name, chatId } = contactInfo;
            const text =
              data.body.messageData.extendedTextMessageData?.text ||
              data.body.messageData.textMessageData?.textMessage;

            user.addDialog({
              chatId,
              name,
              avatar,
              messages: [
                {
                  text,
                  time: getTime(data.body.timestamp),
                  isSender: false,
                  idMessage: data.body.idMessage,
                },
              ],
            });
          }
        }

        // удаляем уведомление
        deleteNotification({
          user,
          receiptId: data.receiptId,
        });
      }
      console.log(data);
    });
  } catch (e) {
    console.log(`Ошибка запроса: ${e}`);
  }
};

export const deleteNotification = ({ user, receiptId }) => {
  const { apiTokenInstance, idInstance } = user.credentials;
  const url = `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId} `;

  axios.delete(url).then((res) => {
    const data = res.data;
    console.log(data, ' deleted');
  });
};

export const sendMessageWA = ({ user, message }) => {
  const { apiTokenInstance, idInstance } = user.credentials;
  const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;

  const data = { chatId: user.activeDialog.chatId, message };

  axios.post(url, data).then((res) => {
    const data = res.data;
    console.log(data);
  });
};

export const getContactInfo = ({ user, chatId }) => {
  const { apiTokenInstance, idInstance } = user.credentials;
  const url = `https://api.green-api.com/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`;

  const data = { chatId };

  return new Promise((resolve, reject) => {
    axios.post(url, data).then((res) => {
      const data = res.data;

      if (data.name === '') {
        resolve(false);
      } else {
        resolve(data);
      }
    });
  });
};
