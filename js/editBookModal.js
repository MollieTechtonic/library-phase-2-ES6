function EditBookModal() {
  Library.call(this); //resets context
  this.$container = $('#edit-book-modal');
};

//Creates new library object
EditBookModal.prototype = Object.create(Library.prototype);

EditBookModal.prototype.init = function() {
  this._bindEvents();
};


EditBookModal.prototype._bindEvents = function() {
  // CAN'T GET THIS SUBMIT EVENT TO REGISTER... CLICK EVENT WORKS JUST FINE
  // $('#edit-form').on('submit', '#submit-edit-book', $.proxy(this.fireEdit, this));
  $('#edit-form').on('click', '#submit-edit-book', $.proxy(this.fireEdit, this));
};

EditBookModal.prototype.fireEdit = function(e) {
  e.preventDefault();
  console.log(e.currentTarget.form);
  // this.editBook();

};

$(function() {
  window.gEditBookModal = new EditBookModal();
  window.gEditBookModal.init();
});
