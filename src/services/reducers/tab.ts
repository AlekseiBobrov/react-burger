import { SWITCH_TAB, CLICK_TAB } from '../constants';
import { TTabActions } from '../actions';
import { TabState } from '../../utils/types';

const initialState: TabState = {
    currentTab: 'Булки',
    isClick: false,
  };

export const tabReducer = (state = initialState, action:TTabActions): TabState => {
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