import React, { useState, useRef, useEffect, FC } from 'react'
import { useDispatch, useSelector } from '../../utils/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { setUserData } from '../../services/actions/auth';

import styles from './profile.module.css';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const serverName = useSelector(state => state.auth.name);
  const serverEmail = useSelector(state => state.auth.email);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [showButtons, setShowButtons] = useState(false);

  useEffect(
    () => {
      setName(serverName);
      setEmail(serverEmail);
    },
    [serverName]
  )

  useEffect(
    () => {
      if (
        name !== serverName ||
        email !== serverEmail ||
        password !== ''
      ) {
        setShowButtons(true)
      } else {
        setShowButtons(false)
      }
    },
    [name, serverName, serverEmail, email, password]
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

  const handleSaveClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(setUserData(name, email, password));
  }

  const handleCancelClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setName(serverName);
    setEmail(serverEmail);
    setPassword('');
  }


  return (
    <>
      <form className={styles.container} onSubmit={handleSaveClick}>
        <Input
          type="text"
          onChange={onChangeName}
          value={name}
          name={'name'}
          placeholder="Имя"
          icon="EditIcon"
          onIconClick={() => { setEditName(true); nameRef.current?.focus() }}
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
          onIconClick={() => { setEditEmail(true); emailRef.current?.focus() }}
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
          onIconClick={() => { setEditPassword(true); passwordRef.current?.focus() }}
          onBlur={() => setEditPassword(false)}
          disabled={!editPassword}
          ref={passwordRef}
        />
        {showButtons &&
          <div className={styles.buttons}>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
            <Button type="primary" size="medium" onClick={handleCancelClick}>
              Отмена
            </Button>
          </div>
        }
      </form>
      <div className={styles.side} />
    </>
  )
}

export default Profile