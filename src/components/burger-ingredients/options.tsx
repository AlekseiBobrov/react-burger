import React from 'react';
import styles from './burger-ingredients.module.css';
import Ingredient from './ingredient';
import Separator from './separator';
import { data } from '../../utils/data.js'
import { dataEl } from '../../utils/types.js'

function Options() {
  const orderFunc = (a:dataEl, b:dataEl) : number => {
    const ORDER = ['bun', 'sauce', 'main'];
    const index_a = ORDER.indexOf(a.type);
    const index_b = ORDER.indexOf(b.type);
    if (index_a < index_b) { return -1; }
    if (index_a > index_b) { return 1; }
    return 0;
  }

  const SEP = [
    {id: 'bun', name: 'Булки'},
    {id: 'sauce', name: 'Соусы'},
    {id: 'main', name: 'Начинки'},
  ]

  const template = Object.fromEntries( Object.entries(data[0]).map( (k, v) => [k, (typeof v == 'string'?"":0)]) );
  let options = [ ...data ];
  options.sort(orderFunc);

  for (const sep of SEP) {
    const idx = options.findIndex( el => el.type === sep.id );
    options.splice(idx, 0, {...template, "_id":sep.id, "type":"separator", "name":sep.name});
  }
    
  return (
    <div className={styles.options}>
      {options.map( (el, i) =>
        el.type === "separator"?
        <Separator id={el._id} text={el.name} key={i}/>:
        <Ingredient
          img={el.image}
          price={el.price}
          name={el.name}
          count={1}
          key={el._id}
        />
      )}
    </div>
  );
}

export default Options;