import PopupWithForm from "./PopupWithForm.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useEffect, useState, useContext } from "react";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);
  function handleSubmitProfile(event) {
    event.preventDefault();
    onUpdateUser({ name: name, about: description });
  }
  function handleNameUser(event) {
    setName(event.target.value);
  }
  function handleDescriptionUser(event) {
    setDescription(event.target.value);
  }
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitProfile}
    >
      <input
        className="popup__input popup__input_type_name"
        id="name"
        type="text"
        name="name"
        value={name}
        placeholder="Имя Фамилия"
        minLength={2}
        maxLength={40}
        required
        onChange={handleNameUser}
      />
      <span className="popup__error" id="name-error" />
      <input
        className="popup__input popup__input_type_job"
        id="job"
        type="text"
        name="job"
        value={description}
        placeholder="Напишите о себе"
        minLength={2}
        maxLength={200}
        required
        onChange={handleDescriptionUser}
      />
      <span className="popup__error" id="job-error" />
    </PopupWithForm>
  );
}
export default EditProfilePopup;
