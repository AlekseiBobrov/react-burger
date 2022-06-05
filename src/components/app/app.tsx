import React, { FC } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';

import { getIngredients } from '../../services/actions/ingredients';
import { getUserData } from '../../services/actions/auth';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import { MainPage, FeedPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFound404 } from '../pages'
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderInfo from '../order-info/order-info';
import { RootState } from '../../utils/types';
import styles from './app.module.css';

import { Location } from "history";
interface LocationState {
  background: Location
}

const App: FC = () => {
  const { ingredients } = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      dispatch(getIngredients());
      dispatch(getUserData());
    },
    [dispatch]
  );

  const hideModal = () => {
    history.goBack();
  }

  const history = useHistory();
  const location = useLocation<LocationState>();
  const background = location.state?.background;

  if (ingredients) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Switch location={background || location} >
          <Route exact path="/">
            <DndProvider backend={HTML5Backend}>
              <MainPage />
            </DndProvider>
          </Route>
          <Route exact path="/feed">
            <FeedPage />
          </Route>
          <Route exact path='/feed/:id'>
            <main>
              <OrderInfo />
            </main>
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route exact path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute exact path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/orders">
            <NotFound404 />
          </ProtectedRoute>
          <Route exact path='/ingredients/:ingredientId'>
            <IngredientDetails />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>

        {background && (
          <>
            <Route path='/ingredients/:ingredientId'>
              <Modal closeModal={hideModal} className={styles["ingredient-details"]}>
                <IngredientDetails />
              </Modal>
            </Route>
            <Route path='/feed/:id'>
              <Modal closeModal={hideModal} className={styles.order_info}>
                <OrderInfo />
              </Modal>
            </Route>
          </>
        )}

      </div>
    );
  } else {
    return (
      <div className={styles.app}>
        <AppHeader />
      </div>
    )
  }
}

export default App;
