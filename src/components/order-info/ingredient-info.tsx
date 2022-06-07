import { FC } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-info.module.css'

interface IngredientInfoProps{
    img: string;
    name: string;
    count: number;
    price?: number;
}

const IngredientInfo: FC<IngredientInfoProps> = ({img, name, count, price}) =>{
    return(
        <div className={styles.ingredient}>
            <div className={styles.iicon}>
                <img src={img} />
            </div>
            <p className={`text text_type_main-default ${styles.iname}`}>
                {name}
            </p>
            <div className={styles.iprice}>
                <p className="text text_type_digits-default">{count} x {price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}

export default IngredientInfo