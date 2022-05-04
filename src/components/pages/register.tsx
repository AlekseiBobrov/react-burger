import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { makeRegister } from '../../services/actions/auth';

import styles from './index.module.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector( (state:any) => state.auth.isAuth )
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = React.useState('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email && password && name) {
      dispatch(makeRegister(email, password, name));
    }
  }
  if (isAuth){
    return <Redirect to="/" />
  } else {
    return (
      <div className="page">
        <form className={styles.container}>
          <p className="text text_type_main-medium">Регистрация</p>
          <Input onChange={onChangeName} value={name} name={'name'} placeholder="Имя" />
          <Input type="email" onChange={onChangeEmail} value={email} name={'email'} placeholder="E-mail" />
          <PasswordInput onChange={onChangePassword} value={password} name={'password'} />
          <Button type="primary" size="medium" onClick={handleButtonClick}>Зарегистрироваться</Button>
          <div className={styles.bottom}>
            <p className="text text_type_main-default text_color_inactive">
              Уже зарегистрированы?&nbsp;
              <Link to='/login' className={styles.link}>Войти</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;