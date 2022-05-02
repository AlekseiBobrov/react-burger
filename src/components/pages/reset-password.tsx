import React, { useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updatePassword } from '../../services/actions/forgot-password';

import styles from './index.module.css';

interface StateType {
  from: string;
}
 
const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector( (state:any) => state.auth.isAuth );
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const { state } = useLocation<StateType>();
  

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const handleButtonClick = () => {
    if (password && code) {
      dispatch(updatePassword(password, code));
    }
  }
  
  if (isAuth){
    return <Redirect to="/" />
  } else {
    if (state?.from === '/forgot-password'){
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
            <Button type="primary" size="medium" onClick={handleButtonClick}>Сохранить</Button>
            <div className={styles.bottom}>
              <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль?&nbsp;
                <Link to='/login' className={styles.link}>Войти</Link>
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />
    }
  }
}

export default ResetPasswordPage;