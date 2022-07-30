import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const AddPost = () => {
  const imageUrl = '';
  const isAuth = useSelector(selectIsAuth);
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');

  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введіть текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  //! !window.localStorage.getItem('token') додаєм в провірку, шоб не викидувала на головну ше до того як запит виконався
  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />;
  }


  return (
    <Paper style={{ padding: 30 }}>
      <Button variant='outlined' size='large'>
        Завантажити прев'ю
      </Button>
      <input type='file' onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant='contained' color='error' onClick={onClickRemoveImage}>
          Видалити
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt='Uploaded'
        />
      )}
      <br />
      <br />
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.title }}
        variant='standard'
        placeholder='Заголовок статті...'
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant='standard'
        placeholder='Теги'
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size='large' variant='contained'>
          Опублікувати
        </Button>
        <a href='/'>
          <Button size='large'>Скасувати</Button>
        </a>
      </div>
    </Paper>
  );
};
