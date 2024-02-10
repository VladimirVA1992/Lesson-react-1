import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState} from "react"
import styles from './Task.module.css'

export const Task = () => {
	const [todo, setTodo] = useState([])
	const params = useParams()
	const [todoValueUpdete, setTodoValueUpdete] = useState()
	const [isUpdating, setIsUpdating] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [refreshTodos, setRefreshTodos] = useState(false)

	const navigate = useNavigate()

	const popup = useRef(null)

	useEffect(() => {
		fetch(`http://localhost:3004/mybase/${params.id}`)
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodo(response)
			})
	})

	const openPopup = () => {
		let popupVision = popup //document.querySelector('[data-popup]')
		popupVision.current.setAttribute('data-popup', 'popupOpen')
	}

	const closePopup = () => {
		let popupVision = popup //document.querySelector('[data-popup]')
		popupVision.current.setAttribute('data-popup', 'popupClose')
	}

	const updateTodo = (id, newText) => {
        setIsUpdating(true)

        fetch(`http://localhost:3004/mybase/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
				id: id,
				text: newText,
            }),
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                setRefreshTodos(!refreshTodos)
            })
            .finally(() => setIsUpdating(false))
    }

	const deleteTodo = (id) => {
        setIsDeleting(true);

        fetch(`http://localhost:3004/mybase/${id}`, {
            method: 'DELETE',
        })
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsDeleting(false))

		navigate(-1)
    }

	return (
		<div className={styles.task}>
			<p>
				{todo.text}
			</p>

			<div className={styles.actionBlock}>
				<button className={styles.updateBtn} disabled={isUpdating} onClick={() => openPopup()}>Обновить</button>
				<button className={styles.deleteBtn} disabled={isDeleting} onClick={() => deleteTodo(todo.id)}>Удалить</button>
				<button className={styles.updateBtn}  onClick={() => navigate(-1)}>Назад</button>
			</div>


			<form data-popup="popupClose" ref={popup}>
				<input
					type="text"
					value={todoValueUpdete}
					onChange={({ target }) => setTodoValueUpdete(target.value)}
					placeholder="Ведиде новый текст"
					className={styles.inputUpdatePopup}
				/>

				<button
					className={styles.updateBtn}
					type="submit"
					onClick={() => updateTodo(todo.id, todoValueUpdete)}
				>Обновить</button>

				<button
					className={styles.deleteBtn}
					type="button"
					onClick={closePopup}
				>Закрыть</button>
			</form>
		</div>

	)
}
