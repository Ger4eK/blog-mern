import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';

export const Login = () => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Вхід в акаунт
      </Typography>
      <TextField
        className={styles.field}
        label='E-Mail'
        error
        helperText='Неправильно вказана пошта'
        fullWidth
      />
      <TextField className={styles.field} label='Пароль' fullWidth />
      <Button size='large' variant='contained' fullWidth>
        Увійти
      </Button>
    </Paper>
  );
};
