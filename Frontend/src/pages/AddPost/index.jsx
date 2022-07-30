import { useCallback, useMemo, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState([]);

  const inputFileRef = useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
      console.log(imageUrl);
    } catch (err) {
      console.warn(err);
      alert('Помилка при завантаженні файлу');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        tags: tags.split(','),
        text,
      };

      const { data } = await axios.post('/posts', fields);

      const id = data._id;

      //! будем перекидати на статтю яку щойно створили
      navigate(`/posts/${id}`);
    } catch (err) {
      console.warn(err);
      alert('Помилка при створенні статті');
    }
  };

  const options = useMemo(
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
      <Button
        //! конпку з вибором файлу ми приховуєм і через реф будем на неї клікати цією кнопкою
        onClick={() => inputFileRef.current.click()}
        variant='outlined'
        size='large'
      >
        Завантажити прев'ю
      </Button>
      <input
        ref={inputFileRef}
        type='file'
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant='contained'
            color='error'
            onClick={onClickRemoveImage}
          >
            Видалити
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444/${imageUrl}`}
            alt='Uploaded'
          />
        </>
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
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size='large' variant='contained'>
          Опублікувати
        </Button>
        <a href='/'>
          <Button size='large'>Скасувати</Button>
        </a>
      </div>
    </Paper>
  );
};
