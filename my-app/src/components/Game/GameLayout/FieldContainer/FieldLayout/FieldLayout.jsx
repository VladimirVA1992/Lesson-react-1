import styles from './FieldLayout.module.css'
import PropTypes from 'prop-types'

export const FieldLayout = ({field, turnPlayer}) => {
	return (
		<div className={styles.board}>
			{field.map((item, index) => {
				return <button
						className={styles.cell}
						key={Date.now() + index}
						onClick={() => turnPlayer(index)}
						>
						{item}
					</button>
				})
			}
		</div>
	)
}

FieldLayout.propTypes = {
	field: PropTypes.array,
	turnPlayer: PropTypes.func,
}
