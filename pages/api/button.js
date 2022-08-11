import React from 'react'

import style from '../../styles/style.module.css'
function CalculatorKey (props) {
  return (
    <button className={style.btn} onClick={() => props.onClick(props.keyValue)}>
      {props.keyValue}{' '}
    </button>
  )
}

export default CalculatorKey
