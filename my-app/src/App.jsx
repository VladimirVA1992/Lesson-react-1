import React, { useState } from "react";
import styles from "./App.module.css"

export const App = () => {

	const NUMS = ['1','2','3','4','5','6','7','8','9','0']
	const OPERATORS = ['-','+','=','C']

	const [operand1, setOperand1] = useState('')
	const [operand2, setOperand2] = useState('')
	const [isOperator, setIsOperator] = useState(false)
	const [operator, setOperator] = useState('')
	const [calculatedOperator, setCalculatedOperator] = useState()
	const [currentValue, setCurrentValue] = useState('')
	const [result, setResult] = useState()
	const [isResult, setIsResult] = useState(false)

	const enterValue = (number) => {
		if (!isOperator) {
			setOperand1((prev) => prev + number)
			setCurrentValue(operand1 + number)
			return
		} else {
			setOperand2((prev) => prev + number)
			setCurrentValue(operand1 + operator + operand2 + number)
		}
	}

	const clearDate = () => {
		setOperator('')
		setIsOperator(false)
		setIsResult(false)
		setOperand1('')
		setOperand2('')
		setResult('')
		setCurrentValue('')
	}

	const addOperator = (operator) => {
		setIsOperator(true)
		setOperator(operator)

		if(operator === 'C') {
			clearDate()
			return
		}

		if(operator !== '=') {
			setCalculatedOperator(operator)
			setCurrentValue(operand1 + operator)
			return
		}

		setIsResult(true)

		switch(calculatedOperator) {
			case '+':
				setResult(Number(operand1) + Number(operand2))
			break
			case '-':
				setResult(Number(operand1) - Number(operand2))
			break
			default:
				console.log('текущий оператор ', calculatedOperator)
			break
		}
	}

	return (
		<div className={styles.app}>
			<div className={styles.calculator}>
				<div className={isResult ? styles.resultDone : styles.displayOutput} >{operator === '=' ? result : currentValue}</div>
				<div className={styles.actionsWrap}>
					<div className={styles.numbers}>
						{NUMS.map((item, index) => {
							return <button className={styles.btn} onClick={() => enterValue(item)} key={index * 33}>{item}</button>
						})}
					</div>
					<div className={styles.operators}>
						{OPERATORS.map((item, index) => {
							return <button className={styles.btn} onClick={() => addOperator(item)} key={index + 1 * 55}>{item}</button>
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
