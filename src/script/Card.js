export class Card {
  constructor(popupOpenPhoto) {
    this.popupOpenPhoto = popupOpenPhoto;
    this.openImage = this.openImage.bind(this);
    this.likeCard = this.likeCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this)
    this.setEventListeners = this.setEventListeners.bind(this)
  }

  createCard(obj) {
    const card = document.createElement("div");
    this.card = card;
    const cardImage = document.createElement("div");
    const cardDelButton = document.createElement("button");
    const cardDescription = document.createElement("div");
    const cardName = document.createElement("h3");
    const cardLike = document.createElement("button");
    this.card.appendChild(cardImage);
    this.card.appendChild(cardDescription);
    cardImage.appendChild(cardDelButton);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(cardLike);
    this.card.classList.add("place-card");
    cardImage.classList.add("place-card__image");
    cardDelButton.classList.add("place-card__delete-icon");
    cardDescription.classList.add("place-card__description");
    cardName.classList.add("place-card__name");
    cardLike.classList.add("place-card__like-icon");
    cardImage.setAttribute("style", `background-image: url(${obj.link})`);
    cardImage.dataset.url = obj.link;
    cardName.textContent = obj.name;
    this.setEventListeners();
    return this.card;
  }
  setEventListeners() {
    this.card.querySelector('.place-card__delete-icon').addEventListener("click", this.deleteCard);
    this.card.querySelector('.place-card__image').addEventListener("click", this.openImage);
    this.card.querySelector('.place-card__like-icon').addEventListener("click", this.likeCard);
  }
  deleteCard() {
    this.card.querySelector('.place-card__image').removeEventListener("click", this.openImage);
    this.card.querySelector('.place-card__like-icon').removeEventListener("click", this.likeCard);
    this.card.querySelector('.place-card__delete-icon').removeEventListener("click", this.deleteCard);
    this.card.remove()
  }
  likeCard() {
    event.target.classList.toggle("place-card__like-icon_liked");
  }

  openImage() {
    if (!(event.target.classList.contains('place-card__delete-icon'))) {
      this.popupOpenPhoto.setAttributes(event.target.dataset.url)
      this.popupOpenPhoto.openPopup();
    }
  }
}
