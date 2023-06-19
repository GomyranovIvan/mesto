export default class Section {
    constructor( { items, renderer }, conteinerSelector) {
       this._container = document.querySelector(conteinerSelector);
       this._initialCard = items;
       this.renderer = renderer;
    };

    addItem(domElement) {
        this._container.prepend(domElement);
    };

    addCardFromArray() {
        this._initialCard.forEach((item) => {
           this.addItem(this.renderer(item))
        })
    };
}