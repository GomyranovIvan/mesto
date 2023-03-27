//Поиск ---------------------------------------------------------------------------------------------------------------------------

//Попапы
const popupElementEditProfile = document.querySelector('.popup_content_edit-profile');
const popupElementAddCard = document.querySelector('.popup_content_card');
const popupElementImageFromCard = document.querySelector('.popup_content_image');
const popupElementImageFromCardOpenedImg = document.querySelector('.popup__image');
const popupElementImageFromCardOpenedCaption = document.querySelector('.popup__caption');

//Формы
const popupFormElement = document.querySelector('.popup__form');
const popupFormElementContentAddCard = popupElementAddCard.querySelector('.popup__form_content_add');
const popupFormElementContentEditProfile = popupElementEditProfile.querySelector('.popup__form_content_edit');

//Профиль
const profileElement = document.querySelector('.profile');
const profileElementName = profileElement.querySelector('.profile__name');
const profileElementDescription = profileElement.querySelector('.profile__description');

//Cards
const cardsElementsTemplate = document.querySelector('.cards-template').content;
const cardsElementsPlace = document.querySelector('.cards');

//Кнопки----------------------------------------------------------------------------------------------------------------------------

//Закрытие popup
const popupCloseButtonElementEditProfile = popupElementEditProfile.querySelector('.popup__close_edit-profile');
const popupCloseButtonElementAddCard = popupElementAddCard.querySelector('.popup__close_add');
const popupCloseButtonElementImageFromCard = popupElementImageFromCard.querySelector('.popup__close_image');

//Открытие popup
const popupButtonElementEditProfile = profileElement.querySelector('.profile__button-edit');
const popupButtonElementAddCard = profileElement.querySelector('.profile__button-add');
//-----------------------------------------------------------------------------------------------------------------------------------

//Инпуты EditProfile
const popupEditProfileElementNameInput = popupFormElementContentEditProfile.querySelector('.popup__input_text_name');
const popupEditProfileElementDescriptionInput = popupFormElementContentEditProfile.querySelector('.popup__input_text_description');

//Инпуты AddCard
const popupAddCardElementNameInput = popupFormElementContentAddCard.querySelector('.popup__input_text_card-name');
const popupAddCardElementLinkInput = popupFormElementContentAddCard.querySelector('.popup__input_text_card-link');
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
//-----------------------------------------------------------------------------------------------------------------------------------
function createCard(object) {
  const initialCardsElement = cardsElementsTemplate.querySelector('.cards__item').cloneNode(true);
  const initialCardsElementImage = initialCardsElement.querySelector('.cards__image');
  const initialCardsElementDelete = initialCardsElement.querySelector('.cards__delete');
  const initialCardsElementLike = initialCardsElement.querySelector('.cards__like');
  initialCardsElementImage.src = object.link;
  initialCardsElementImage.alt = 'Фотография ' + object.name;
  initialCardsElement.querySelector('.cards__caption').textContent = object.name;

  setEventListener(initialCardsElementLike, initialCardsElementDelete, initialCardsElementImage, object);

  return initialCardsElement;
};

function renderCard(item) {
  const initialCardsElement = createCard(item);
  cardsElementsPlace.prepend(initialCardsElement);
};

initialCards.forEach((item) => {
  const card = createCard(item);
  cardsElementsPlace.append(card)
});
//----------------------------------------------------------------------------------------------------------------------------------
//Функция открытия изображения
function handleOpenImage(object) {
  popupElementImageFromCardOpenedImg.src = object.link;
  popupElementImageFromCardOpenedImg.alt = 'Фотография ' + object.name;
  popupElementImageFromCardOpenedCaption.textContent = object.name;
  openPopup(popupElementImageFromCard);
};

//---------------------------------------------------------------------------------------------------------------------------------
//Функция создания карточки
function handleProfileFormSubmitCreate(evt) {
  evt.preventDefault();

  const item = {
    name: popupAddCardElementNameInput.value,
    link: popupAddCardElementLinkInput.value
  };
  renderCard(item);
  closePopup(popupElementAddCard);
  evt.target.reset();
};

//---------------------------------------------------------------------------------------------------------------------------------
//Общие функции открытия закрытия
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
};

//---------------------------------------------------------------------------------------------------------------------------------
//Открытие popupEditProfile
const openPopupEditProfile = function () {
  popupEditProfileElementNameInput.value = profileElementName.textContent;
  popupEditProfileElementDescriptionInput.value = profileElementDescription.textContent;
  openPopup(popupElementEditProfile);
};

//Открытие popupAddCard
const openPopupAddCard = function () {
  openPopup(popupElementAddCard);
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
//Отправка формы 
function handleProfileFormSubmitSave(evt) {
  evt.preventDefault();
  profileElementName.textContent = popupEditProfileElementNameInput.value;
  profileElementDescription.textContent = popupEditProfileElementDescriptionInput.value;
  closePopup(popupElementEditProfile)
};

//Удаление карточки
function handleDelete(event) {
  const card = event.target.closest('.cards__item');
  card.remove();
};

//Лайк карточки
function handleLike(event) {
  const likeTarget = event.target;
  likeTarget.classList.toggle('cards__like_active');
};
//-----------------------------------------------------------------------------------------------------------------------------------------------
//Слушатели для карточек
function setEventListener(like, trash, image, object) {
  like.addEventListener('click', handleLike);
  trash.addEventListener('click', handleDelete);
  image.addEventListener('click', () => {
    handleOpenImage(object);
    openPopup(popupElementImageFromCard);
  });
};
//------------------------------------------------------------------------------------------------------------------------------------------------
popupButtonElementEditProfile.addEventListener('click', openPopupEditProfile);
popupButtonElementAddCard.addEventListener('click', openPopupAddCard);
//------------------------------------------------------------------------------------------------------------------------------------------------
popupCloseButtonElementAddCard.addEventListener('click', closePopupAddCard);
popupCloseButtonElementEditProfile.addEventListener('click', closePopupEditProfile);
popupCloseButtonElementImageFromCard.addEventListener('click', closePopupImageFromCard);
//------------------------------------------------------------------------------------------------------------------------------------------------
popupElementAddCard.addEventListener('submit', handleProfileFormSubmitCreate);
popupElementEditProfile.addEventListener('submit', handleProfileFormSubmitSave);

