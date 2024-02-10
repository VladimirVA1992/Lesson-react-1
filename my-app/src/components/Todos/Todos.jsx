import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import styles from "./Todos.module.css"

export const Todos = () => {
	const [todos, setTodos] = useState([])
	const [sortedTodos, setSortedTodos] = useState([])
	const [isSort, setIsSort] = useState(false)
	const [isCreating, setIsCreating] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [refreshTodos, setRefreshTodos] = useState(false)
	const [todoValue, setTodoValue] = useState("")

	useEffect(() => {
		setIsLoading(true);

		fetch(`http://localhost:3004/mybase`)
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodos(response)
			})
			.finally(() => setIsLoading(false))
	}, [refreshTodos])

	const addTodo = (e, todoValue) => {
		e.preventDefault();
        setIsCreating(true)

		const newId = Date.now()

        fetch('http://localhost:3004/mybase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
				id: String(newId),
				text: todoValue,
            }),
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                setRefreshTodos(!refreshTodos);
            })
            .finally(() => setIsCreating(false))
    }

	const sortTodoInAlphabetically = () => {

		const copyProduts = [...todos]
		const sortedTexts = copyProduts.sort((a, b) => {
			return a.text.localeCompare(b.text)
	 	})

		setIsSort(!isSort)

		setSortedTodos(sortedTexts)
	}

	const seachTodo = (value) => {
		let ulList = document.querySelectorAll('li')

		for (let node of ulList) {
			node.textContent.includes(value) ? node.style.display = "flex" : node.style.display = "none"
		}
	}


	return (
		<div>
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
			<h2>Список дел</h2>
			<ul className={styles.todo}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					isSort ? sortedTodos.map(({ id, text }) => (
						<Link to={`/task/${id}`} className={styles.todoItem} key={id}><li className={styles.todoText}>{text}</li></Link>
						))
					: 	todos.map(({ id, text }) => (
						<Link to={`/task/${id}`} className={styles.todoItem} key={id}><li className={styles.todoText}>{text}</li></Link>
						))
				)}
			</ul>
		</div>
	)
}
