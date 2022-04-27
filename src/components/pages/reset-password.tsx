import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updatePassword } from '../../services/actions/forgot-password';

import styles from './index.module.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const handelButtonClick = () => {
    if (password && code) {
      dispatch(updatePassword(password, code));
    }
  }

  return (
    <div className="page">
      <div className={styles.container}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input
          type={showPassword?"text":"password"}
          onChange={onChangePassword}
          value={password} 
          name={'password'}
          placeholder="Введите новый пароль"
          icon={showPassword?"ShowIcon":"HideIcon"}
          onIconClick={()=>setShowPassword(!showPassword)}
          />
        <Input type="text" onChange={onChangeCode} value={code} name={'code'} placeholder="Введите код из письма" />
        <Button type="primary" size="medium" onClick={handelButtonClick}>Сохранить</Button>
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

export default ResetPasswordPage;