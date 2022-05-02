import React, { useEffect, useState } from 'react'
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/forgot-password';

import styles from './index.module.css';

interface StateType {
  from: string;
}

const ForgotPasswordPage = () => {
  const { state } = useLocation<StateType>();
  const dispatch = useDispatch();
  const isAuth = useSelector( (state:any) => state.auth.isAuth );
  const history = useHistory();
  const [email, setEmail] = useState('');
  const { message } = useSelector((state: any) => state.reset);
  
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  useEffect(() => {
    if (message) {
      history.replace({ pathname: '/reset-password', state: { from: '/forgot-password' } })
    }
  },
    [message]
  )

  const handleButtonClick = () => {
    if (email) {
      dispatch(resetPassword(email))
    }
  }

  if (isAuth){
    return <Redirect to="/" />
  } else {
    if (state?.from === '/login'){
      return (
        <div className="page">
          <div className={styles.container}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <Input type="email" onChange={onChangeEmail} value={email} name={'email'} placeholder="Укажите e-mail" />
            <Button type="primary" size="medium" onClick={handleButtonClick}>Восстановить</Button>
            <div className={styles.bottom}>
              <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль?&nbsp;
                <Link to='/login' className='link-nodecoration'>Войти</Link>
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

export default ForgotPasswordPage;