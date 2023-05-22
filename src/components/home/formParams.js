import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import { Context } from './../../index';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    color: '#fff',
    '& .MuiTextField-root': {
      marginTop: '15px',
    },
    '& .MuiInputBase-input, .MuiInputLabel-root': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
    '&:hover .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
      {
        borderColor: '#009fff',
      },
  },

  button: {
    padding: '15px 30px',
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: '1px',
    fontSize: '20px',
    borderRadius: '30px',
    border: '1px solid #ffffffa3',
    transition: 'all 0.5s ease',
    backgroundColor: '#383838',

    '&:hover': {
      background: '#4cae4f',
      cursor: 'pointer',
    },
  },
});

export const FormParams = () => {
  const { user } = useContext(Context);
  const { apiTokenInstance, idInstance } = user.credentials;

  const [data, setData] = useState({
    apiTokenInstance,
    idInstance,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const classes = useStyles();

  const handleChange = (e, type) => {
    if (!type) return;
    const { value } = e.target;
    setData((prevData) => ({ ...prevData, [type]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const { apiTokenInstance, idInstance } = data;

    // Валидация
    if (apiTokenInstance.trim() === '') {
      newErrors.apiTokenInstance = 'Заполните: apiTokenInstance';
    }
    if (idInstance.trim() === '') {
      newErrors.idInstance = 'Заполните: idInstance';
    }
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    // Обновление учетных данных пользователя
    user.setCredentials({ apiTokenInstance, idInstance });
    navigate('/chat');
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        width="350px"
        mb={3}
        className={classes.container}
      >
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="idInstance"
          value={data.idInstance}
          onChange={(e) => handleChange(e, 'idInstance')}
          error={errors.idInstance ? true : false}
          helperText={errors.idInstance && errors.idInstance}
        />
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="apiTokenInstance"
          value={data.apiTokenInstance}
          onChange={(e) => handleChange(e, 'apiTokenInstance')}
          error={errors.apiTokenInstance ? true : false}
          helperText={errors.apiTokenInstance && errors.apiTokenInstance}
        />
      </Box>

      <button className={classes.button} onClick={handleSubmit}>
        Перейти к чату
      </button>
    </>
  );
};
