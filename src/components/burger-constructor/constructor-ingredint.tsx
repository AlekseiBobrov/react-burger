import styles from './burger-constructor.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

interface IngredientProps {
  _id: string;
  name: string;
  image: string;
  price: number;
  isLocked?: boolean;
  type?: "top" | "bottom";
}

const ConstructorIngredient = (props: IngredientProps) => {
  const add_name = props.type?(props.type === "top"?" (верх)":" (низ)"):"";
  return (
    <div className={styles.ingredient}>
      {props.type ? <svg height={24} width={24}/> : <DragIcon type="primary" />}
      <ConstructorElement
        type={props.type}
        isLocked={props.type?true:props.isLocked}
        text={props.name + add_name}
        price={props.price}
        thumbnail={props.image}
      />
    </div>
  )
}

export default ConstructorIngredient
