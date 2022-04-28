import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { makeLogin } from '../../services/actions/auth';

import styles from './index.module.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  
  const onChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleButtonClick = () => {
    if (email && password) {
      dispatch(makeLogin(email, password));
      history.push({ pathname: '/' });
    }
  }

  return (
    <div className="page">
      <div className={styles.container}>
        <p className="text text_type_main-medium">Вход</p>
        <Input type="email" onChange={onChangeEmail} value={email} name={'email'} placeholder="E-mail"/>
        <PasswordInput onChange={onChangePassword} value={password} name={'password'} />
        <Button type="primary" size="medium" onClick={handleButtonClick}>Войти</Button>
        <div className={styles.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?&nbsp;
          <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?&nbsp;
          <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;