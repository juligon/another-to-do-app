/* eslint-disable react/prop-types */
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
import { BsPencil, BsTrash3, BsCheckCircle } from "react-icons/bs";

export default function ToDoList({ todos: initialTodos }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [todos, setTodos] = useState(initialTodos);


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

	useEffect(() => {
		setTodos(initialTodos);
	}, [initialTodos]);
	

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
									<span
										className={`status ${
											e.completed ? "completed" : "pending"
										} text-success float-end`}
									>
										{e.completed ? <BsCheckCircle /> : ""}
									</span>
								</div>
								<div className="card-body">
									<h5 className="card-title">{e.title}</h5>
									<p className="card-text">{e.description}</p>

									<div className="d-grid gap-2 d-md-flex justify-content-md-end">
										<button type="button" className="btn btn-outline-primary"
											style={{ border: "none", backgroundColor: "transparent" }}
										>
											<Link
												to={`/todos/${e.id}`}
												style={{
													textDecoration: "none",
												}}
											>
												<BsPencil />
											</Link>
										</button>

										<button
											type="button" className="btn btn-outline-danger"
											onClick={() => handleDelete(e.id)}
											style={{
												border: "none",
												backgroundColor: "transparent",
											}}
										>
											<BsTrash3 />
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
