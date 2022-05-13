import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {SWITCH_TAB, CLICK_TAB } from '../../services/actions'; // DISPLAY_INGREDIENT, HIDE_INGREDIENT, 

import Ingredient from './ingredient';
import Separator from './separator';

import type { IngredientShape } from '../../utils/types.js'
import styles from './burger-ingredients.module.css';

type TabType = 'Булки' | 'Соусы' | 'Начинки'

type Sections = {
  'bun': React.ReactNode[] | null,
  'sauce': React.ReactNode[] | null,
  'main': React.ReactNode[] | null,
}

const Options = () => {

  const { ingredients } = useSelector((state: any) => state.menu);
  const { cart } = useSelector((state: any) => state);
  const { currentTab, tabClick } = useSelector((state: any) => state.tab);
  const dispatch = useDispatch();

  const bunRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const sauceRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const switchTab = () => {
    const containerTop = containerRef.current ? containerRef.current.getBoundingClientRect().top : 0;
    const distance = [
      ['Булки', Math.abs(containerTop - (bunRef.current ? bunRef.current.getBoundingClientRect().top : 0))],
      ['Соусы', Math.abs(containerTop - (sauceRef.current ? sauceRef.current.getBoundingClientRect().top : 0))],
      ['Начинки', Math.abs(containerTop - (mainRef.current ? mainRef.current.getBoundingClientRect().top : 0))],
    ]
    const tab = distance.reduce((min, el) => el[1] < min[1] ? el : min, ['', window.innerHeight])[0];
    dispatch({
      type: SWITCH_TAB,
      tab
    })
  }

  React.useEffect(
    () => {
      containerRef.current?.addEventListener("scroll", switchTab);
      return () => {
        containerRef.current?.removeEventListener("scroll", switchTab)
      }
    },
    []
  )

  const tabScroll = (tab: TabType, isClick: boolean) => {
    if (isClick) {
      switch (tab) {
        case 'Булки':
          bunRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        case 'Соусы':
          sauceRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        case 'Начинки':
          mainRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        default:
          break;
      }
      dispatch({
        type: CLICK_TAB,
        isClick: false,
      })
    }
  }

  React.useEffect(
    () => { tabScroll(currentTab, tabClick) },
    [currentTab]
  )
  const sections = { 'bun': null, 'sauce': null, 'main': null } as Sections;
  if (ingredients) {
    Object.keys(sections).forEach(section => {
      sections[section as keyof Sections] = ingredients.filter((el: IngredientShape) => el.type === section).map((el: IngredientShape, i: number) =>
        <Ingredient
          {...el}
          count={[...cart.buns, ...cart.middle].filter(item => item._id === el._id).length}
          key={el._id}
        />
      )
    })
  }

  return (
    <div className={styles.options} ref={containerRef}>

      <Separator id="bun" text="Булки" ref={bunRef} />
      {sections['bun']}
      <Separator id="sauce" text="Соусы" ref={sauceRef} />
      {sections['sauce']}
      <Separator id="main" text="Начинки" ref={mainRef} />
      {sections['main']}
    </div>
  );
}

export default Options;