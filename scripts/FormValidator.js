export default class FormValidator {
    constructor(parameters, form) {
      this._inputSelector = parameters.inputSelector;
      this._submitButtonSelector = parameters.submitButtonSelector;
      this._errorTemplateSelector = parameters.errorTemplateSelector;
      this._inactiveButtonClass = parameters.inactiveButtonClass;
      this._inputErrorClass = parameters.inputErrorClass;
      this._form = form;
    }
  
    _hideInputError() {
      this._input.classList.remove(this._inputErrorClass);
      this._errorElement.textContent = '';
    }
  
    _showInputError() {
      this._input.classList.add(this._inputErrorClass);
      this._errorElement.textContent = this._input.validationMessage;
    }
  
    _checkInputValidity() {
      this._errorElement = this._form.querySelector(`${this._errorTemplateSelector}${this._input.id}`);
      if (this._input.validity.valid) {
        this._hideInputError()
      } else {
        this._showInputError()
      };
    };
    
    _disableButton() {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    }
  
    _enableButton() {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  
    _hasInValidInput() {
      return Array.from(this._inputs).some(function (input) {
        return !input.validity.valid
    });
    }
  
    _toggleButtonState() {
      if (this._hasInValidInput()) {
        this._disableButton(this._button);
    } else {
      this._enableButton();
    };
    }
  
    _setEventListener() {
      this._inputs.forEach(input => {
        input.addEventListener('input', () => {
          this._input = input;
          this._checkInputValidity();
          this._toggleButtonState();
        })
      })
    }
  
    enableValidation() {
      this._button = this._form.querySelector(this._submitButtonSelector);
      this._inputs = this._form.querySelectorAll(this._inputSelector);
      this._setEventListener();
    }
  
    resetErrorForOpenForm() {
      this._button = this._form.querySelector(this._submitButtonSelector);
      this._inputs = this._form.querySelectorAll(this._inputSelector);
      this._inputs.forEach((input) => {
        this._input = input;
        this._errorElement = this._form.querySelector(`${this._errorTemplateSelector}${this._input.id}`);
        if (!input.validity.valid) {
          this._hideInputError()
      };
      });
      this._disableButton()
    }
  }