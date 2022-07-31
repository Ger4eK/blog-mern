import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  //! перевірємо чи ми авторизовані
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Ви справді хочете вийти?')) {
      dispatch(logout());

      //! видаляємо токен з ls при виході
      window.localStorage.removeItem('token', '');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>MERN BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to='/add-post'>
                  <Button variant='contained'>Написати статтю</Button>
                </Link>
                <Link to='/login'>
                  <Button
                    onClick={onClickLogout}
                    variant='contained'
                    color='error'
                  >
                    Вийти
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button variant='outlined'>Увійти</Button>
                </Link>
                <Link to='/register'>
                  <Button variant='contained'>Створити акаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
