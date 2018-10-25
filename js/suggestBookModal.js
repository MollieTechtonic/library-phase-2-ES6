// All functional with ES6
class SuggestBooksModal extends Library {
  constructor() {
    super();
    // Library.call(this); //resets context
    this.$container = $('#book-display-modal');
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {
    // REFACTOR SUGGEST MODAL OPEN==================================================================================
    const _self = this;
    this.$container.on('shown.bs.modal', $.proxy(this._showRandom, this));
    this.$container.on('hidden.bs.modal', () => {
      _self.$container.find('.book-cover').empty();
      _self.$container.find('.modal-sidebar').empty();
      _self.$container.find('#display-book-header').empty();
    });
  }

  _showRandom() {
    const randomBook = this.getRandomBook();

    // HEADER TITLE
    $('#display-book-header').append(`<em>${randomBook.title}</em> by ${randomBook.author}`);

    // COVER
    $('.book-cover').append("<img>"); // add an image tag to the proper div
    const $newestImg = $('.book-cover img').last(); // target this new img tag and assign it to a var
    $newestImg.attr("src", randomBook.cover); // make the src of the new img tag the cover pic

    // BOOK INFO***************
    $('.modal-sidebar').append("<p></p>"); // add a p tag to the modal-sidebar div
    const $newestPTag = $('.modal-sidebar p').last().attr("id", "book-info-p-tag"); // grab the newest p tag and add info
    $newestPTag.html(`${randomBook.synopsis}<br><br>${randomBook.pages}<br><br>Publication Date: ${randomBook.date}<br><br>`);
    $('#book-info-p-tag').append(stars(randomBook.rating)[0]); //show star rating
  }
}

//Creates new library object
SuggestBooksModal.prototype = Object.create(Library.prototype);

$(() => {
  window.gSuggestBooksModal = new SuggestBooksModal();
  window.gSuggestBooksModal.init();
});
