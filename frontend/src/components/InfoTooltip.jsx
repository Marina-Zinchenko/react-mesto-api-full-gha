import goodRegister from "../images/formgood.svg";
import badRegister from "../images/formbad.svg";
import { useEffect } from "react";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  useEffect(() => {
    if (!isOpen) return;
    function closeEscape(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closeEscape);

    return () => document.removeEventListener("keydown", closeEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup__info_type_tooltip ${
        isOpen ? `popup_opened` : ""
      }`}
      onClick={onClose}
    >
      <div
        className="popup__info popup__info_type_tooltip"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="popup__info_type-img"
          src={isSuccess ? goodRegister : badRegister}
          alt={isSuccess ? "Успешная регистрация" : "Ошибка регистрации"}
        />
        <p className="popup__info_type-text">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </p>
      </div>
    </div>
  );
}
export default InfoTooltip;
