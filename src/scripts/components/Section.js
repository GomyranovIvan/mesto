export default class Section {
    constructor(renderer, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    };

    addCardFromArray(dataCard) {
        dataCard.forEach((item) => {
            this._renderer(item)
        })
    };

    addItemPrepend(element) {
        this._container.prepend(element);
    };

    addItemAppend(element) {
        this._container.append(element);
    };
}