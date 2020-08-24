
class Popup {
  constructor(element, popupclass) {
    this.element = element;
    this.popupclass = popupclass;
    this.closePopup = this.closePopup.bind(this)
    this.closeButton = this.element.querySelector(".popup__close");
  }
  
  openPopup() {
    this.element.classList.add(this.popupclass);
    this.closeButton.addEventListener("click", this.closePopup);
  }

  closePopup() {
    this.element.classList.remove(this.popupclass);
    this.element.removeEventListener("click", this.closePopup);
  }

  setAttributes(url) {
    this.element.querySelector("#photosrc").setAttribute("src", url);
  }
}
