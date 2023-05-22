# WhatsApp chat (green api)

### Запуск приложения

```bash
# install dependencies
$ npm install

# app with hot reload at localhost:3000
$ npm run start
```

### Описание сервиса

Простой чат, напоминающий по дизайну whatApp, использующий функции green-api для получения/отправки сообщений.

##### Стек:

React.js / Mobx / Mui

##### Функции

- Выбор "активного чата", с динамической подгрузкой сообщений для данного диалога и данными пользователя.
- Фильтрация диалогов по имени пользователя
- Добавление нового диалога по номеру телефону (с подгрузкой контактных данных методом getContactInfo)
- Обработка входящих уведомлений с интервалом 5с (с помощью метода: ReceiveNotification, DeleteNotification)
- Отправка сообщений пользователю (с помощью метода: SendMessage)

<img src="https://imgur.com/65SulLL" max-width="600" />
<img src="https://imgur.com/jA1wOwt" max-width="600" />
