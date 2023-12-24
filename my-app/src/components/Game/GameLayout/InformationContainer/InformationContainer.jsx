import { InformationLayout } from './InformationLayout/InformationLayout'
import PropTypes from 'prop-types'

export const InformationContainer = ({currentPlayer, isDraw, isGameEnded}) => {
	return (
		<InformationLayout currentPlayer={currentPlayer} isDraw={isDraw} isGameEnded={isGameEnded}/>
	)
}

InformationContainer.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
}
