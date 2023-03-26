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
const popupEditButtonElementProfile = profileElement.querySelector('.profile__button-edit');
const popupAddButtonElementCard = profileElement.querySelector('.profile__button-add');
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
function createCard({name, link,})  {
  const initialCardsElement = cardsElementsTemplate.querySelector('.cards__item').cloneNode(true); 
  const initialCardsElementImage = initialCardsElement.querySelector('.cards__image');
  initialCardsElementImage.src = link;
  initialCardsElementImage.alt = 'Фотография ' + name;
  initialCardsElement.querySelector('.cards__caption').textContent = name;
  initialCardsElement.querySelector('.cards__delete').addEventListener('click', handleDelete);
  initialCardsElement.querySelector('.cards__like').addEventListener('click', handleLike);
  initialCardsElement.querySelector('.cards__image').addEventListener('click', function () {
    popupOpen(popupElementImageFromCard);
    popupElementImageFromCardOpenedImg.src = link;
    popupElementImageFromCardOpenedImg.alt = 'Фотография ' + name;
    popupElementImageFromCardOpenedCaption.textContent = name;
  });
  
  return initialCardsElement; 
};

function renderCard(item) {
  const initialCardsElement  = createCard(item); 
  cardsElementsPlace.prepend(initialCardsElement);
};

function insert() {
  initialCards.forEach(renderCard);
  
};

insert();

function handleFormSubmitCreate(evt) {
  evt.preventDefault();
  
  const item = {
      name: popupAddCardElementNameInput.value,
      link: popupAddCardElementLinkInput.value
  };

  renderCard(item);
  closePopup(popupElementAddCard);
};

function popupOpen(popup) {
  popup.classList.add('popup_opened');
};

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
};

//Открытие popupEditProfile--------------------------------------------------------------------------------------------------------
const openPopupEditProfile = function () {
  popupEditProfileElementNameInput.value = profileElementName.textContent;
  popupEditProfileElementDescriptionInput.value = profileElementDescription.textContent;
  popupOpen(popupElementEditProfile);
};

const closePopupImageFromCard = function () {
  closePopup(popupElementImageFromCard)
}

const closePopupAddCard = function () {
  closePopup(popupElementAddCard)
}

const closePopupEditProfile = function () {
  closePopup(popupElementEditProfile)
  console.log(closePopup(popupCloseButtonElementEditProfile))
}
//Открытие popupAddCard
const openPopupAddCard = function () {
  popupOpen(popupElementAddCard);
};

//Закрытие popup
// const closePopup = function (popup) {
//   popup.classList.remove('popup_opened');
//   // popupElementAddCard.classList.remove('popup_opened');
//   // popupElementEditProfile.classList.remove('popup_opened');
//   // popupElementPopupImageFromCard.classList.remove('popup_opened');
// };

//Отправка формы 
function handleFormSubmitSave(evt) {
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

//------------------------------------------------------------------------------------------------------------------------------------------------
popupEditButtonElementProfile.addEventListener('click', openPopupEditProfile);
popupAddButtonElementCard.addEventListener('click', openPopupAddCard);
//------------------------------------------------------------------------------------------------------------------------------------------------
popupCloseButtonElementAddCard.addEventListener('click', closePopupAddCard);
popupCloseButtonElementEditProfile.addEventListener('click', closePopupEditProfile);
popupCloseButtonElementImageFromCard.addEventListener('click', closePopupImageFromCard);
//------------------------------------------------------------------------------------------------------------------------------------------------
popupElementAddCard.addEventListener('submit', handleFormSubmitCreate);
popupElementEditProfile.addEventListener('submit', handleFormSubmitSave);

