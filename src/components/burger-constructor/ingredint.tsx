import React from 'react';
import styles from './burger-constructor.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

interface dataEl {
  "_id": string,
  "name": string,
  "type": string,
  "proteins": number,
  "fat": number,
  "carbohydrates": number,
  "calories": number,
  "price": number,
  "image": string,
  "image_mobile": string,
  "image_large": string,
  "__v": number
}

interface IngredientProps {
  name: string;
  image: string;
  price: number;
  isLocked?: boolean;
  type?: "top" | "bottom";
}

function Ingredient(props: IngredientProps) {
  return (
    <li className={styles.ingredient}>
      {props.type ? <svg height={24} width={24}/> : <DragIcon type="primary" />}
      <ConstructorElement
        type={props.type}
        isLocked={props.type?true:props.isLocked}
        text={props.name}
        price={props.price}
        thumbnail={props.image}
      />
    </li>
  )
}

export default Ingredient
