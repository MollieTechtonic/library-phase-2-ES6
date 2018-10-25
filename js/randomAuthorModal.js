// All functional with ES6
class RandomAuthorModal extends Library {
  constructor() {
    super();
    // CHANGED Library.call(this); //resets context
    this.$container = $('#random-author-display-modal');
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {
    this.$container.on('shown.bs.modal', $.proxy(this._showRandom, this));
    this.$container.on('hidden.bs.modal', () => {
      $('#random-author-display-modal ul').empty();
    });
  }

  _showRandom() {
    $('#random-author-display-modal ul').append(`<li>${this.getRandomAuthorName()}</li>`);

  }
}


//Creates new library object
// CHANGED RandomAuthorModal.prototype = Object.create(Library.prototype);


$(() => {
  window.gRandomAuthorModal = new RandomAuthorModal();
  window.gRandomAuthorModal.init();
});
