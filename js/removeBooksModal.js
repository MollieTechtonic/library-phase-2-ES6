// All functional with ES6
class RemoveBooksModal extends Library {
  constructor() {
    super ();
    // CHANGED Library.call(this); //resets context
    this.$container = $('#remove-books-modal');
  }

  init() {
    this._bindEvents();
    this._bindCustomListeners();
  }

  _bindEvents() {
    $('#remove-book-button').on('click', $.proxy(this._removeBook, this));
  }

  _bindCustomListeners() {
    $(document).on('objUpdate', $.proxy(this._updateTable, this));
  }

  // REFACTOR BELOW FOR FUTURE EXPANSION - SERIALIZE ARRAY? DELETE BY OTHER PARAMETER THAN TITLE OR AUTHOR
  _removeBook() {

    // if a title AND an author are entered
    if ($('#title-remove-input').val() && $('#author-remove-input').val()) {
      // alert to enter one OR the other
      alert("Please enter either a title OR an author, not both.");

      // else if only a title is entered
    } else if ($('#title-remove-input').val()) {
      // assign title to a var
      var remove = $('#title-remove-input').val();
      // and run that title through removeBookByTitle
      var result = this.removeBookByTitle(remove);
      // if result evaluates to false, i.e. it can't find the book in the bookShelf
      if (!result) {
        alert("Sorry, we could not find your book;");
      }

      // OR, if only an author is entered
    } else if ($('#author-remove-input').val()) {
      // assign author to a var
      var remove = $('#author-remove-input').val();
      // and run that author through removeBookByAuthor
      var result = this.removeBookByAuthor(remove);
      // if result evaluates to false; i.e. it can't find that author
      if (!result) {
        alert("Sorry, we could not find any books by that author.");
      }
      // else if NEITHER are entered, alert to enter a value
    } else {
      alert("Please enter a title or author to remove a book");
    }
    // reset form
    $('#remove-book-form').trigger('reset');

    this.handleEventTrigger('objUpdate');
  }
}


//Creates new library object
// CHANGED RemoveBooksModal.prototype = Object.create(Library.prototype);


$(() => {
  window.gRemoveBooksModal = new RemoveBooksModal();
  window.gRemoveBooksModal.init();
});
