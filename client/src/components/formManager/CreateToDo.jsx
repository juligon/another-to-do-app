/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { createToDo } from "../../services/todoController";
import { useNavigate, Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function CreateToDo() {
	const [todoData, setTodoData] = useState({
		title: "",
		description: "",
		category: "",
		completed: false,
	});

	const navigate = useNavigate();

	const handleCreateTodo = async (e) => {
		e.preventDefault();
		if (!todoData.title) {
			return;
		}

		try {
			await createToDo(todoData);
			setTodoData({
				title: "",
				description: "",
				category: "",
				completed: false,
			});
			navigate("/");
		} catch (error) {
			console.error("Something went wrong", error);
		}
	};

	return (
		<div
			className="container-fluid bg-dark text-light"
			style={{ paddingTop: "5rem" }}
		>
			<button
				className="btn btn-outline-light"
				type="button"
				style={{
					border: "none",
					backgroundColor: "transparent",
					padding: "0 0 1.5rem",
				}}
			>
				<Link to="/" style={{ textDecoration: "none", color: "#ffffff" }}>
					<BsArrowLeft />
				</Link>
			</button>
			<form onSubmit={handleCreateTodo}>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						type="text"
						className="form-control bg-dark text-light"
						id="title"
						value={todoData.title}
						onChange={(e) =>
							setTodoData({ ...todoData, title: e.target.value })
						}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<textarea
						type="text"
						className="form-control bg-dark text-light"
						id="description"
						rows="5"
						value={todoData.description}
						onChange={(e) =>
							setTodoData({ ...todoData, description: e.target.value })
						}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="category" className="form-label">
						Category
					</label>
					<select
						type="text"
						className="form-select bg-dark text-light"
						id="category"
						value={todoData.category}
						onChange={(e) =>
							setTodoData({
								...todoData,
								category: e.target.value,
							})
						}
						required
					>
						<option value="">Select an option</option>
						<option value="Urgent">Urgent</option>
						<option value="Important">Important</option>
						<option value="Later">Later</option>
					</select>
				</div>
				<div className="form-check" style={{ marginBottom: "10px" }}>
					<input
						className="form-check-input bg-dark"
						type="checkbox"
						id="flexCheckDefault"
						value={todoData.completed} 
						onChange={(e) =>
							setTodoData({
								...todoData,
								completed: e.target.checked, 
							})
						}
					/>
					<label className="form-check-label" for="flexCheckDefault">
						Completed
					</label>
				</div>
				<button type="submit" className="btn btn-outline-primary float-end">
					Save
				</button>
			</form>
		</div>
	);
}
