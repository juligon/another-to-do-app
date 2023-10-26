/* eslint-disable react/prop-types */
import { useState } from "react";
import { getToDos } from "../../services/todoController";


export default function NavBar({ onSearch }) {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const todos = await getToDos(null, searchQuery, searchQuery);
			onSearch(todos);
			console.log("Filtered To-Dos:", todos);
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
					To-Do App
				</a>
				<ul className="navbar-nav me-auto mb-lg-0">
						<li className="nav-item">
							<a
								className="nav-link active"
								aria-current="page"
								href="/todos/create"
							>
								Add To-Do
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
					
					<form className="d-flex ms-auto" role="search" onSubmit={handleSearch}>
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
							value={searchQuery}
							onChange={handleSearchChange}
						/>
						<button className="btn btn-outline-secondary" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
}
