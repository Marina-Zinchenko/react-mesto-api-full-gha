import PopupWithForm from "./PopupWithForm.jsx";
import { useRef, useEffect } from "react";

function AddPlacePopup ({isOpen, onClose, onUpdateCards }) {
  const nameRef = useRef();
  const linkRef = useRef();
  useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isOpen]);

  function handleSubmitCards(event) {
    event.preventDefault();
    onUpdateCards( { name: nameRef.current.value, link: linkRef.current.value } );
    
  }

  return (
    <PopupWithForm
        name="mesto"
        title="Новое место"
        buttonText="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitCards}
      >
        <input
          ref={nameRef}
          className="popup__input popup__input_type_name"
          id="name"
          type="text"
          name="nameImage"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
        />
        <span className="popup__error" id="name-error" />
        <input
          ref={linkRef}
          className="popup__input popup__input_type_url-img"
          id="url-img"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="popup__error" id="url-img-error" />
      </PopupWithForm>

  )

}

export default AddPlacePopup;