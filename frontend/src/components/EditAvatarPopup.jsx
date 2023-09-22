import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);
  function handleSubmitAvatar(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitAvatar}
    >
      <input
        className="popup__input popup__input_type_url-avatar"
        id="url-avatar"
        type="url"
        name="avatar"
        ref={avatarRef}
        placeholder="Ссылка на новый аватар"
        required=""
      />
      <span className="popup__error" id="url-avatar-error" />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
