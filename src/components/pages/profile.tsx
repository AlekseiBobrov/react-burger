import React, { useState,  useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { makeLogout, getUserData, setUserData } from '../../services/actions/auth';

import pageStyles from './index.module.css';
import styles from './profile.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const serverName = useSelector( (state:any) => state.auth.name );
  const serverEmail = useSelector( (state:any) => state.auth.email );

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  useEffect(
    () => {
      dispatch( getUserData() );
    },
    [dispatch]
  )

  useEffect(
    () => {
      setName(serverName);
      setEmail(serverEmail);
    },
    [serverName]
  )

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogoutClick = () => {
    dispatch(makeLogout());
  }

  const handleSaveClick = () => {
    dispatch(setUserData(name, email, password));
  }

  const handleCancelClick = () => {
    setName(serverName);
    setEmail(serverEmail);
    setPassword('');
  }

  return (
    <div className="page">
      <div className={styles.side}>
        <NavLink to="/profile" className="text text_type_main-medium text_color_inactive" activeClassName="disable-link">Профиль</NavLink>
        <NavLink to="/profile/orders" className="text text_type_main-medium text_color_inactive" activeClassName="disable-link">История заказов</NavLink>
        <p className={`text text_type_main-medium text_color_inactive ${styles.clickable}`} onClick={handleLogoutClick}>Выйти</p>
        <p className={`text text_type_main-default text_color_inactive ${pageStyles.bottom} ${styles.bottom}`}>
          В этом разделе вы можете<br/>изменить свои персональные данные
        </p>
      </div>
      <div className={pageStyles.container}>
        <Input
          type="text"
          onChange={onChangeName}
          value={name}
          name={'name'}
          placeholder="Имя"
          icon="EditIcon"
          onIconClick={() => { setEditName(true);  nameRef.current?.focus()}}
          onBlur={() => setEditName(false)}
          disabled={!editName}
          ref={nameRef}
        />
        <Input
          type="text"
          onChange={onChangeEmail}
          value={email}
          name={'email'}
          placeholder="Логин"
          icon="EditIcon"
          onIconClick={() => {setEditEmail(true);  emailRef.current?.focus()}}
          onBlur={() => setEditEmail(false)}
          disabled={!editEmail}
          ref={emailRef}
        />
        <Input
          type="password"
          onChange={onChangePassword}
          value={password}
          name={'password'}
          placeholder="Пароль"
          icon="EditIcon"
          onIconClick={() => {setEditPassword(true);  passwordRef.current?.focus()}}
          onBlur={() => setEditPassword(false)}
          disabled={!editPassword}
          ref={passwordRef}
        />
        <div className={styles.buttons}>
          <Button type="primary" size="medium" onClick={handleSaveClick}>
            Сохранить
          </Button>
          <Button type="primary" size="medium" onClick={handleCancelClick}>
            Отмена
          </Button>
        </div>
      </div>
      <div className={styles.side} />
    </div>
  );
}

export default ProfilePage;