import { SWITCH_TAB, CLICK_TAB } from '../constants';
import { TTabActions } from '../actions';
import { ITabState } from '../../utils/types';

const initialState: ITabState = {
    currentTab: 'Булки',
    isClick: false,
  };

export const tabReducer = (state = initialState, action:TTabActions): ITabState => {
  switch (action.type) {
    case SWITCH_TAB: {
      return { ...state, currentTab: action.tab}
    }
    case CLICK_TAB: {
      return { ...state, isClick: action.isClick}
    }
    default: {
      return state;
    }
  }
};