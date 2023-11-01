/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getTasks, updateTask } from "../../services/taskController";
import { BsArrowLeft } from "react-icons/bs";

export default function EditTask() {
	const { id } = useParams();
	const taskId = parseInt(id, 10);
	const [tasks, setTasks] = useState([]);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		completed: false,
	});

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			try {
				const tasks = await getTasks();
				setTasks(tasks);
			} catch (error) {
				console.error("Error loading data", error);
			}
		}

		fetchData();
	}, []);

	useEffect(() => {
		const task = tasks.find((task) => task.id === taskId);

		if (!task) {
			console.error("Not found");
			return;
		}

		setFormData({
			title: task.title || "",
			description: task.description || "",
			category: task.category || "",
			completed: task.completed || false,
		});
	}, [taskId, tasks]);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === "checkbox" ? checked : value;
		setFormData((prevData) => ({
			...prevData,
			[name]: name === "description" && value === "" ? null : newValue,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.title) {
			return;
		}

		try {
			const dataToSend = { ...formData };
			if (dataToSend.description === null) {
				delete dataToSend.description;
			}

			await updateTask(taskId, dataToSend);
			navigate("/");
		} catch (error) {
			console.error("Something went wrong:", error);
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
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						type="text"
						className="form-control bg-dark text-light"
						id="title"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
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
						name="description"
						rows="5"
						value={formData.description || ""}
						onChange={handleInputChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="category" className="form-label">
						Category
					</label>
					<input
						type="text"
						className="form-select bg-dark text-light"
						id="category"
						name="category"
						value={formData.category}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-check" style={{ marginBottom: "10px" }}>
					<input
						className="form-check-input bg-dark"
						type="checkbox"
						id="flexCheckDefault completed"
						name="completed"
						checked={formData.completed}
						onChange={handleInputChange}
					/>
					<label
						className="form-check-label"
						htmlFor="flexCheckDefault completed"
					>
						Completed
					</label>
				</div>
				<button type="submit" className="btn btn-outline-primary float-end">
					Save changes
				</button>
			</form>
		</div>
	);
}
