/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { createTask } from "../../services/taskController";
import { useNavigate, Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import "./FormManager.css";

export default function CreateTask() {
	const [taskData, setTaskData] = useState({
		title: "",
		description: "",
		category: "",
		completed: false,
	});

	const navigate = useNavigate();

	function capitalizeFirstLetter(string) {
		if (!string) {
			return "";
		}

		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const handleCreateTask = async (e) => {
		e.preventDefault();
		if (!taskData.title) {
			return;
		}

		const capitalizedData = {
			title: capitalizeFirstLetter(taskData.title),
			description: capitalizeFirstLetter(taskData.description),
			category: capitalizeFirstLetter(taskData.category),
			completed: taskData.completed,
		};

		try {
			await createTask(capitalizedData);

			setTaskData({
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
				<Link to="/" style={{ textDecoration: "none", color: "#fbfcff" }}>
					<BsArrowLeft />
				</Link>
			</button>
			<form onSubmit={handleCreateTask}>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						type="text"
						className="form-control bg-dark text-light"
						id="title"
						value={taskData.title}
						onChange={(e) =>
							setTaskData({ ...taskData, title: e.target.value })
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
						value={taskData.description}
						onChange={(e) =>
							setTaskData({ ...taskData, description: e.target.value })
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
						value={taskData.category}
						onChange={(e) =>
							setTaskData({
								...taskData,
								category: e.target.value,
							})
						}
						required
					>
						<option value="">Select an option</option>
						<option value="urgent">Urgent</option>
						<option value="important">Important</option>
						<option value="later">Later</option>
					</select>
				</div>
				<div className="form-check" style={{ marginBottom: "10px" }}>
					<input
						className="form-check-input bg-dark"
						type="checkbox"
						id="flexCheckDefault"
						value={taskData.completed}
						onChange={(e) =>
							setTaskData({
								...taskData,
								completed: e.target.checked,
							})
						}
					/>
					<label className="form-check-label" htmlFor="flexCheckDefault">
						Completed
					</label>
				</div>
				<button className="btn btn-form float-end" type="submit">
					Save
				</button>
			</form>
		</div>
	);
}
