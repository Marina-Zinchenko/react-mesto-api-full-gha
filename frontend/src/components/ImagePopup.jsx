function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section className={`popup popup-img ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container-img ">
        <figure className="popup__img-content">
          <button className="popup__close" type="button" onClick={onClose} />
          <img
            className="popup__element-foto"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="popup__name-img" />
          {card.name}
        </figure>
      </div>
    </section>
  );
}
export default ImagePopup;
