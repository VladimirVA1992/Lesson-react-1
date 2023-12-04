import logo from "./logo.svg";
import "./App.css";

//Тут все в декларативном стиле, только одна строчка подподает под описания императивного стиля
export const App = () => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					{/*Это императивный стиль в описании*/}
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<p>Текущий год {currentYear}</p>
			</header>
		</div>
	);
};
