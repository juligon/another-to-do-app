import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ToDoList from "./components/toDoList/ToDoList";
import FormManager from "./components/formManager/FormManager";
import Footer from "./components/footer/Footer";

function App() {
	const [todos, setTodos] = useState([]);

  const handleSearchResults = (searchResults) => {
    setTodos(searchResults);
  };


	return (
		<>
			<Router>
				<Navbar onSearch={handleSearchResults}  />
				<Routes>
					<Route
						exact
						path="/"
						element={<ToDoList todos={todos} />}
					/>
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
