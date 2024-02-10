import { useParams } from "react-router-dom"

export const Page404 = () => {

	const params = useParams()

	return (
		<div>
			{`Такой страницы нет "${params['*']}"`}
		</div>
	)
}
