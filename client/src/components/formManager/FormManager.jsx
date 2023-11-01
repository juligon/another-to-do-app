/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";

export default function FormManager({ isEditMode }) {
	const [editMode, setEditMode] = useState(isEditMode);

	return <div>{editMode ? <EditTask /> : <CreateTask />}</div>;
}
