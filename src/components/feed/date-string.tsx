import { FC } from 'react'
import { addZero } from '../../utils'

interface IDateStringProps{
    sdate: string;
}

const DateString: FC<IDateStringProps> = ({sdate}) => {
    const date = new Date(sdate);
    const time = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`
    const offset = (new Date().setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0))/86400000;
    const stringOffset = offset <= 1?"Сегодня":offset <= 2?"Вчера":`${offset} дня назад`;

    return (
        <p className="text text_type_main-default text_color_inactive">
            {`${stringOffset}, ${time} i-GMT+3`}
        </p>
    )
}

export default DateString