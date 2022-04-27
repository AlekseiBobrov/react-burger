import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';


import styles from './register.module.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = React.useState('');

  const onChangeName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  
  const onChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div className="page">
      <div className={styles.container}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input onChange={onChangeName} value={name} name={'name'} placeholder="Имя"/>
        <Input type="email" onChange={onChangeEmail} value={email} name={'email'} placeholder="E-mail"/>
        <PasswordInput onChange={onChangePassword} value={password} name={'password'} />
        <Button type="primary" size="medium" onClick={() => console.log('onClick Зарегистрироваться')}>Зарегистрироваться</Button>
        <div className={styles['bottom-links']}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?&nbsp;
            <Link to='/login' className='link-nodecoration'>Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;