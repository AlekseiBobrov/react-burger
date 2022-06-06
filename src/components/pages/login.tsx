import React, { useState, FC } from 'react'
import { useDispatch, useSelector } from '../../utils/hooks';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { makeLogin } from '../../services/actions/auth';

import styles from './index.module.css';

interface StateType {
  from: string;
}

const LoginPage: FC = () => {
  const { state } = useLocation<StateType>();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email && password) {
      dispatch(makeLogin(email, password));
    }
  }

  if (isAuth) {
    return <Redirect to={state?.from || '/'} />
  } else {
    return (
      <div className="page">
        <form className={styles.container} onSubmit={handleButtonClick}>
          <p className="text text_type_main-medium">Вход</p>
          <Input type="email" onChange={onChangeEmail} value={email} name={'email'} placeholder="E-mail" />
          <PasswordInput onChange={onChangePassword} value={password} name={'password'} />
          <Button type="primary" size="medium">Войти</Button>
          <div className={styles.bottom}>
            <p className="text text_type_main-default text_color_inactive">
              Вы — новый пользователь?&nbsp;
              <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?&nbsp;
              <Link to={{ pathname: '/forgot-password', state: { from: '/login' } }} className={styles.link}>Восстановить пароль</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;