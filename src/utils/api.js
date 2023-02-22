export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.token;
  }

  // method to check response status
  _checkResponse(response) {
    {
      if (response.ok) {
        return response.json();
      } else {
        console.log(
          "Something went wrong",
          response.status,
          response.statusText
        );
      }
    }
  }

  // receiving user cards ---------------------------------------------->
  async getInitialCards() {
    const response = await fetch(`${this._url}/cards`, {
      headers: { authorization: this._token },
    });

    return this._checkResponse(response);
  }

  // receiving user information ---------------------------------------------->
  async getUserData() {
    const response = await fetch(`${this._url}/users/me`, {
      headers: { authorization: this._token },
    });

    return this._checkResponse(response);
  }

  // adding card to server with POST method ---------------------------------------------->
  async addCard(name, link) {
    const response = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });

    return this._checkResponse(response);
  }

  // edit profile avatar with PATCH method ---------------------------------------------->
  async editAvatar(avatar) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: avatar }),
    });

    return this._checkResponse(response);
  }

  // delete a card with DELETE method ---------------------------------------------->
  async deleteCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    });
    return this._checkResponse(response);
  }

  // method to like a card  ---------------------------------------------->
  async likeCard(cardId) {
    const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    });
    return this._checkResponse(response);
  }

  // method to remove likes from a card ---------------------------------------------->
  async removeLike(cardId) {
    const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    });
    return this._checkResponse(response);
  }
}
