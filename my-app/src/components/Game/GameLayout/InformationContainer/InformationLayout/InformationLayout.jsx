import styles from './InformationLayout.module.css'
import PropTypes from 'prop-types'

export const InformationLayout = ({currentPlayer, isDraw, isGameEnded}) => {
	return (
		<>
			{!isDraw && !isGameEnded && <p className={styles.info}>Сейчас ходит игрок "{currentPlayer}"</p>}
			{!isDraw && isGameEnded && <p className={styles.info}>Победа: "{currentPlayer}"</p>}
			{isDraw && !isGameEnded && <p className={styles.info}>Ничья</p>}
		</>
	)
}

InformationLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
}
