//Поиск
const popupElement = document.querySelector('.popup');
const popupElementEditProfile = document.querySelector('.popup_content_edit-profile');
const popupElementAddCard = document.querySelector('.popup_content_card');
const formElement = document.querySelector('.popup__form');
const formElementContentAdd = document.querySelector('.popup__form_content_add');
const formElementContentEdit = document.querySelector('.popup__form_content_edit')
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupElementPopupImage = document.querySelector('.popup_content_image');

//Закрытие popup
const popupCloseButtonElementEditProfil = popupElementEditProfile.querySelector('.popup__close');
const popupCloseButtonElementCard = popupElementAddCard.querySelector('.popup__close');
const popupImageCloseButtonElement = popupElementPopupImage.querySelector('.popup__close');
//Открытие popup
const popupEditButtonElement = document.querySelector('.profile__button-edit');
const popupAddButtonElement = document.querySelector('.profile__button-add');

//Инпуты
const nameInput = formElementContentEdit.querySelector('.popup__input_text_name');
const descriptionInput = formElementContentEdit.querySelector('.popup__input_text_description');
const cardNameInput = formElementContentAdd.querySelector('.popup__input_text_card-name');
const cardLinkInput = formElementContentAdd.querySelector('.popup__input_text_card-link');
//Cards
const cardsTemplate = document.querySelector('.cards-template').content;
const cardsList = document.querySelector('.cards');

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

//Добавление template-cards
initialCards.forEach(function (element){
  renderItem(element);
});

function renderItem(item) {
  const initialCardsElement = cardsTemplate.cloneNode(true);
  initialCardsElement.querySelector('.cards__caption').textContent = item.name;
  initialCardsElement.querySelector('.cards__image').src = item.link;
  initialCardsElement.querySelector('.cards__image').alt = item.name;
  cardsList.append(initialCardsElement);
};

//Добавлние карточки 
function handleFormSubmitCreate (evt) {
  evt.preventDefault();
  const initialCardsElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);
  let addLink = cardLinkInput.value;
  let addText = cardNameInput.value;
  initialCardsElement.querySelector('.cards__caption').textContent = addText;
  initialCardsElement.querySelector('.cards__image').src = addLink;
  initialCardsElement.querySelector('.cards__image').alt = 'Фотография' + addText;
  setEventListeners(initialCardsElement);
  cardsList.prepend(initialCardsElement);
  closePopup();
};


//Открытие popupEditProfile
const openPopupEditProfile = function () {
  nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    popupElementEditProfile.classList.add('popup_opened');
};

//Открытие popupAddCard
const openPopupAddCard = function () {
    popupElementAddCard.classList.add('popup_opened');

};

//Открытие popupImage
const handleOpenPopupImage = function (evt) {
    popupElementPopupImage.querySelector('.popup__image').src = evt.target.src;
    popupElementPopupImage.querySelector('.popup__caption').textContent = evt.target.alt;
    popupElementPopupImage.classList.add('popup_opened');
  
};

//Закрытие popup
const closePopup = function () {
    popupElementAddCard.classList.remove('popup_opened');
    popupElementEditProfile.classList.remove('popup_opened');
    popupElementPopupImage.classList.remove('popup_opened');
};

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmitSave (evt) {
    evt.preventDefault(); 
    console.log(evt);
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup()
};

//Удаление карточки
function handleDelete (event) {
  const card = event.target.closest('.cards__item');
  card.remove();
};

//Лайк карточки
function handleLike (event) {
  const likeTarget = event.target;
  likeTarget.classList.toggle('cards__like_active');
};

const setEventListeners = function (initialCardsElement) {
  initialCardsElement.querySelector('.cards__delete').addEventListener('click', handleDelete);
  initialCardsElement.querySelector('.cards__like').addEventListener('click', handleLike);
  initialCardsElement.querySelector('.cards__image').addEventListener('click', handleOpenPopupImage);
};

cardsList.querySelectorAll('.cards__delete').forEach((item) => {item.addEventListener('click', handleDelete)});
cardsList.querySelectorAll('.cards__like').forEach((item) => {item.addEventListener('click', handleLike)});
cardsList.querySelectorAll('.cards__image').forEach((item) => {item.addEventListener('click', handleOpenPopupImage)});

popupEditButtonElement.addEventListener('click', openPopupEditProfile);
popupCloseButtonElementCard.addEventListener('click', closePopup);
popupCloseButtonElementEditProfil.addEventListener('click', closePopup);
popupImageCloseButtonElement.addEventListener('click', closePopup);
popupAddButtonElement.addEventListener('click', openPopupAddCard);
popupElementAddCard.addEventListener('submit', handleFormSubmitCreate)
popupElementEditProfile.addEventListener('submit', handleFormSubmitSave);