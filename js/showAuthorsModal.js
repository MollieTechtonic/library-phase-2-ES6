function ShowAuthorsModal() {
  Library.call(this); //resets context
  this.$container = $('#author-display-modal');
};

ShowAuthorsModal.prototype = Object.create(Library.prototype);

ShowAuthorsModal.prototype.init = function() {
  this._bindEvents();
};

ShowAuthorsModal.prototype._bindEvents = function() {
  var _self = this;
  this.$container.on('shown.bs.modal', $.proxy(this._showAuthors, this));
  this.$container.on('hidden.bs.modal', function() {
    _self.$container.find("ul").empty();
  });
};

ShowAuthorsModal.prototype._showAuthors = function() {
  var _self = this;
  $.each(this.getAuthors(), function() {   // iterate over the array returned by the getAuthors() method
    _self.$container.find("ul").append("<li></li");     // append and new li for each obj
    var $newestLi = $('#author-display-modal ul li').last(); // grab that latest li created and and assign its text to the author property of "this" object
    $newestLi.text(this.author);
  });
};


$(function() {
  window.gShowAuthorsModal = new ShowAuthorsModal();
  window.gShowAuthorsModal.init();
});
