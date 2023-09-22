import { useContext } from "react";
import Card from "./Card.jsx";
import plus from "../images/plus.svg";
import pen from "../images/pen.svg";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onImageOpen,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile conteiner">
        <div className="profile__box">
          <button className="profile__edit" onClick={onEditAvatar}>
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="Фото"
            />
          </button>
          <div className="profile__items">
            <div className="profile__item">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__button-pen"
                type="button"
                onClick={onEditProfile}
              >
                <img
                  className="profile__imag-pen"
                  src={pen}
                  alt="Редактировать профиль"
                />
              </button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add" type="button">
          <img
            className="profile__button-add"
            src={plus}
            alt="Добавить изображение"
            onClick={onAddPlace}
          />
        </button>
      </section>

      <section className="element conteiner">
        <ul className="element__items">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onImageOpen}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
