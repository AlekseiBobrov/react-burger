import React, { FC } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks';

import {switchTab, clickTab } from '../../services/actions/tab'; // DISPLAY_INGREDIENT, HIDE_INGREDIENT, 

import Ingredient from './ingredient';
import Separator from './separator';

import type { IngredientShape, TabType, RootState } from '../../utils/types.js'
import styles from './burger-ingredients.module.css';

type Sections = {
  'bun': React.ReactNode[] | null,
  'sauce': React.ReactNode[] | null,
  'main': React.ReactNode[] | null,
}

const Options: FC = () => {

  const { ingredients } = useSelector((state: RootState) => state.menu);
  const { cart } = useSelector((state: RootState) => state);
  const { currentTab, isClick } = useSelector((state: RootState) => state.tab);
  const dispatch = useDispatch();

  const bunRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const sauceRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const switchTabOnScroll = () => {
    const containerTop = containerRef.current ? containerRef.current.getBoundingClientRect().top : 0;
    const distance = [
      ['Булки', Math.abs(containerTop - (bunRef.current ? bunRef.current.getBoundingClientRect().top : 0))],
      ['Соусы', Math.abs(containerTop - (sauceRef.current ? sauceRef.current.getBoundingClientRect().top : 0))],
      ['Начинки', Math.abs(containerTop - (mainRef.current ? mainRef.current.getBoundingClientRect().top : 0))],
    ]
    const tab = distance.reduce((min, el) => el[1] < min[1] ? el : min, ['', window.innerHeight])[0] as TabType;
    dispatch( switchTab(tab) )
  }

  React.useEffect(
    () => {
      containerRef.current?.addEventListener("scroll", switchTabOnScroll);
      return () => {
        containerRef.current?.removeEventListener("scroll", switchTabOnScroll)
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
      dispatch( clickTab(false) )
    }
  }

  React.useEffect(
    () => { tabScroll(currentTab, isClick) },
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