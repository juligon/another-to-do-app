import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import TasksList from "./components/tasksList/TasksList";
import FormManager from "./components/formManager/FormManager";
import Footer from "./components/footer/Footer";

function App() {
	const [tasks, setTasks] = useState([]);

  const handleSearchResults = (searchResults) => {
    setTasks(searchResults);
  };


	return (
		<>
			<Router>
				<Navbar onSearch={handleSearchResults}  />
				<Routes>
					<Route
						exact
						path="/"
						element={<TasksList tasks={tasks} />}
					/>
					<Route
						path="/tasks/create"
						element={<FormManager isEditMode={false} />}
					/>
					<Route
						path="/tasks/:id"
						element={<FormManager isEditMode={true} />}
					/>
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
