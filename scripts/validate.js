const validationConfig = {
    allforms: document.forms,
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    errorSelectorTemplate: '.popup__error_type_',
    disableButtonClass: 'popup__button-submit_disable',
    inputErrorClass: 'popup__input_invalid',
    textErrorClass: 'popup__error_active'
};
const log = console.log;

enableValidation(validationConfig)

function enableValidation(config) {
    const forms = Array.from(config.allforms)
    forms.forEach((form) => {
        const inputList = form.querySelectorAll(config.inputSelector);
        //можно button перенести в другую функцию
        const button = form.querySelector(config.submitButtonSelector);
        hangEventListener(inputList, button, config.errorSelectorTemplate, config.disableButtonClass, config.inputErrorClass, config.textErrorClass);
    })  
}

function hangEventListener(inputList, button, errorSelectorTemplate, disableButtonClass, inputErrorClass, textErrorClass) {
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(input, errorSelectorTemplate, inputErrorClass, textErrorClass);
        toggleButtonState(inputList, button, disableButtonClass);
      })
    })
}

function checkInputValidity(input, errorSelectorTemplate, inputErrorClass, textErrorClass) {
    const errorTextElement = document.querySelector(`${errorSelectorTemplate}${input.name}`);
    if (input.validity.valid) {
        hideInputError(input, errorTextElement, inputErrorClass, textErrorClass)
    } else {
        showInputError(input, errorTextElement, inputErrorClass, textErrorClass)
    }
}

function hideInputError(input, errorTextElement, inputErrorClass, textErrorClass) {
    input.classList.remove(inputErrorClass);
    errorTextElement.textContent = '';
    errorTextElement.classList.remove(textErrorClass)
}

function showInputError(input, errorTextElement, inputErrorClass, textErrorClass) {
    input.classList.add(inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
    errorTextElement.classList.add(textErrorClass)
}

function toggleButtonState(inputList, button, disableButtonClass) {
    // if else
    hasInValidInput(inputList) ? enableButton(button, disableButtonClass) : disableButton(button, disableButtonClass);
}

function hasInValidInput(inputList) {
    // some используй
    return Array.from(inputList).every((input) => input.validity.valid)
}

function enableButton(button, disableButtonClass) {
    button.classList.remove(disableButtonClass);
    button.disabled = false;
}

function disableButton(button, disableButtonClass) {
    button.classList.add(disableButtonClass);
    button.disabled = true;
}

function resetErrorForOpenForm(form) {
    form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
        const errorTextElement = document.querySelector(`${validationConfig.errorSelectorTemplate}${input.name}`)
        if (!input.validity.valid) {
            hideInputError(input, errorTextElement, validationConfig.inputErrorClass, validationConfig.textErrorClass)
        }
    })
}
