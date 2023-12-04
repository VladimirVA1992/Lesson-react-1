import logo from "./logo.svg";
import "./App.css";

//Тут все в декларативном стиле, только одна строчка подподает под описания императивного стиля, и тег а, но я в этом не уверен
export const App = () => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const DOC = document;

	const createTagP = () => {
		return DOC.createElement("p");
	};

	// return (
	// 	<div className="App">
	// 		<header className="App-header">
	// 			<img src={logo} className="App-logo" alt="logo" />
	// 			<p>
	// 				{/*Это императивный стиль в описании*/}
	// 				Edit <code>src/App.js</code> and save to reload.
	// 			</p>
	// 			<a
	// 				className="App-link"
	// 				href="https://reactjs.org"
	// 				target="_blank"
	// 				rel="noopener noreferrer"
	// 			>
	// 				Learn React
	// 			</a>
	// 			<p>Текущий год {currentYear}</p>
	// 		</header>
	// 	</div>
	// );

	const container = DOC.createElement("div");
	container.classList.add("App");

	const appHeader = DOC.createElement("header");
	appHeader.classList.add("App-header");

	const appImg = DOC.createElement("img");
	appImg.classList.add("App-logo");
	appImg.src = `${logo}`;
	appImg.alt = "logo";

	const appPNote = createTagP();
	appPNote.textContent = "Edit src/App.js and save to reload.";

	const appLink = DOC.createElement("a");
	appLink.classList.add("App-link");
	appLink.href = "https://reactjs.org";
	appLink.target = "_blank";
	appLink.rel = "noopener noreferer";
	appLink.textContent = "Learn React";

	const appCurrentDateP = createTagP();
	appCurrentDateP.textContent = `Текущий год ${currentYear}`;

	DOC.body.append(container);
	container.append(appHeader);
	appHeader.append(appImg, appPNote, appLink, appCurrentDateP);
};
