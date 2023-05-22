import Card from './card.js';
import FormValidator from './formValidator.js';
//---------------------------------------------------------------------------------------------------------------------------
//Элементы профиля\

const profileElement = document.querySelector('.profile');
const profileElementName = profileElement.querySelector('.profile__name');
const profileElementDescription = profileElement.querySelector('.profile__description');

//---------------------------------------------------------------------------------------------------------------------------
//Элементы попапа редактирования профиля\
const popupElementEditProfile = document.querySelector('.popup_content_edit-profile');
const formProfileEditElement = document.forms.popupFormProfileEdit;
const popupEditProfileElementNameInput = formProfileEditElement.querySelector('.popup__input_text_name');
const popupEditProfileElementDescriptionInput = formProfileEditElement.querySelector('.popup__input_text_description');
//Кнопка открытия\
const popupButtonElementEditProfile = profileElement.querySelector('.profile__button-edit');
//Кнопка закрытия\
const popupCloseButtonElementEditProfile = popupElementEditProfile.querySelector('.popup__close_edit-profile');

//---------------------------------------------------------------------------------------------------------------------------
//Элементы попапа добавления карточек\
const popupElementAddCard = document.querySelector('.popup_content_card');
const formAddCardElement = document.forms.popupFormAddImage;
const popupAddCardElementNameInput = formAddCardElement.querySelector('.popup__input_text_caption');
const popupAddCardElementLinkInput = formAddCardElement.querySelector('.popup__input_text_link');
//Кнопка открытия\
const popupButtonElementAddCard = profileElement.querySelector('.profile__button-add');
//Кнопка закрытия\
const popupCloseButtonElementAddCard = popupElementAddCard.querySelector('.popup__close_add');

//---------------------------------------------------------------------------------------------------------------------------
//Элементы попапа открытия картинки\

const popupElementImageFromCard = document.querySelector('.popup_content_image');
const popupElementImageFromCardOpenedImg = popupElementImageFromCard.querySelector('.popup__image');
const popupElementImageFromCardOpenedCaption = popupElementImageFromCard.querySelector('.popup__caption');
//Закрытие\
const popupCloseButtonElementImageFromCard = popupElementImageFromCard.querySelector('.popup__close_image');

//---------------------------------------------------------------------------------------------------------------------------
//Cards\
const selectorTemplate = '#cards-template'
const cardsElementsPlace = document.querySelector('.cards');

//-----------------------------------------------------------------------------------------------------------------------------------
//Массив по умолчанию\

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
//Общие параметры для валидации отдельно взятой формы\

const validationParameters = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  errorTemplateSelector: '.popup__error_type_',
  inactiveButtonClass: 'popup__button-submit_disable',
  inputErrorClass: 'popup__input_invalid',
};

//---------------------------------------------------------------------------------------------------------------------------------
//Общие ФУНКЦИИ открытия закрытия\
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKeyEscape);
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKeyEscape);
};

//---------------------------------------------------------------------------------------------------------------------------------
//ФУНКЦИЯ закрытия любого попапа на КЛАВИШУ ESC путём поиска в документе дом элемента '.popup_opened' и удаления его с помощью общей функции закрытия попапа\
const closePopupByKeyEscape = function (event) {
  if (event.key === 'Escape') {
    const popupElementOpened = document.querySelector('.popup_opened');
    closePopup(popupElementOpened);
  }
}

//---------------------------------------------------------------------------------------------------------------------------------
//Функция закрытия любого попапа НАЖАТИЕМ МЫШКОЙ НА ФОН\
//если событие клика не равно другому событию то попап закрывается\
const closePopupByClickOnOverlay = function (event) {
  if (event.currentTarget == event.target) {
    closePopup(event.currentTarget);
  }
};


//---------------------------------------------------------------------------------------------------------------------------------
//ФУНКЦИЯ\
//открытие ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ\
//отображения текущих значений профиля в инпутах формы\
//ресета ошибок валидации\
const openPopupEditProfile = function () {
  formProfileEditValidator.resetErrorForOpenForm();
  popupEditProfileElementNameInput.value = profileElementName.textContent;
  popupEditProfileElementDescriptionInput.value = profileElementDescription.textContent;
  openPopup(popupElementEditProfile);
};

//Закрытие PopupEditProfile\
const closePopupEditProfile = function () {
  closePopup(popupElementEditProfile);
};

//---------------------------------------------------------------------------------------------------------------------------------
//ФУНКЦИЯ\
//oткрытие ПОПАПА ДОБАВЛЕНИЯ КАРТОЧЕК\
//ресета инпутов при повторном открытии попапа\
//ресета ошибок валидации\
const openPopupAddCard = function () {
  formAddCardElement.reset()
  formAddCardValidator.resetErrorForOpenForm();
  openPopup(popupElementAddCard);
};

