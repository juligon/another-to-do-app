/* eslint-disable no-useless-catch */
const TODOS_URL = import.meta.env.VITE_TODOS_URL;

export async function getToDos(signal) {
	const url = new URL(TODOS_URL);

	try {
		const response = await fetch(url.toString(), { signal });

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function getToDo(id) {
	try {
		const response = await fetch(`${TODOS_URL}/${id}`);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function createToDo(data) {
	try {
		const response = await fetch(TODOS_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function updateToDo(id, data) {
	try {
		if (data.description === "") {
			data.description = null;
		}
		
		const response = await fetch(`${TODOS_URL}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			console.error("Response error:", response);
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function deleteToDo(id) {
	try {
		await fetch(`${TODOS_URL}/${id}`, {
			method: "DELETE",
		});
	} catch (error) {
		throw error;
	}
}
