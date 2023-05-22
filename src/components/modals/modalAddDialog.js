import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { getContactInfo } from '../../api/whatsappApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #c1cfff',
  boxShadow: 24,
  p: 6,
  outline: 'none',
};

export default function ModalAddDialog({ openModal, setOpenModal, user }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const handleClose = () => setOpenModal(false);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegExp = /^7\d{10}$/; // регулярное выражение для номера телефона
    return phoneRegExp.test(phoneNumber);
  };

  const addDialog = async () => {
    if (!validatePhoneNumber(phone)) {
      return setError('Номер телефона указан в неверном формате');
    }

    const contactInfo = await getContactInfo({
      user,
      chatId: `${phone}@c.us`,
    });

    if (contactInfo) {
      const { avatar, name, chatId } = contactInfo;
      user.addDialog({
        chatId,
        name,
        avatar,
        messages: [],
      });
      setError('');
      setPhone('');
      handleClose(false);
    } else {
      setError('Аккаунта с таким номером телефона не существует');
      setPhone('');
    }
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Добавление нового чата
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Введите номер телефона пользователя:
          </Typography>

          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={!phone ? true : false}
            helperText={'* формат номера телефона: 79999999999'}
            sx={{ mb: 2 }}
          />

          <Button fullWidth variant="outlined" onClick={() => addDialog()}>
            Создать
          </Button>
          {error && (
            <Typography id="modal-modal-description" sx={{ color: 'red' }}>
              {error}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
