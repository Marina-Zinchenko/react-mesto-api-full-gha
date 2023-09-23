import { BASE_URL } from '../utils/consants';

class Api {
  constructor(options) {
    this._url = options.url;
  }
  /*Проверка ответа */
  _checkErrors(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  /*Загрузка информации о пользователе с сервера */
  getInitialInfo(token) {
    return fetch(`${this._url}/users/me`, {
     headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
     },
    }).then(this._checkErrors);
  }
  /*Загрузка карточек с сервера */
  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
       },
    }).then(this._checkErrors);
  }
  /*Редактирование профиля */
  addUserInfo(dateInputProfile, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: dateInputProfile.name,
        about: dateInputProfile.job,
      }),
    }).then(this._checkErrors);
  }
  /*Обновление аватара пользователя */
  addNewAvatar(dataAvatar, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: dataAvatar.avatar,
      }),
    }).then(this._checkErrors);
  }
  /*Добавление новой карточки */
  addNewCards(name, link, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name, link }),
    }).then(this._checkErrors);
  }
   /*проверка статуса лайка*/
  changeLikeCardStatus(cardId, isLiked, token) {
    const method = isLiked ? 'PUT' : 'DELETE';
     return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkErrors);
  }
  /*Удаление карточки */
  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkErrors);
  }
}

const api = new Api({ url:BASE_URL });

export default api;
