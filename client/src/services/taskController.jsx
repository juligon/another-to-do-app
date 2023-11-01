/* eslint-disable no-useless-catch */
const TASKS_URL = import.meta.env.VITE_TASKS_URL;

export async function getTasks(signal, title, category) {
  const url = new URL(TASKS_URL);
	
	if (title) {
    url.searchParams.append("title", title);
  }

	if (category) {
		url.searchParams.append("category", category);
	}

	try {
		const response = await fetch(url.toString(), { signal });
		console.log("URL:", url.toString());

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function getTask(id) {
	try {
		const response = await fetch(`${TASKS_URL}/${id}`);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	} catch (error) {
		throw error;
	}
}

export async function createTask(data) {
	try {
		const response = await fetch(TASKS_URL, {
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

export async function updateTask(id, data) {
	try {
		if (data.description === "") {
			data.description = null;
		}

		const response = await fetch(`${TASKS_URL}/${id}`, {
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

export async function deleteTask(id) {
	try {
		await fetch(`${TASKS_URL}/${id}`, {
			method: "DELETE",
		});
	} catch (error) {
		throw error;
	}
}
