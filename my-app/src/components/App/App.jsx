import { useEffect, useState } from "react"
import styles from "./App.module.css"

export const App = () => {
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);

		setTimeout(() => {
			fetch('https://jsonplaceholder.typicode.com/todos')
				.then((loadedData) => loadedData.json())
				.then((loadedProducts) => {
					setProducts(loadedProducts);
				})
				.finally(() => setIsLoading(false))
		}, 3000)
    }, [])

    return (
        <div className={styles.app}>
			<h1>Список дел</h1>
			<ul className={styles.todo}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				products.map(({ id, title }) => (
					<li key={id} className={styles.todoItem}>
						{title}
					</li>
				))
			)}
			</ul>
		</div>
    )
}
