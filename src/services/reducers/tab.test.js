import { SWITCH_TAB, CLICK_TAB } from '../constants'
import { switchTab, clickTab } from '../actions/tab'
import { initialState, tabReducer as reducer } from './tab'


describe('Redux tab store', () => {
  
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('Should created SWITCH_TAB action with payload with passed tab as currentTab', () => {
    const tab = 'Соусы';
    const expectedAction = {
      type: SWITCH_TAB,
      payload: {
        currentTab: tab
      }
    };

    expect(switchTab(tab)).toEqual(expectedAction)
  })

  test('Should return state with passed tab as currentTab', () => {
    const tab = 'Соусы';
    const action = switchTab(tab);
    const expectedState = { ...initialState, currentTab: tab };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

  test('Should created CLICK_TAB action with payload with passed isClick value as isClick', () => {
    const isClick = true;
    const expectedAction = {
      type: CLICK_TAB,
      payload: {
        isClick: isClick
      }
    };

    expect(clickTab(isClick)).toEqual(expectedAction)
  })

  test('Should return state with passed isClick', () => {
    const isClick = true;
    const action = clickTab(isClick);
    const expectedState = { ...initialState, isClick: isClick };

    expect(reducer(initialState, action)).toEqual(expectedState);
  })

})