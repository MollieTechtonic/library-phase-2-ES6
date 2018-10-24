function RandomAuthorModal() {
  Library.call(this); //resets context
  this.$container = $('#random-author-display-modal');
};


//Creates new library object
RandomAuthorModal.prototype = Object.create(Library.prototype);


RandomAuthorModal.prototype.init = function() {
  this._bindEvents();
};


RandomAuthorModal.prototype._bindEvents = function() {
  this.$container.on('shown.bs.modal', $.proxy(this._showRandom, this));
  this.$container.on('hidden.bs.modal', function() {
    $('#random-author-display-modal ul').empty();
  });
};


RandomAuthorModal.prototype._showRandom = function() {
  $('#random-author-display-modal ul').append("<li>" + this.getRandomAuthorName() + "</li>");
  // when modal closes, empty the ul section so that only one random author is ever shown

};


$(function() {
  window.gRandomAuthorModal = new RandomAuthorModal();
  window.gRandomAuthorModal.init();
});
