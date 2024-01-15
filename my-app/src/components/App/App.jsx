import { useEffect, useRef } from "react"
import styles from "./App.module.css"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const sendFormData = (formData) => {
    console.log(formData);
}

const fieldsSchema = yup.object()
    .shape({
        email: yup.string()
            .matches(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, 'Некорректный email'),
        password: yup.string()
            .matches(/^[a-zA-Z0-9]+$/, 'Пароль может содержать только латинские буквы и цифры')
            .min(3, 'Пароль должен быть не меньше 3 символов')
            .max(10, 'Пароль должен быть не больше 10 символов'),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password")], 'Пароли не совпадают')
            .required('Необходимо подтвердить пароль'),
})

export const App = () => {
	const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(fieldsSchema),
    })

	const btn = useRef(null)

    const resetForm = () => {
        reset()
	}

    const emailError = errors.email?.message
    const passwordError = errors.password?.message
    const confirmPasswordError = errors.confirmPassword?.message

	useEffect(() => {
		if(!confirmPasswordError) {
			btn.current.focus()
		}
	})

    return (
        <div className={styles.app}>
            <form onSubmit={handleSubmit(sendFormData)} className={styles.form}>
                <label
                    htmlFor="email"
                >
                    Email
                </label>
				<input
					type="email"
					name="email"
					placeholder="test@test.com"
					{...register('email')}
				/>
                {emailError && <div className={styles.errorLabel}>{emailError}</div>}
                <label
                    htmlFor="password"
                >
                    Пароль
                </label>
                <input
					type="password"
					name="password"
                    placeholder="***"
					{...register('password')}
				/>
                {passwordError && <div className={styles.errorLabel}>{passwordError}</div>}
                <label
                    htmlFor="confirmPassword"
                >
                    Повтор пароля
                </label>
                <input
					type="password"
					name="confirmPassword"
                    placeholder="***"
					{...register('confirmPassword')}
				/>
                {confirmPasswordError && <div className={styles.errorLabel}>{confirmPasswordError}</div>}
				<div className={styles.btnGroup}>
					<button
						type="submit"
						disabled={!!passwordError}
						className={styles.formBtn}
						ref={btn}
					>Зарегистрироваться</button>
					<button
					type="button"
						className={styles.formBtnRed}
						onClick={resetForm}
					>Сброс</button>
				</div>
            </form>
        </div>
    )
}
