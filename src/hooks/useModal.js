import { useState } from "react";
import "./Modal.css";

export const useModal = (initialValue = false) => {
	const [isOpen, setIsOpen] = useState(initialValue);

	const openModal = () => setIsOpen(true);

	const closeModal = () => setIsOpen(false);

	return [isOpen, openModal, closeModal];
};