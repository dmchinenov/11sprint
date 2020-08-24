class Api {
    constructor(key, baseUrl) {
      this.key = key;
      this.baseUrl = baseUrl;
    }

// метод стандартной загрузки данных
_getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`); 
  }

// загружаем данные о пользователе
getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
      authorization: this.key
    }
    })
    .then(res => {
      return this._getResponseData(res);
    })
}

// обновляем данные о пользователе
setUserInfo(username, aboutuser) {
return fetch(`${this.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: this.key,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: username,
    about: aboutuser
  })
})
.then(res => {
  return this._getResponseData(res);
})
}

// Загружаем карточки
loadCard() {
    return fetch(`${this.baseUrl}/cards`, {
    headers: {
    authorization: this.key
    }
})
.then(res => {
  return this._getResponseData(res);
})
}

// добавляем свою карточку
addCard(cardname, cardlink) {
  return fetch(`${this.baseUrl}/cards`, {
  method: 'POST',
  headers: {
    authorization: this.key,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: cardname,
    link: cardlink
  })
})
.then(res => {
  return this._getResponseData(res);
})
}

}
