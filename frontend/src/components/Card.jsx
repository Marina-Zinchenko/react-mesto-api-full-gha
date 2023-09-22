import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import dell from "../images/dell.svg";
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleCardClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser._id;
  const isLiked = card.likes.some(item => item === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'}` 
  );
   return (
    <div className="template">
      <div className="element__item">
        <button className="element__link-img" type="button">
          <img
            className="element__foto"
            src={card.link}
            alt={card.name}
            onClick={handleCardClick}
          />
        </button>
        {isOwner &&<button className="element__dell" onClick={handleDeleteClick}>
          <img className="element__img-dell" src={dell} alt="Удалить" />
        </button>}
        <div className="element__mesto">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__box-like">
            {cardLikeButtonClassName && <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>}
            <p className="element__counterlike">{card.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
