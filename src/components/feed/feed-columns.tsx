import { FC } from 'react'

import styles from './feed-info.module.css'

interface IFeedColumnProps {
    title: string;
    orders: number[];
}

const FeedColumns: FC<IFeedColumnProps> = ({title, orders}) => {
    const numbers = orders.map( (el, i) => <p className="text text_type_digits-default" key={i}>{el}</p>)
    return (
        <div className={styles.list}>
        <p className="text text_type_main-medium">
          {title}:
        </p>
        <div className={`${styles.columns} ${title==="Готовы"?styles.done:""}`}>
            {numbers}
        </div>
        </div>
    )
}

export default FeedColumns