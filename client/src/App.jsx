import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ToDoList from "./components/toDoList/ToDoList";
import FormManager from "./components/formManager/FormManager";
import Footer from "./components/footer/Footer";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<ToDoList />} />
					<Route
						path="/todos/create"
						element={<FormManager isEditMode={false} />}
					/>
					<Route
						path="/todos/:id"
						element={<FormManager isEditMode={true} />}
					/>
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
