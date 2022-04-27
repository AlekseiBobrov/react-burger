import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = React.useState('');

  const onChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  
  const onChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div className="page">
      <div className={styles.container}>
        <p className="text text_type_main-medium">Вход</p>
        <Input type="email" onChange={onChangeEmail} value={email} name={'email'} placeholder="E-mail"/>
        <PasswordInput onChange={onChangePassword} value={password} name={'password'} />
        <Button type="primary" size="medium" onClick={() => console.log('onClick Войти')}>Войти</Button>
        <div className={styles['bottom-links']}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?&nbsp;
          <Link to='/register' className='link-nodecoration'>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?&nbsp;
          <Link to='/forgot-password' className='link-nodecoration'>Восстановить пароль</Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;