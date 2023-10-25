/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import CreateToDo from "./CreateToDo";
import EditToDo from "./EditToDo";

export default function FormManager({ isEditMode }) {
	const [editMode, setEditMode] = useState(isEditMode);

	return <div>{editMode ? <EditToDo /> : <CreateToDo />}</div>;
}
