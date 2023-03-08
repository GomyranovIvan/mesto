const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_text_name');
const descriptionInput = formElement.querySelector('.popup__input_text_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const openPopup = function () {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;

};

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
};

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupOpenButtonElement.addEventListener('click', openPopup,);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