//Закрытие PopupAddCard
const closePopupAddCard = function () {
  closePopup(popupElementAddCard);
};

//---------------------------------------------------------------------------------------------------------------------------------
//ФУКЦИЯ присваивания ссылки и названия объекта открытому попапу\
//открытие ПОПАПА С ОТКРЫТИЕМ КАРТИНКИ\
const handleOpenImageFromCard = function (object) {
  popupElementImageFromCardOpenedImg.src = object.link;
  popupElementImageFromCardOpenedImg.alt = 'Фотография ' + object.name;
  popupElementImageFromCardOpenedCaption.textContent = object.name;
  openPopup(popupElementImageFromCard);
};

//Закрытие PopupImageFromCard
const closePopupImageFromCard = function () {
  closePopup(popupElementImageFromCard);
};

//---------------------------------------------------------------------------------------------------------------------------------
//ФУНКЦИЯ отправки ФОРМЫ на сервер\
//отмена события Submit браузера по умолчанию\
//присваивание значений профиля инпутам попапа\
//закрытие ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ при нажатии на кнопку СОХРАНИТЬ\
function handleProfileFormSubmitSave(evt) {
  evt.preventDefault();
  profileElementName.textContent = popupEditProfileElementNameInput.value;
  profileElementDescription.textContent = popupEditProfileElementDescriptionInput.value;
  closePopup(popupElementEditProfile)
};

//ФУНКЦИЯ где мы берём значения из инпутов попапа создания карточки и присваиваем эти значения в функцию добавления карточки в разметку\
//отмена события Submit браузера по умолчанию\
//закрытие ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ при нажатии на кнопку ДОБАВИТЬ\
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
//ФУНКЦИЯ где мы создаем карточку с помощью экземпляра класса Card\
const createNewCard = function (item) {
  //класс принял параметры (объект из массива, контейнер куда кладутся объекты(карточки), функцию для открытия попапа картинки)\
  const card = new Card(item, selectorTemplate, handleOpenImageFromCard);
  const cardElement = card.createCard()
  return cardElement
};

//ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ в разметку где они должны отображаться\
const renderCard = function (placeCard, card) {
  placeCard.prepend(card);
};

//МЕТОД где мы пробегаемся по массиву и применяем к каждому объекту ФУНКЦИЮ ДОБАВЛЕНИЯ КАРТОЧКИ\
initialCards.forEach((item) => {

  renderCard(cardsElementsPlace, createNewCard(item))
});

//-----------------------------------------------------------------------------------------------------------------------------------
//ЭКЗЕМПЛЯР класса FormValidation для формы ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ\
//навешали слушатели на форму РЕДАКТИРОВАНИЯ ПРОФИЛЯ\
const formProfileEditValidator = new FormValidator(validationParameters, formProfileEditElement);
formProfileEditValidator.enableValidation()

//ЭКЗЕМПЛЯР класса FormValidation для формы ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ\
//навешали слушатели на форму ДОБАВЛЕНИЯ КАРТОЧЕК\
const formAddCardValidator = new FormValidator(validationParameters, formAddCardElement);
formAddCardValidator.enableValidation()

//------------------------------------------------------------------------------------------------------------------------------------------------
//СЛУШАТЕЛИ для ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
popupButtonElementEditProfile.addEventListener('click', openPopupEditProfile);
popupCloseButtonElementEditProfile.addEventListener('click', closePopupEditProfile);
popupElementEditProfile.addEventListener('mousedown', closePopupByClickOnOverlay);
popupElementEditProfile.addEventListener('submit', handleProfileFormSubmitSave);

//------------------------------------------------------------------------------------------------------------------------------------------------
//СЛУШАТЕЛИ для ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ
popupButtonElementAddCard.addEventListener('click', openPopupAddCard);
popupCloseButtonElementAddCard.addEventListener('click', closePopupAddCard);
popupElementAddCard.addEventListener('mousedown', closePopupByClickOnOverlay);
popupElementAddCard.addEventListener('submit', handleProfileFormSubmitCreate);

//------------------------------------------------------------------------------------------------------------------------------------------------
//СЛУШАТЕЛИ для ПОПАПА С ОТКРЫТИЕМ КАРТИНКИ
popupCloseButtonElementImageFromCard.addEventListener('click', closePopupImageFromCard);
popupElementImageFromCard.addEventListener('click', closePopupByClickOnOverlay);
//------------------------------------------------------------------------------------------------------------------------------------------------



