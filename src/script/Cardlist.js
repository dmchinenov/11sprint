export class CardList {
  constructor(newCard, places, api) {
    this.newCard = newCard;
    this.places = places;
    this.api = api;
  }

  addCard(obj) {
    this.places.appendChild(this.newCard(obj))
  }

  renderCard() {
  this.api.loadCard()
    .then(res => {
      res.forEach((item) => {
      this.addCard(item)
      })
    console.log(`Загружено ${res.length} карточек`)
    })
    .catch(err => {
      console.log(`Ошибка загрузки карточек: ${err}`)
    })
  }
}