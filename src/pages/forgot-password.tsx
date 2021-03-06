import React, { useEffect, useState, FC } from 'react'
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../utils/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordThunk } from '../services/actions/forgot-password';

import styles from './index.module.css';

interface StateType {
  from: string;
}

const ForgotPasswordPage: FC = () => {
  const { state } = useLocation<StateType>();
  const dispatch = useDispatch();
  const isAuth = useSelector( state => state.auth.isAuth );
  const history = useHistory();
  const [email, setEmail] = useState('');
  const { message } = useSelector(state => state.reset);
  
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

  const handleButtonClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email) {
      dispatch( resetPasswordThunk(email) )
    }
  }

  if (isAuth){
    return <Redirect to="/" />
  } else {
    if (state?.from === '/login'){
      return (
        <div className="page">
          <form className={styles.container}  onSubmit={handleButtonClick}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <Input type="email" onChange={onChangeEmail} value={email} name={'email'} placeholder="Укажите e-mail" />
            <Button type="primary" size="medium">Восстановить</Button>
            <div className={styles.bottom}>
              <p className="text text_type_main-default text_color_inactive">
                Вспомнили пароль?&nbsp;
                <Link to='/login' className='link-nodecoration'>Войти</Link>
              </p>
            </div>
          </form>
        </div>
      );
    } else {
      return <Redirect to="/login" />
    }
  }
}

export default ForgotPasswordPage;