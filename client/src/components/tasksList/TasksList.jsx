/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import {
	getTasks,
	updateTask,
	deleteTask
} from "../../services/taskController";
import { Link } from "react-router-dom";
import "./TasksList.css";
import { BsPencil, BsTrash3, BsCheckCircle } from "react-icons/bs";

export default function TasksList({ tasks: initialTasks }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [tasks, setTasks] = useState(initialTasks);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		const fetchTasks = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await getTasks(signal);
				setTasks(response);
			} catch (error) {
				if (!signal.aborted) {
					setError(error);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchTasks();

		return () => {
			controller.abort();
		};
	}, []);

	const handleDelete = async (id) => {
		try {
			await deleteTask(id);
			const newTasks = tasks.filter((task) => task.id !== id);
			setTasks(newTasks);
		} catch (error) {
			console.error("Something went wrong", error);
		}
	};

	useEffect(() => {
		setTasks(initialTasks);
	}, [initialTasks]);

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
					tasks?.map((e) => {
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

									<div className="d-grid gap-2 d-flex justify-content-end">
										<button
											type="button"
											className="btn btn-outline-primary"
											style={{ border: "none", backgroundColor: "transparent" }}
										>
											<Link
												to={`/tasks/${e.id}`}
												style={{
													textDecoration: "none",
												}}
											>
												<BsPencil />
											</Link>
										</button>

										<button
											type="button"
											className="btn btn-outline-danger"
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
