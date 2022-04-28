import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/forgot-password';

import styles from './index.module.css';

const ForgotPasswordPage = () => {
  const history = useHistory()
  const [email, setEmail] = useState('');
  const { message } = useSelector((state: any) => state.reset);
  const dispatch = useDispatch();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  useEffect(() => {
    if (message) {
      history.replace({ pathname: '/reset-password' })
    }
  },
    [message]
  )

  const handelButtonClick = () => {
    if (email) {
      dispatch(resetPassword(email))
    }
  }

  return (
    <div className="page">
      <div className={styles.container}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input type="email" onChange={onChangeEmail} value={email} name={'email'} placeholder="Укажите e-mail" />
        <Button type="primary" size="medium" onClick={handelButtonClick}>Восстановить</Button>
        <div className={styles.bottom}>
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