import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export const Index = () => {
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src='https://play-lh.googleusercontent.com/uh-YyABDPOU_NdZno8Eq11YkNu6BGNButL4YApda9rzc1YAHcLJyFYv7_yEy-s9Tbg'
        />
        <div className={styles.form}>
          <TextField
            label='Написати комент'
            variant='outlined'
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant='contained'>Відправити</Button>
        </div>
      </div>
    </>
  );
};
