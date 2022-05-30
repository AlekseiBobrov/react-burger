import { useRef, FC } from 'react'
import { useDispatch } from '../../utils/hooks';
import { useDrag, useDrop } from "react-dnd";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient } from '../../services/actions/cart';
import type { IngredientShape } from '../../utils/types.js'
import type { Identifier, XYCoord } from 'dnd-core'
import styles from './burger-constructor.module.css';

interface MiddleIngredientProps extends IngredientShape {
  id: string,
  orderIndex: number,
  moveCard: (dragIndex: number, hoverIndex: number) => void,
  isLocked?: boolean,
}

interface DragItem {
  orderIndex: number
  id: string
  type: string
}

const MiddleIngredient:FC<MiddleIngredientProps> = ({id, orderIndex, isLocked, moveCard, ...ingredient }) => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'middle',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.orderIndex
      const hoverIndex = orderIndex

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)

      item.orderIndex = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'middle',
    item: () => {
      return {id, orderIndex }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div
      className={styles.ingredient}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={isLocked}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch( removeIngredient(ingredient, orderIndex ) )}
      />
    </div>
  )
}//

export default MiddleIngredient
