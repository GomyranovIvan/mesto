const validationParameters = {
    forms: document.forms,
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    errorTemplateSelector: '.popup__error_type_',
    inactiveButtonClass: 'popup__button-submit_disable',
    inputErrorClass: 'popup__input_invalid',
};

//------------------------------------------------------------------------------------------------------------------------------------------
const hangEventListeners = function (inputs, button, errorTemplateSelector, inactiveButtonClass, inputErrorClass) {
    inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        checkInputValidity(input, errorTemplateSelector, inputErrorClass);
        toggleButtonState(inputs, button, inactiveButtonClass);
      });
    });
};

const enableValidation = function (parameter) {
    const formsArr = Array.from(parameter.forms)
    formsArr.forEach(function (form) {
        const inputs = form.querySelectorAll(parameter.inputSelector);
        const button = form.querySelector(parameter.submitButtonSelector);
        hangEventListeners(inputs, button, parameter.errorTemplateSelector, parameter.inactiveButtonClass, parameter.inputErrorClass);
    });
};

enableValidation(validationParameters);

//------------------------------------------------------------------------------------------------------------------------------------------
const toggleButtonState = function (inputs, button, inactiveButtonClass) {
    if (hasInValidInput(inputs)) {
        disableButton(button, inactiveButtonClass);
    } else {
        enableButton(button, inactiveButtonClass);
    };
};

const hasInValidInput = function (inputs) {
    return Array.from(inputs).some(function (input) {
        return !input.validity.valid});
};

const enableButton = function (button, inactiveButtonClass) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
};

const disableButton = function (button, inactiveButtonClass) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
};

//------------------------------------------------------------------------------------------------------------------------------------------
const checkInputValidity = function (input, errorTemplateSelector, inputErrorClass) {
    const errorElement = document.querySelector(`${errorTemplateSelector}${input.id}`);
    if (input.validity.valid) {
        hideInputError(input, errorElement, inputErrorClass)
    } else {
        showInputError(input, errorElement, inputErrorClass)
    };
};

const hideInputError = function (input, errorElement, inputErrorClass) {
    input.classList.remove(inputErrorClass);
    errorElement.textContent = '';
};

const showInputError = function (input, errorElement, inputErrorClass) {
    input.classList.add(inputErrorClass);
    errorElement.textContent = input.validationMessage;
};

//------------------------------------------------------------------------------------------------------------------------------------------
const resetErrorForOpenForm = function (element) {
    element.querySelectorAll(validationParameters.inputSelector).forEach(function (input) {
        const errorElement = document.querySelector(`${validationParameters.errorTemplateSelector}${input.id}`)
        if (!input.validity.valid) {
            hideInputError(input, errorElement, validationParameters.inputErrorClass)
        };
    });
};