import React from 'react';
import styles from './burger-ingredients.module.css';

interface SeparatorProps {
  id: string;
  text: string;
}

function Separator(props: SeparatorProps) {
  return ( 
    <div id={props.id} className={"m-2 text text_type_main-medium " + styles.separator}>
        {props.text}
    </div>
  );
}

export default Separator;