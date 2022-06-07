import { SWITCH_TAB, CLICK_TAB } from '../constants';
import type { TabType } from '../../utils/types.js'

interface ISwitchTabAction {
    readonly type: typeof SWITCH_TAB;
    readonly tab: TabType;
}

interface IClickTabAction {
    readonly type: typeof CLICK_TAB;
    readonly isClick: boolean;
}

export type TTabActions = 
|ISwitchTabAction
|IClickTabAction;

export const switchTab = (tab: TabType): ISwitchTabAction => ({
    type: SWITCH_TAB,
    tab
})

export const clickTab = (isClick: boolean): IClickTabAction => ({
    type: CLICK_TAB,
    isClick
})