import React from "react";
import axios from "axios";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import Form from "./Form";

const CardUser = ({ user, getAllUsers, setUpdateInfo, updateInfo }) => {
	const [isOpenModalDelete, openModalDelete, closeModalDelete] =
		useModal(false);
	const [isOpenModalUpdate, openModalUpdate, closeModalUpdate] =
		useModal(false);

	const deleteUser = (id) => {
		const URL = `https://users-crud1.herokuapp.com/users/${id}/`;
		axios
			.delete(URL)
			.then((res) => {
				console.log(res.data);
				getAllUsers();
			})
			.catch((err) => console.error(err));
	};

	const getUserUpdate = () => {
		setUpdateInfo(user);
		openModalUpdate();
	};

	return (
		<section className="card-containerr">
			<div className="card-item">
				<h1>{`${user.first_name} ${user.last_name}`}</h1>
				<hr />
				<p className="info">EMAIL</p>
				<p>{user.email}</p>
				<p className="info">BIRTHDAY</p>
				<p>
					<i className="fi fi-rr-gift"> </i>
					{user.birthday}
				</p>
				<hr />
				<div className="card-btn">
					<button className="btn btn-eliminar" onClick={openModalDelete}>
						<i className="fi fi-rr-trash"></i>
					</button>
					<Modal isOpen={isOpenModalDelete} closeModal={closeModalDelete}>
						<div className="modal-btn-delete">
							<h1 className="titulo-delete">Delete User</h1>
							<p className="info-delete">
								{" "}
								{`El usuario ${user.first_name} ${user.last_name} sera
										eliminado`}
							</p>
							<button
								className="btn-delete"
								onClick={() => deleteUser(user.id)}
							>
								Acept
							</button>
						</div>
					</Modal>

					<button
						className="btn btn-actualizar"
						onClick={() => getUserUpdate(user.id)}
					>
						<i className="fi fi-rs-pencil"></i>
					</button>
					<Modal isOpen={isOpenModalUpdate} closeModal={closeModalUpdate}>
						<Form
							closeModalUpdate={closeModalUpdate}
							updateInfo={updateInfo}
							getAllUsers={getAllUsers}
						/>
					</Modal>
				</div>
			</div>
		</section>
	);
};

export default CardUser;
