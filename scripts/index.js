import Card from './card.js';
import FormValidator from './formValidator.js';
//---------------------------------------------------------------------------------------------------------------------------
//Попапы

const popupElementEditProfile = document.querySelector('.popup_content_edit-profile');
const popupElementAddCard = document.querySelector('.popup_content_card');
const popupElementImageFromCard = document.querySelector('.popup_content_image');
const popupElementImageFromCardOpenedImg = document.querySelector('.popup__image');
const popupElementImageFromCardOpenedCaption = document.querySelector('.popup__caption');
//Формы---------------------------------------------------------------------------------------------------------------------------

const formProfileEditElement = document.forms.popupFormProfileEdit
const formAddCardElement = document.forms.popupFormAddImage;
const popupFormElementContentAddCard = popupElementAddCard.querySelector('.popup__form_content_add');
const popupFormElementContentEditProfile = popupElementEditProfile.querySelector('.popup__form_content_edit');
//---------------------------------------------------------------------------------------------------------------------------
//Профиль
const profileElement = document.querySelector('.profile');
const profileElementName = profileElement.querySelector('.profile__name');
const profileElementDescription = profileElement.querySelector('.profile__description');

//Cards
const selectorTemplate = '#cards-template'
const cardsElementsPlace = document.querySelector('.cards');
//Кнопки----------------------------------------------------------------------------------------------------------------------------

//Закрытие popup
const popupCloseButtonElementEditProfile = popupElementEditProfile.querySelector('.popup__close_edit-profile');
const popupCloseButtonElementAddCard = popupElementAddCard.querySelector('.popup__close_add');
const popupCloseButtonElementImageFromCard = popupElementImageFromCard.querySelector('.popup__close_image');

//Открытие popup
const popupButtonElementEditProfile = profileElement.querySelector('.profile__button-edit');
const popupButtonElementAddCard = profileElement.querySelector('.profile__button-add');

//Инпуты EditProfile
const popupEditProfileElementNameInput = popupFormElementContentEditProfile.querySelector('.popup__input_text_name');
const popupEditProfileElementDescriptionInput = popupFormElementContentEditProfile.querySelector('.popup__input_text_description');

//Инпуты AddCard
const popupAddCardElementNameInput = popupFormElementContentAddCard.querySelector('.popup__input_text_caption');
const popupAddCardElementLinkInput = popupFormElementContentAddCard.querySelector('.popup__input_text_link');

//-----------------------------------------------------------------------------------------------------------------------------------
//Массив cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//---------------------------------------------------------------------------------------------------------------------------------
const validationParameters = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  errorTemplateSelector: '.popup__error_type_',
  inactiveButtonClass: 'popup__button-submit_disable',
  inputErrorClass: 'popup__input_invalid',
};

//---------------------------------------------------------------------------------------------------------------------------------
//Общие функции открытия закрытия
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKeyEscape);
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKeyEscape);
};

//---------------------------------------------------------------------------------------------------------------------------------
//Открытие popupEditProfile
const openPopupEditProfile = function () {
  formProfileEditValidator.resetErrorForOpenForm();
  popupEditProfileElementNameInput.value = profileElementName.textContent;
  popupEditProfileElementDescriptionInput.value = profileElementDescription.textContent;
  openPopup(popupElementEditProfile);
};

//Открытие popupAddCard
const openPopupAddCard = function () {
  popupFormElementContentAddCard.reset()
  formAddCardValidator.resetErrorForOpenForm();
  openPopup(popupElementAddCard);
};

//Открытие изображения
const handleOpenImageFromCard = function (object) {
  popupElementImageFromCardOpenedImg.src = object.link;
  popupElementImageFromCardOpenedImg.alt = 'Фотография ' + object.name;
  popupElementImageFromCardOpenedCaption.textContent = object.name;
  openPopup(popupElementImageFromCard);
};

//---------------------------------------------------------------------------------------------------------------------------------
//Закрытие PopupImageFromCard
const closePopupImageFromCard = function () {
  closePopup(popupElementImageFromCard);
};
//Закрытие PopupAddCard
const closePopupAddCard = function () {
  closePopup(popupElementAddCard);
};
//Закрытие PopupEditProfile
const closePopupEditProfile = function () {
  closePopup(popupElementEditProfile);
};
//---------------------------------------------------------------------------------------------------------------------------------
const closePopupByClickOnOverlay = function (event) {
  if (event.currentTarget !== event.target) {
    return;
  }
  closePopup(event.currentTarget)
};

const closePopupByKeyEscape = function (event) {
  if (event.key === 'Escape') {
    const popupElementOpened = document.querySelector('.popup_opened');
    closePopup(popupElementOpened);
  }
}

//---------------------------------------------------------------------------------------------------------------------------------
//Отправка формы 
function handleProfileFormSubmitSave(evt) {
  evt.preventDefault();
  profileElementName.textContent = popupEditProfileElementNameInput.value;
  profileElementDescription.textContent = popupEditProfileElementDescriptionInput.value;
  closePopup(popupElementEditProfile)
};

//Функция создания карточки
const handleProfileFormSubmitCreate = function (evt) {
  evt.preventDefault();

  const item = {
    name: popupAddCardElementNameInput.value,
    link: popupAddCardElementLinkInput.value
  };
  renderCard(cardsElementsPlace, createNewCard(item));
  closePopup(popupElementAddCard);
};

//-----------------------------------------------------------------------------------------------------------------------------------
const createNewCard = function (item) {
  const card = new Card(item, selectorTemplate, handleOpenImageFromCard);
  const cardElement = card.createCard()
  return cardElement
};

const renderCard = function (placeCard, card) {
  placeCard.prepend(card);
};

initialCards.forEach((item) => {
  renderCard(cardsElementsPlace, createNewCard(item))
});

//-----------------------------------------------------------------------------------------------------------------------------------
const formProfileEditValidator = new FormValidator(validationParameters, formProfileEditElement)
formProfileEditValidator.enableValidation()

const formAddCardValidator = new FormValidator(validationParameters, formAddCardElement)
formAddCardValidator.enableValidation()

//------------------------------------------------------------------------------------------------------------------------------------------------
popupButtonElementEditProfile.addEventListener('click', openPopupEditProfile);
popupButtonElementAddCard.addEventListener('click', openPopupAddCard);
//------------------------------------------------------------------------------------------------------------------------------------------------
popupCloseButtonElementAddCard.addEventListener('click', closePopupAddCard);
popupCloseButtonElementEditProfile.addEventListener('click', closePopupEditProfile);
popupCloseButtonElementImageFromCard.addEventListener('click', closePopupImageFromCard);
//------------------------------------------------------------------------------------------------------------------------------------------------
popupElementAddCard.addEventListener('click', closePopupByClickOnOverlay);
popupElementEditProfile.addEventListener('click', closePopupByClickOnOverlay);
popupElementImageFromCard.addEventListener('click', closePopupByClickOnOverlay);
//------------------------------------------------------------------------------------------------------------------------------------------------
popupElementAddCard.addEventListener('submit', handleProfileFormSubmitCreate);
popupElementEditProfile.addEventListener('submit', handleProfileFormSubmitSave);

