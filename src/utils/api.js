import { profileJob } from "./constants";

export class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _customFetch = (url, headers) => {
    return fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  };

  // receiving user cards ---------------------------------------------->
  getInitialCards() {
    return this._customFetch(`${this._url}/cards`, {
      headers: this._headers,
    });
  }

  // receiving user information ---------------------------------------------->
  getUserData() {
    return this._customFetch(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  //edit profile info with PATCH method ---------------------------------------------->
  editUserData(name, about) {
    return this._customFetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  // adding card to server with POST method ---------------------------------------------->
  addCard(name, link) {
    return this._customFetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  // delete a card with DELETE method ---------------------------------------------->
  deleteCard(cardId) {
    return this._customFetch(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  // edit profile avatar with PATCH method ---------------------------------------------->
  editAvatar(avatar) {
    return this._customFetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: avatar }),
    });
  }

  // method to like a card  ---------------------------------------------->
  likeCard(cardId) {
    return this._customFetch(`${this._url}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
    });
  }

  // method to remove likes from a card ---------------------------------------------->
  removeLike(cardId) {
    return this._customFetch(`${this._url}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }
}
