function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? `popup_opened` : ""
      }`}
      onClick={props.onCloseClick}
    >
      <div className={`popup__container popup__container-${props.name}`}>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        <h2 className={`popup__title popup__title_type_${props.name}`}>
          {props.title}
        </h2>
        <form
          className="popup__form"
          name={props.form}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__button popup__button_valid" type="submit" title="Сохранить">
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
