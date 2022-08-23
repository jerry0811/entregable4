import { useEffect, useState } from "react";
import "./App.css";
import CardUser from "./components/CardUser";
import axios from "axios";
import Modal from "./components/Modal";
import { useModal } from "./hooks/useModal";
import Form from "./components/Form";

function App() {
	const [users, setUsers] = useState();
	const [isOpenNewUser, openNewUser, closeNewUser] = useModal(false);
	const [updateInfo, setUpdateInfo] = useState();

	const getAllUsers = () => {
		const URL = "https://users-crud1.herokuapp.com/users/";
		axios
			.get(URL)
			.then((res) => setUsers(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const createNewUser = (data) => {
		const URL = "https://users-crud1.herokuapp.com/users/";
		axios
			.post(URL, data)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err))
			.finally(() => getAllUsers());
	};

	return (
		<div className="App">
			<div className="header">
				<h1>Users</h1>
				<button className="btn-new" id="btn-new" onClick={openNewUser}>
					<i className="fi fi-br-plus"> </i>
					create New User
				</button>
				<Modal isOpen={isOpenNewUser} closeModal={closeNewUser}>
					<Form
						createNewUser={createNewUser}
						closeNewUser={closeNewUser}
						getAllUsers={getAllUsers}
						setUpdateInfo={setUpdateInfo}
					/>
				</Modal>
			</div>
			<div className="body">
				{users?.map((user) => (
					<CardUser
						key={user.id}
						user={user}
						getAllUsers={getAllUsers}
						setUpdateInfo={setUpdateInfo}
						updateInfo={updateInfo}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
