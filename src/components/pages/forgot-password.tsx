import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './index.module.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const onChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  
  return (
    <div className="page">
      <div className={styles.container}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input type="email" onChange={onChangeEmail} value={email} name={'email'} placeholder="Укажите e-mail"/>
        <Button type="primary" size="medium" onClick={() => console.log('onClick Восстановить')}>Восстановить</Button>
        <div className={styles['bottom-links']}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?&nbsp;
            <Link to='/login' className='link-nodecoration'>Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;