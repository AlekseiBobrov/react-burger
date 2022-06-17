import { SWITCH_TAB, CLICK_TAB } from '../constants';
import { TTabActions } from '../actions';
import { ITabState } from '../../utils/types';

export const initialState: ITabState = {
    currentTab: 'Булки',
    isClick: false,
  };

export const tabReducer = (state = initialState, action:TTabActions): ITabState => {
  switch (action.type) {
    case SWITCH_TAB: {
      return { ...state, ...action.payload }
    }
    case CLICK_TAB: {
      return { ...state, ...action.payload }
    }
    default: {
      return state;
    }
  }
};