import { Api } from "./script/Api.js";
import { Card } from "./script/Card.js";
import { CardList } from "./script/Cardlist.js";
import { FormValidator, errorMessages } from "./script/FormValidator.js";
import { Popup } from "./script/Popup.js";
import { UserInfo } from "./script/UserInfo.js";
import "./pages/index.css";

(function () {
  const placeslist = document.querySelector(".places-list");
  const formEditProfile = document.querySelector("#formedit");
  const formNewCard = document.querySelector("#formcard");
  const buttonOpenProfile = document.querySelector(".user-info__editbutton");
  const buttonNewCard = document.querySelector(".user-info__button");
  const infoname = document.querySelector(".user-info__name");
  const infojob = document.querySelector(".user-info__job");
  const avatar = document.querySelector(".user-info__photo");
  const buttonFormCard = document.querySelector("#button-card");
  const buttonFormUser = document.querySelector("#button-user");
  const formname = document.querySelector("#username");
  const formjob = document.querySelector("#userjob");
  const API_URL =
    NODE_ENV === "production"
      ? "https://nomoreparties.co"
      : "http://nomoreparties.co";
  const baseUrl = `${API_URL}/cohort11`;
  const key = "d1a2155d-67b7-493a-834b-dc7b3119f4ed";

  const validateFormCard = new FormValidator(formNewCard);
  const validateFormUser = new FormValidator(formEditProfile);
  const popupAddCard = new Popup(
    document.querySelector("#cardpopup"),
    "popup_is-opened"
  );
  const popupOpenProfile = new Popup(
    document.querySelector("#editpopup"),
    "popup_is-opened"
  );
  const popupOpenPhoto = new Popup(
    document.querySelector("#photopopup"),
    "popup_is-opened"
  );
  const api = new Api(key, baseUrl);
  const cardlist = new CardList(newCard, placeslist, api);
  const userInfo = new UserInfo(formEditProfile, infoname, infojob, avatar);

  // рендерим карточки при загрузке
  cardlist.renderCard();

  // колбэк новой карточки
  function newCard(obj) {
    const card = new Card(popupOpenPhoto);
    return card.createCard(obj);
  }

  // колбэк загрузки данных о пользователе
  function loadUserInfo() {
    api
      .getUserInfo()
      .then((res) => {
        userInfo.updateUserInfo(res.name, res.about, res.avatar);
        console.log("Данные пользователя загружены");
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных пользователя: ${err}`);
      });
  }

  // загружаем данные пользователя
  loadUserInfo();

  // слушаем ошибки формы карточки
  validateFormCard.setEventListener();
  // открываем попап карточки
  buttonNewCard.addEventListener("click", function () {
    validateFormCard.clearError();
    formNewCard.reset();
    buttonFormCard.classList.remove(`popup__button_valid`);
    popupAddCard.openPopup();
  });
  // добавляем новую карточку
  formNewCard.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateFormCard.isFormValid(formNewCard)) {
      api
        .addCard(formNewCard.name.value, formNewCard.link.value)
        .then((res) => {
          cardlist.addCard(res);
          popupAddCard.closePopup();
          console.log("Карточка загружена на сервер");
        })
        .catch((err) => {
          console.log(`Ошибка загрузки карточки: ${err}`);
        });
    }
  });

  // слушаем ошибки формы профиля
  validateFormUser.setEventListener();
  // открываем попап профиля
  buttonOpenProfile.addEventListener("click", function () {
    validateFormUser.clearError();
    buttonFormUser.classList.add("popup__button_valid");
    popupOpenProfile.openPopup();
    userInfo.setUserInfo(infoname.textContent, infojob.textContent);
  });

  // сохраняем отредактированный профиль
  formEditProfile.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateFormUser.isFormValid(formEditProfile)) {
      api
        .setUserInfo(formname.value, formjob.value)
        .then((res) => {
          userInfo.updateUserInfo(res.name, res.about, res.avatar);
          popupOpenProfile.closePopup();
          console.log("Данные о пользователе обновлены");
        })
        .catch((err) => {
          console.log(`Ошибка обновления данных: ${err}. Попробуйте ещё раз`);
        });
    }
  });
})();

/// сделал 4 первых задания.

/*
Неплохая работа, запросы выполняются, класс Api создан и взаимодействет с сервером
Но нужно исправить код в нескольких местах:

Надо исправить:
- адрес сервера и ключ авторизации передавать как параметры в конструктор класса Api // +
- у запросов к серверу в конце должна быть обработка ошибок блоком catch, сейчас она есть не у всех запросов // +
- при запросе данных профиля обновлять данные на странице с помощью метод updateUserInfo // +
- при отправке данных профиля на сервер не делать ещё один запрос, а использовать данные которые вернул сервер // +
- все изменения на странице - закрытие попапов, добавление карточки выполнять только если запрос
выполнился успешно, т.е. в блоке then // +

Можно лучше: 
- проверка ответа сервера и преобразование из json
дублируется во всех методах класса Api, лучше вынести в отдельный метод. // исправил


*/

/*
  Отлично, все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Так же в некоторых местах есть замечания по форматированию кода - проблемы с отступами.
  Об оформлении кода можно почитать здесь https://learn.javascript.ru/coding-style
  Практически все современные редакторы умеют автоматически форматировать код. 
  Постарайтесь настроить его, это сильно экономит время, а Ваш код будет всегда красив.
  Одно из наиболее популярных дополнений для форматирования кода - Prettier (https://prettier.io/)

  Успехов в дальнейшем обучении!
*/
