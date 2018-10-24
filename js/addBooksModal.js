function AddBooksModal() {
  Library.call(this); //resets context
  this.$container = $('#add-books-modal');
  // creates a new array for each instance to hold our queued up books
  this.queueArray = [];
  this.queueCounter = 0;
};


//Creates new library object
AddBooksModal.prototype = Object.create(Library.prototype);


AddBooksModal.prototype.init = function() {
  this._bindEvents();
  this._bindCustomListeners();
};


AddBooksModal.prototype._bindEvents = function() {
  $('#add-to-queue-form').on('submit', $.proxy(this._queueBooks, this));
  $('#add-books-button').on('click', $.proxy(this._addQueueToLib, this));
};


AddBooksModal.prototype._bindCustomListeners = function() {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
};


AddBooksModal.prototype._queueBooks = function (e) {
  e.preventDefault();
  // assign each form input a "name" - long way but wanted to play with jQuery some more
  $('#title-add-input').attr('name', "title");
  $('#author-add-input').attr('name', "author");
  $('#rating-add-input').attr('name', "rating");
  $('#pages-add-input').attr('name', "numberOfPages");
  $('#date-add-input').attr('name', "publishDate");
  $('#synopsis-add-input').attr('name', "synopsis");
  $('#cover-add-input').attr('name', "cover");
  // pull all input values via serializeArray and assign to a var
  var $arr = $('#add-to-queue-form').serializeArray();
  // console.log($arr);
  // turn this array of obj into a book-like object
  var myObj = {};
  myObj['cover'] = this._handleImageUpload();

  $.each($arr, function(index, entry) {
    console.log(entry);
    if (entry.value) {
      myObj[entry.name] = entry.value;
    }
  });
  // console.log(myObj);
  // var newObj = bookify(myObj);
  // console.log(newObj);
  // push this array to our queueArray
  // bookify below?? to solve out of order issue
  this.queueArray.push(myObj);
  console.log(this.queueArray);
  // reset form after book added to queue
  $('#add-to-queue-form').trigger('reset');
  // update counter after book added
  this.queueCounter++;
  // use jQuery to update DOM to show # of books queued
  $('#add-books-counter').text(this.queueCounter);
};

// check to see if queue is 0
AddBooksModal.prototype._addQueueToLib = function() {
  this.addBooks(this.queueArray);
  this.queueCounter = 0;
  this.queueArray = [];
  $('#add-books-counter').text(this.queueCounter);

  // this works but adds one column left of where it's supposed to go - happens when upload an image as well?????
  // fine upon reload...
  this.handleEventTrigger('objUpdate');
};


// NOT WORRIED ABOUT THE IMAGE YET
//Use the function below to add cover art as a base64 encoded string
//https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
//If you get stuck reference the documents in the link above
AddBooksModal.prototype._handleImageUpload = function() {
  var preview = document.querySelector('#addBookCoverImage');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.addEventListener("load", function() {
    preview.src = reader.result;
  }, false);

  if (file) {
    return reader.readAsDataURL(file);
  }
};


$(function() {
  window.gAddBooksModal = new AddBooksModal();
  window.gAddBooksModal.init();
});
