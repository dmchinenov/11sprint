const errorMessages = {
  emptyinput: "Это обязательное поле",
  errorlength: "Должно быть от 2 до 30 символов",
  errorurl: "Здесь должна быть ссылка на картинку",
};

class FormValidator {
  constructor(form) {
    this.form = form;
  }
  // слушатель формы
  setEventListener() {
    this.form.addEventListener('input', this.handlerInputForm.bind(this))
}
  // проверяем инпуты на наличие ошибок. Получаем имя ошибки
  isValidate(input) {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity(errorMessages.emptyinput);
      return false;
    }
    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(errorMessages.errorlength);
      return false;
    }
    if (input.validity.typeMismatch && input.type === "url") {
      input.setCustomValidity(errorMessages.errorurl);
      return false;
    }
    return input.checkValidity();
  }

  // проверяем инпут и присваиваем ошибку для span.
  isFieldValid(input) {
    const errorElement = input.parentNode.querySelector(`#${input.id}error`);
    const valid = this.isValidate(input);
    errorElement.textContent = input.validationMessage;
    return valid;
  }

  // проверяем валидна ли форма
  isFormValid(form) {
    const inputs = Array.from(form.elements);
    let res = true;
    const valid = [];
    inputs.forEach((item) => {
      if (item.type !== "submit" && item.type !== "button") {
        valid.push(this.isFieldValid(item));
      }
    });
    if (valid.join(",").includes("false")) {
      res = false;
    }
    return res;
  }

  // задаем свойства кнопке
  setSubmitButtonState(button, valid) {
    if (valid) {
      button.classList.add(`popup__button_valid`);
    } else {
      button.classList.remove(`popup__button_valid`);
    }
  }
  // проверяем инпуты на валидность
  handlerInputForm(event) {
    const submit = this.form.querySelector(".button");
    const inputs = Array.from(this.form.elements);
    this.isFieldValid(event.target);
    if (inputs.every(this.isValidate)) {
      this.setSubmitButtonState(submit, true);
    } else {
      this.setSubmitButtonState(submit, false);
    }
  }
  // сбрасываем ошибки с формы
  clearError() {
    const inputs = this.form.querySelectorAll(".popup__errorspan");
    inputs.forEach(function (item) {
      if (item.type !== "submit" && item.type !== "button") {
        item.textContent = " ";
      }
    });
  }
}
