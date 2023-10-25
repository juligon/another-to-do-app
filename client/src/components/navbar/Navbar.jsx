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
			const searchValue = searchQuery || '';  // Verifica si es null o undefined
			const [title, category] = searchValue.split(',').map((s) => s.trim());  // Divide y elimina espacios en blanco
	
			// Verifica si se ingresó una categoría
			const hasCategory = category !== '';
	
			const todos = await getToDos(null, title, hasCategory ? category : undefined);
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
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
					<form className="d-flex" role="search" onSubmit={handleSearch}>
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
