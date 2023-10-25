/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import {
	getToDos,
	deleteToDo,
	updateToDo,
} from "../../services/todoController";
import { Link } from "react-router-dom";
import "./ToDoList.css";

export default function ToDoList() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		const fetchToDos = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await getToDos(signal);
				setTodos(response);
			} catch (error) {
				if (!signal.aborted) {
					setError(error);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchToDos();

		return () => {
			controller.abort();
		};
	}, []);

	const handleDelete = async (id) => {
		try {
			await deleteToDo(id);
			const newTodos = todos.filter((todo) => todo.id !== id);
			setTodos(newTodos);
		} catch (error) {
			console.error("Something went wrong", error);
		}
	};

	return (
		<>
			<div
				className="container-fluid bg-dark text-light"
				style={{ paddingTop: "5rem", paddingBottom: "2.5rem" }}
			>
				{loading && (
					<div className="loader-container">
						<div className="spinner-border text-secondary m-5" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				)}
				{error && <p>Error: {error.message}</p>}
				{!loading &&
					!error &&
					todos?.map((e) => {
						return (
							<div
								className="card text-bg-dark border-secondary mb-3"
								key={e.id}
							>
								<div className="card-header border-bottom border-secondary">
									{e.category}
								</div>
								<div className="card-body">
									<h5 className="card-title">{e.title}</h5>
									<p className="card-text">{e.description}</p>
									<p
										className={`status ${
											e.completed ? "completed" : "pending"
										} small text-secondary`}
									>
										{e.completed ? "Completed" : ""}
									</p>
									<div className="d-grid gap-2 d-md-flex justify-content-md-end">
										<Link
											className="btn btn-outline-primary me-md-2"
											type="button"
											to={`/todos/${e.id}`}
											style={{
												textDecoration: "none",
											}}
										>
											Edit
										</Link>

										<button
											className="btn btn-outline-danger"
											type="button"
											onClick={() => handleDelete(e.id)}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
}
