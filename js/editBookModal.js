class EditBookModal extends Library {
  constructor() {
    super();
    // CHANGED Library.call(this); //resets context
    this.$container = $('#edit-book-modal');
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {
    // CAN'T GET THIS SUBMIT EVENT TO REGISTER... CLICK EVENT WORKS JUST FINE
    // $('#edit-form').on('submit', '#submit-edit-book', $.proxy(this.fireEdit, this));
    $('#edit-form').on('click', '#submit-edit-book', $.proxy(this.fireEdit, this));
  }

  fireEdit(e) {
    e.preventDefault();
    console.log(e.currentTarget.form);
    // this.editBook();

  }
}

//Creates new library object
// CHANGED EditBookModal.prototype = Object.create(Library.prototype);

$(() => {
  window.gEditBookModal = new EditBookModal();
  window.gEditBookModal.init();
});
