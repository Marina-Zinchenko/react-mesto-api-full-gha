import { useState, useCallback, useEffect } from "react";
import { Route, Navigate, useNavigate, Routes } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import ProtectedRouteElement from "./ProtectedRoute";
import Register from "./Register.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import Login from "./Login.jsx";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setInitialCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [infoStatus, setInfoStatus] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
        .then(([dataUser, dataCard]) => {
          setСurrentUser(dataUser);
          setInitialCards(dataCard);
        })
        .catch((error) => console.error(`Ошибка в создании страницы ${error}`));
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, localStorage.jwt)
      .then((newCard) => {
        setInitialCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(
          `Возникла ошибка при добавлении или удалении лайка, ${err}`
        );
      });
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id, localStorage.jwt)
      .then(() => {
        setInitialCards((cardItems) =>
          cardItems.filter((cardItem) => cardItem._id !== card._id)
        );
      })
      .catch((err) => {
        console.error(`Возникла ошибка при удалении карточки, ${err}`);
      });
  };

  function handleUpdateUser(dataInputProfile) {
    api
      .addUserInfo({ name: dataInputProfile.name, job: dataInputProfile.about }, localStorage.jwt)
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Возникла ошибка при редактировании профиля, ${err}`);
      });
  }
  function handleUpdateAvatar(dataAvatar) {
    api
      .addNewAvatar(dataAvatar, localStorage.jwt)
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Возникла ошибка при смене аватара, ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCards(data.name, data.link, localStorage.jwt)
      .then((card) => {
        setInitialCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Возникла ошибка при добавлении новой карточки, ${err}`);
      });
  }

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setInfoOpen(false);
  }, []);

  useEffect(() => {
    handleTokenCheck(localStorage.jwt);
    // eslint-disable-next-line
  }, []);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    auth
      .checkToken(jwt, localStorage.jwt)
      .then((data) => {
        setUserEmail(data.data.email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(`Ошибка проверки токена: ${err}`);
      });
  };

  function onRegister({ email, password }) {
    auth
      .register(email, password, localStorage.jwt)
      .then((data) => {
        if (data) {
          setInfoStatus(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setInfoStatus(false);
        console.error(`При регистрации произошла ошибка: ${err}`);
      })
      .finally(() => {
        setInfoOpen(true);
      });
  }

  function onLogin({ email, password }) {
    auth
      .authorize(email, password, localStorage.jwt)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        setInfoStatus(false);
        setInfoOpen(true);
        console.error(`Ошибка при вводе логина: ${err}`);
      });
  }

  function onExit() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in");
    setUserEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} onExit={onExit} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onImageOpen={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />

          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />

        <InfoTooltip
          isOpen={infoOpen}
          onClose={closeAllPopups}
          isSuccess={infoStatus}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
