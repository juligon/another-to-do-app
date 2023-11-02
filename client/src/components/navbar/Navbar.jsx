/* eslint-disable react/prop-types */
import { useState } from "react";
import { getTasks } from "../../services/taskController";
import { BsPlusLg } from "react-icons/bs";
import Logo from "../../assets/Logo.png";
import "./Navbar.css";

export default function NavBar({ onSearch }) {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const tasks = await getTasks(null, searchQuery, searchQuery);
			onSearch(tasks);
			console.log("Filtered To-Dos:", tasks);
		} catch (error) {
			console.error("Something went wrong:", error);
		}
	};

	return (
		<nav
			className="navbar fixed-top navbar-expand-lg bg-dark border-bottom border-body"
			data-bs-theme="dark"
		>
			<div className="container-fluid">
				<a className="navbar-brand" href="/">
					<img id="logo" src={Logo} alt="Logo" style={{ height: "30px" }} />
				</a>
				<ul className="navbar-nav me-auto">
					<li className="nav-item">
						<a
							className="nav-link active"
							aria-current="page"
							href="/tasks/create"
						>
							<BsPlusLg />
						</a>
					</li>
				</ul>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<form
						className="d-flex ms-auto form"
						role="search"
						onSubmit={handleSearch}
					>
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
							value={searchQuery}
							onChange={handleSearchChange}
						/>
						<button className="btn btn-form" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
}
