import React, { useEffect } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";

const defaultValue = {
	first_name: "",
	last_name: "",
	email: "",
	password: "",
	birthday: "",
};

const Form = ({
	createNewUser,
	closeNewUser,
	getAllUsers,
	updateInfo,
	closeModalUpdate,
}) => {
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm();

	useEffect(() => {
		updateInfo && reset(updateInfo);
	}, [updateInfo]);

	const updateUser = (data) => {
		const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`;
		axios
			.patch(URL, data)
			.then((res) => {
				console.log(res.data);
				getAllUsers();
			})
			.catch((err) => console.log(err));
	};

	const submit = (data) => {
		if (updateInfo) {
			updateUser(data);
			closeModalUpdate();
		} else {
			createNewUser(data);
			closeNewUser();
		}

		reset(defaultValue);
	};

	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className="form-container">
				<h1 className="tituloFrom">
					{updateInfo ? "Update User" : "Create User"}
				</h1>
				<label htmlFor="first_name">First Name</label>
				<input
					{...register("first_name", { required: true })}
					type="text"
					id="first_name"
				/>
				<label htmlFor="last_name">Last Name</label>

				{errors.first_name?.type === "required" && "First name is required"}

				<input
					{...register("last_name", { required: true })}
					type="text"
					id="last_name"
				/>
				{errors.last_name?.type === "required" && "Last name is required"}
				<label htmlFor="email">Email</label>
				<input
					{...register("email", { required: true })}
					type="email"
					id="email"
				/>
				{errors.email?.type === "required" && "Email is required"}
				<label htmlFor="password">Password</label>
				<input
					{...register("password", { required: true })}
					type="password"
					id="password"
				/>
				{errors.password?.type === "required" && "Password is required"}
				<label htmlFor="birthday">Birthday</label>
				<input
					{...register("birthday", { required: true })}
					type="date"
					id="birthday"
				/>
				{errors.birthday?.type === "required" && "Birthday is required"}
				<button className="btn-form">
					{updateInfo ? "Update User" : "Create User"}
				</button>
			</div>
		</form>
	);
};

export default Form;
