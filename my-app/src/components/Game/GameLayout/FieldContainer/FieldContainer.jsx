import { FieldLayout } from './FieldLayout/FieldLayout'
import PropTypes from 'prop-types'

export const FieldContainer = ({field, setField, currentPlayer, setCurrentPlayer, isGameEnded, setIsGameEnded, isDraw, setIsDraw}) => {

	const WIN_PATTERNS = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // Варианты побед по горизонтали
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // Варианты побед по вертикали
		[0, 4, 8], [2, 4, 6] // Варианты побед по диагонали
	]

	function turnPlayer(index) {
		if(isGameEnded) {
			return
		}

		if(isDraw) {
			return
		}


		if (field[index] === ''){
			field[index] = currentPlayer
			let nextPlayer = currentPlayer === 'X' ? '0' : 'X'
			setCurrentPlayer(nextPlayer)
		}

		for (let i = 0; WIN_PATTERNS.length > i; i += 1) {
			let chekcTurn = WIN_PATTERNS[i].every((item) => {
				return field[item] === currentPlayer
			})

			if(chekcTurn) {
				setCurrentPlayer((prev) => prev === 'X' ? '0' : 'X')
				setIsGameEnded(true)
				return
			}
		}

		let checkDraw = field.some((item) => {
			return item === ''
		})

		if(!checkDraw) {
			setIsDraw(true)
		}

		return setField(field)
	}

	return (
		<FieldLayout field={field} turnPlayer={turnPlayer}/>
	)
}

FieldContainer.propTypes = {
	field: PropTypes.array,
	currentPlayer: PropTypes.string,
	isGameEnded: PropTypes.bool,
	isDraw: PropTypes.bool,
}
