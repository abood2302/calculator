import styles from '../styles/style.module.css'
import { useState } from 'react'
import Button from './api/button'

function Calculator () {
  const [memory, setMemory] = useState(0)
  const [totalOnScreen, setTotalOnScreen] = useState('0')
  const [op, setOp] = useState(null)

  // useEffect(() => {}, [op, totalOnScreen, memory])

  let temp
  const CalculatorOperations = {
    '/': (firstValue, secondValue) => firstValue / secondValue,
    '*': (firstValue, secondValue) => firstValue * secondValue,
    '+': (firstValue, secondValue) => firstValue + secondValue,
    '-': (firstValue, secondValue) => firstValue - secondValue,
    '=': (firstValue, secondValue) => (firstValue = secondValue),
    Enter: (firstValue, secondValue) => (firstValue = secondValue)
  }

  const performOperation = () => {
    temp = CalculatorOperations[op](
      parseFloat(memory),
      parseFloat(totalOnScreen)
    )

    setOp(null)
    setTotalOnScreen(temp)
  }

  const handleNum = number => {
    setTotalOnScreen(
      totalOnScreen === '0' ? String(number) : totalOnScreen + number
    )
  }

  const insertDot = () => {
    if (!/\./.test(totalOnScreen)) {
      setTotalOnScreen(totalOnScreen + '.')
    }
  }
  const percentage = () => {
    setTotalOnScreen(parseFloat(totalOnScreen) / 100)
    if (memory && totalOnScreen === '') {
      setMemory(parseFloat(memory) / 100)
    }
  }

  const deleteLastNumber = () => {
    setTotalOnScreen(totalOnScreen.slice(0, -1))
  }
  const clearData = () => {
    setTotalOnScreen('0')
    setMemory(0)
  }

  const handleOperation = value => {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10))
    } else if (value in CalculatorOperations) {
      if (op === null) {
        setOp(value)
        setMemory(totalOnScreen)
        setTotalOnScreen('')
      }

      if (op) {
        setOp(value)
      }

      if (memory && op && totalOnScreen) {
        performOperation()
      }
    } else if (value === 'c') {
      clearData()
    } else if (value === 'del') {
      deleteLastNumber()
    } else if (value === '.') {
      insertDot()
    } else if (value === '%') {
      percentage()
    }
  }

  function keyHandler (e) {
    switch (+e.key) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 0:
        handleOperation(+e.key)
    }
    switch (e.key) {
      case 'c':
        clearData(e.key)
        break
      case 'Backspace':
        deleteLastNumber()
        break
      case '.':
        insertDot()
        break
      case '+':
      case '-':
      case '*':
      case '/':
        handleOperation(e.key)
        break
      case '%':
        percentage()
        break
      case '=':
      case 'Enter':
        handleOperation(e.key)
    }
  }
  if (typeof window != 'undefined') {
    window.addEventListener('keyup', keyHandler)
  }

  return (
    <div className={styles.container}>
      <div className={styles.calc}>
        <span className={styles.output}>{totalOnScreen} </span>
        <Button keyValue={'c'} onClick={handleOperation} />
        <Button keyValue={'del'} onClick={handleOperation} />
        <Button keyValue={'%'} onClick={handleOperation} />
        <Button keyValue={'/'} onClick={handleOperation} />
        <Button keyValue={7} onClick={handleOperation} />
        <Button keyValue={8} onClick={handleOperation} />
        <Button keyValue={9} onClick={handleOperation} />
        <Button keyValue={'*'} onClick={handleOperation} />
        <Button keyValue={4} onClick={handleOperation} />
        <Button keyValue={5} onClick={handleOperation} />
        <Button keyValue={6} onClick={handleOperation} />
        <Button keyValue={'-'} onClick={handleOperation} />
        <Button keyValue={1} onClick={handleOperation} />
        <Button keyValue={2} onClick={handleOperation} />
        <Button keyValue={3} onClick={handleOperation} />
        <Button keyValue={'+'} onClick={handleOperation} />
        <Button keyValue={'.'} onClick={handleOperation} />
        <Button keyValue={0} onClick={handleOperation} />
        <Button
          className={styles.equals}
          keyValue={'='}
          onClick={handleOperation}
        />
      </div>
    </div>
  )
}
export default Calculator
