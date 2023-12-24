import React, { useState } from "react";
import styles from "./Game.module.css"
import { FieldContainer } from "./GameLayout/FieldContainer/FieldContainer";
import { InformationContainer } from "./GameLayout/InformationContainer/InformationContainer";

export const Game = () => {

	const [currentPlayer, setCurrentPlayer] = useState('X')
	const [isGameEnded, setIsGameEnded] = useState(false)
	const [isDraw, setIsDraw] = useState(false)
	const [field, setField] = useState(['','','','','','','','',''])

	function clear() {
		setCurrentPlayer('X')
		setIsGameEnded(false)
		setIsDraw(false)
		setField(['','','','','','','','',''])
	}

	return (
		<div className={styles.Game}>
			<InformationContainer
			 	currentPlayer={currentPlayer}
				setCurrentPlayer={setCurrentPlayer}
				isDraw={isDraw}
				setIsDraw={setIsDraw}
				isGameEnded={isGameEnded}
				setIsGameEnded={setIsGameEnded}
			/>
			<FieldContainer
				field={field}
				setField={setField}
				currentPlayer={currentPlayer}
				setCurrentPlayer={setCurrentPlayer}
				isGameEnded={isGameEnded}
				setIsGameEnded={setIsGameEnded}
				isDraw={isDraw}
				setIsDraw={setIsDraw}
			/>
			<button className={styles.Btn} onClick={clear}>Начать занового</button>
		</div>
	);
}
