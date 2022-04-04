import React from 'react';

import { IngredientsContext } from '../../services/appContext'

import styles from './burger-ingredients.module.css';
import Ingredient from './ingredient';
import Separator from './separator';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import type { IngredientShape, CartType } from '../../utils/types.js'

type TabType = 'Булки' | 'Соусы' | 'Начинки'
interface BurgerIngredientsProps {
  cart: CartType,
  setCart: (newCart: CartType) => void,
  current_tab: TabType,
}

type Sections = {
  'bun': React.ReactNode[] | null,
  'sauce': React.ReactNode[] | null,
  'main': React.ReactNode[] | null,
}

const Options = ({ cart, setCart, current_tab }: BurgerIngredientsProps) => {
  const { ingredients } = React.useContext(IngredientsContext);
  const [detailsIngredient, setDetailsIngredient] = React.useState<IngredientShape | null>(null);
  const [showDetails, setShowDetails] = React.useState(false);
  const bunRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const sauceRef = React.useRef<HTMLDivElement>(null);

  const tabScroll = (tab: TabType) => {
    switch (tab) {
      case 'Булки':
        if (bunRef.current) bunRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case 'Соусы':
        if (sauceRef.current) sauceRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case 'Начинки':
        if (mainRef.current) mainRef.current.scrollIntoView({behavior: "smooth"});
        break;
      default:
        break;
    }
  }

  React.useEffect(
    () => { tabScroll(current_tab) },
    [current_tab]
  )

  const handelIngredientClick = (id: string) => {
    let newIngredient = ingredients ? ingredients.find(el => el._id === id) : null;
    setDetailsIngredient(newIngredient ? newIngredient : null);
    setShowDetails(true);
  }

  const hideDetails = () => {
    setShowDetails(false);
    setDetailsIngredient(null);
  }



  const sections = { 'bun': null, 'sauce': null, 'main': null } as Sections;
  if (ingredients) {
    Object.keys(sections).forEach(section => {
      sections[section as keyof Sections] = ingredients.filter(el => el.type === section).map((el, i) =>
        <Ingredient
          id={el._id}
          img={el.image}
          price={el.price}
          name={el.name}
          count={[...cart.buns, ...cart.middle].filter(id => id === el._id).length}
          key={el._id}
          onClick={handelIngredientClick}
        />
      )
    })
  }

  return (
    <div className={styles.options}>
      {detailsIngredient && showDetails &&
      <Modal closeModal={hideDetails} className={styles["ingredient-details"]}>
        <IngredientDetails ingredient={detailsIngredient} />
      </Modal>
      }
      <Separator id="bun" text="Булки" ref={bunRef}/>
      {sections['bun']}
      <Separator id="sauce" text="Соусы"  ref={sauceRef}/>
      {sections['sauce']}
      <Separator id="main" text="Начинки" ref={mainRef}/>
      {sections['main']}
    </div>
  );
}

export default Options;