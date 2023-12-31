import { useRef, useState } from "react"
import styles from "./App.module.css"

const sendData = (formData) => {
	console.log(formData)
}

export const App = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [passwordError, setPasswordError] = useState(null)
	const [done, setDone] = useState(false)

	const btn = useRef(null)

 	const onSubmit = (event) => {
		event.preventDefault()

		if (password !== repeatPassword) {
			setPasswordError('Пароль не совпал с повтором')
		} else {
			setPasswordError(null)
		}

		if (done) {
			sendData({email, password, repeatPassword})
			setDone(false)
		}
	}

	const resetState = () => {
		setEmail('')
		setPassword('')
		setRepeatPassword('')
		setPasswordError(null)
	}

	const onEmailChange = ({ target }) => {
		setEmail(target.value)

		let newError = null

		if (!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(target.value)) {
			newError ='Некорректный email'
		}

		setPasswordError(newError)
	}

	const onPasswordChange = ({ target }) => {
        setPassword(target.value)

        let newError = null

        if (!/^[a-zA-Z0-9]+$/.test(target.value)) {
            newError = 'Пароль может содержать только буквы и цифры'
        } else if (target.value.length > 10) {
            newError = 'Пароль должен быть не больше 10 символов'
        }

		setPasswordError(newError)
    }

	const onPasswordBlur = ({ target }) => {
        if (target.value.length < 3) {
            setPasswordError('Неверный логин. Должно быть не меньше 3 символов')
        }
    }

	const onRepeatPasswordChange = ({ target }) => {
	    setRepeatPassword(target.value)
		if (password.length === target.value.length) {
			btn.current.focus()
		}
    }

	const onRepeatPasswordBluer = ({ target }) => {
        if (password.length === target.value.length) {
			setPasswordError(null)
			setDone(true)
		}
    }

	return (
		<div className={styles.app}>
			{passwordError && <div className={styles.errorLabel}>{passwordError}</div>}
			<form onSubmit={onSubmit} className={styles.form}>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Email@"
					onChange={onEmailChange}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				/>
				<input
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					placeholder="Повтор пароля"
					onChange={onRepeatPasswordChange}
					onBlur={onRepeatPasswordBluer}
				/>
				<button
				 type="button"
					className={styles.formBtnRed}
					onClick={resetState}
				>Сброс</button>
				<button
					type="submit"
					className={styles.formBtn}
					disabled={!!passwordError}
					ref={btn}
				>Зарегистрироваться</button>
			</form>
		</div>
	)
}
