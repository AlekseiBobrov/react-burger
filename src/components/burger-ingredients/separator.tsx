import React from 'react';
import styles from './burger-ingredients.module.css';

interface SeparatorProps {
  id: string;
  text: string;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>((props, ref) => {
  return ( 
    <div id={props.id} className={"m-2 text text_type_main-medium " + styles.separator} ref={ref}>
        {props.text}
    </div>
  );
});

export default Separator;