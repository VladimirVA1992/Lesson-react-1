import { useEffect, useState } from "react"
import styles from "./App.module.css"
import {ref, onValue, push, set, remove} from 'firebase/database'
import { db } from '../../firebase'

export const App = () => {
	const [products, setProducts] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [isCreating, setIsCreating] = useState(false)
	const [todoValue, setTodoValue] = useState("")
	const [isUpdating, setIsUpdating] = useState(false)
	const [todoValueUpdete, setTodoValueUpdete] = useState()
	const [isDeleting, setIsDeleting] = useState(false)
	const [isSort, setIsSort] = useState(false)
	const [sortedProducts, setSortedProducts] = useState([])

    useEffect(() => {
		const productDbRef = ref(db, 'products')

		return onValue(productDbRef, (snapshort) => {
			const loadedProducts = snapshort.val() || {}

			setProducts(loadedProducts)
			setIsLoading(false)
		})
    }, [])

	const addTodo = (e, todoValue) => {
		e.preventDefault();
        setIsCreating(true)

		const newId = Date.now()

		const productDbRef = ref(db, 'products')

		push(productDbRef, {
			id: String(newId),
			text: todoValue,
		})
			.then((response) => {
				console.log('Новоя задача добавлена', response)
			})
			.finally(() => setIsCreating(false))
    }

	const updateTodo = (id, newText) => {
        setIsUpdating(true)

		const productDbRef = ref(db, `products/${id}`)

		set(productDbRef, {
			id: id,
			text: newText,
		})
			.then((response) => {
					console.log('Задача обновлена', response)
			})
			.finally(() => {
					setIsUpdating(false);
			})
	}

	const deleteTodo = (id) => {
        setIsDeleting(true)

		const productDbRef = ref(db, `products/${id}`)

		remove(productDbRef)
				.then((response) => {
					console.log('Задача удалена', response)
				})
				.finally(() => {
					setIsDeleting(false)
				})
    }

	const openPopup = (id) => {
		let popupVision = document.querySelector('[data-popup]')
		let btnUpdate = document.querySelector('.updateBtnAction')
		btnUpdate.id = id
		popupVision.setAttribute('data-popup', 'popupOpen')
	}

	const closePopup = () => {
		let popupVision = document.querySelector('[data-popup]')
		popupVision.setAttribute('data-popup', 'popupClose')
	}

	const sortTodoInAlphabetically = () => {

		let timleslArr = []
		Object.entries(products).map(([id, { text }]) => timleslArr.push({id, text}))

		const sortedTexts = timleslArr.sort((a, b) => {
			return a.text.localeCompare(b.text)
	 	})

		setIsSort(!isSort)

		setSortedProducts(sortedTexts)
	}

	const seachTodo = (value) => {
		let ulList = document.querySelectorAll('li')

		for (let node of ulList) {
			node.textContent.includes(value) ? node.style.display = "flex" : node.style.display = "none"
		}
	}

    return (
        <div className={styles.app}>
			<h1>Список дел</h1>
			<form className={styles.createTodoForm} onSubmit={(e) => addTodo(e, todoValue)}>
				<input
					type="text"
					placeholder="Новая задача"
					value={todoValue}
					onChange={({ target }) => setTodoValue(target.value)}
					className={styles.inputCreate}
				/>
				<button
					type="submit"
					disabled={isCreating}
					className={styles.createBtn}
				 >Добавить задачу</button>
			</form>
			<h2>Сортировка</h2>
			<form className={styles.formSort}>
				<input
					type="text"
					className={styles.inputSearch}
					placeholder="Поиск задач по фразе"
					onChange={({ target }) => seachTodo(target.value)}
				/>
				<button
					type="button"
					className={isSort ? styles.btnSearchActive : styles.btnSearch}
					onClick={sortTodoInAlphabetically}
				>По алфовиту</button>
			</form>
			<ul className={styles.todo}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				isSort ? Object.entries(sortedProducts).map(([id, { text }]) => (
						<li key={id} className={styles.todoItem}>
							{text}
							<div className={styles.btnBlockAction}>
								<button className={styles.updateBtn} disabled={isUpdating} data-id={id} onClick={({ target }) => openPopup(target.dataset.id)}>Обновить</button>
								<button className={styles.deleteBtn} disabled={isDeleting} onClick={() => deleteTodo(id)}>Удалить</button>
							</div>
						</li>
					))
				: 	Object.entries(products).map(([id, { text }]) => (
						<li key={id} className={styles.todoItem}>
							{text}
							<div className={styles.btnBlockAction}>
								<button className={styles.updateBtn} disabled={isUpdating} data-id={id} onClick={({ target }) => openPopup(target.dataset.id)}>Обновить</button>
								<button className={styles.deleteBtn} disabled={isDeleting} onClick={() => deleteTodo(id)}>Удалить</button>
							</div>
						</li>
					))
			)}
			</ul>
			<div>
				<form data-popup="popupClose">
					<input
						type="text"
						value={todoValueUpdete}
						onChange={({ target }) => setTodoValueUpdete(target.value)}
						placeholder="Ведиде новый текст"
						className={styles.inputUpdatePopup}
					/>
					<button type="submit" onClick={({ target }) => updateTodo(target.id, todoValueUpdete)} className="updateBtnAction">Обновить</button>
					<button type="button" onClick={closePopup}>Закрыть</button>
				</form>
			</div>
		</div>
    )
}
