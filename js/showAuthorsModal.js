// All functional with ES6
class ShowAuthorsModal extends Library {
  constructor() {
    super ();
    // CHANGED Library.call(this); //resets context
    this.$container = $('#author-display-modal');
  }

  init() {
    this._bindEvents();
  }

  _bindEvents() {
    const _self = this;
    this.$container.on('shown.bs.modal', $.proxy(this._showAuthors, this));
    this.$container.on('hidden.bs.modal', () => {
      _self.$container.find("ul").empty();
    });
  }

  _showAuthors() {
    const _self = this;
    $.each(this.getAuthors(), function() {   // iterate over the array returned by the getAuthors() method
      _self.$container.find("ul").append("<li></li");     // append and new li for each obj
      const $newestLi = $('#author-display-modal ul li').last(); // grab that latest li created and and assign its text to the author property of "this" object
      $newestLi.text(this.author);
    });
  }
}

// CHANGED ShowAuthorsModal.prototype = Object.create(Library.prototype);


$(() => {
  window.gShowAuthorsModal = new ShowAuthorsModal();
  window.gShowAuthorsModal.init();
});
