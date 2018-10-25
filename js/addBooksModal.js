// All functional with ES6
class AddBooksModal extends Library {
  constructor() {
    super();
    // CHANGED Library.call(this); //resets contex
    this.$container = $('#add-books-modal');
    // creates a new array for each instance to hold our queued up books
    this.queueArray = [];
    this.queueCounter = 0;
  }

  init() {
    this._bindEvents();
    this._bindCustomListeners();
  }

  _bindEvents() {
    $('#add-to-queue-form').on('submit', $.proxy(this._queueBooks, this));
    $('#add-books-button').on('click', $.proxy(this._addQueueToLib, this));
  }

  _bindCustomListeners() {
    $(document).on('objUpdate', $.proxy(this._updateTable, this));
  }

  _queueBooks(e) {
    e.preventDefault();
    // took this out and added names in on index.html to see if I could fix ordering issue. Alas.........
    // assign each form input a "name" - long way but wanted to play with jQuery some more
    // $('#title-add-input').attr('name', "title");
    // $('#author-add-input').attr('name', "author");
    // $('#rating-add-input').attr('name', "rating");
    // $('#pages-add-input').attr('name', "numberOfPages");
    // $('#date-add-input').attr('name', "publishDate");
    // $('#synopsis-add-input').attr('name', "synopsis");
    // $('#cover-add-input').attr('name', "cover");
    // pull all input values via serializeArray and assign to a var
    const $arr = $('#add-to-queue-form').serializeArray();
    // console.log($arr);
    // ADDING TO THE DATATABLE IN THE ORDER OF THE SERIALIZED ARRAY! HOW THE HECK DO I FIX THIS?
    // FINE UPON RELOAD
    // turn this array of obj into a book-like object
    const myObj = {};
    myObj['cover'] = this._handleImageUpload();

    $.each($arr, (index, entry) => {
      // console.log(entry);
      if (entry.value) {
        myObj[entry.name] = entry.value;
      }
    });
    console.log(myObj);

    // bookified myObj to try and fix misorder issue. Alas....
    // const bookToBookify = [myObj];
    // console.log(bookToBookify);
    //
    // const bookifiedBook = bookify(bookToBookify);
    // console.log(bookToBookify);
    //
    // const newBook = bookToBookify[0];
    // console.log(newBook);

    // push this array to our queueArray
    // bookify below?? to solve out of order issue
    this.queueArray.push(myObj);
    // this.queueArray.push(newBook);
    console.log(this.queueArray);
    // reset form after book added to queue
    $('#add-to-queue-form').trigger('reset');
    // update counter after book added
    this.queueCounter++;
    // use jQuery to update DOM to show # of books queued
    $('#add-books-counter').text(this.queueCounter);
  }

  // check to see if queue is 0
  _addQueueToLib() {
    this.addBooks(this.queueArray);
    this.queueCounter = 0;
    this.queueArray = [];
    $('#add-books-counter').text(this.queueCounter);

    this.handleEventTrigger('objUpdate');
    this.handleEventTrigger('objUpdate');
  }

  // NOT WORRIED ABOUT THE IMAGE YET
  //Use the function below to add cover art as a base64 encoded string
  //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  //If you get stuck reference the documents in the link above
  _handleImageUpload() {
    const preview = document.querySelector('#addBookCoverImage');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      preview.src = reader.result;
    }, false);

    if (file) {
      return reader.readAsDataURL(file);
    }
  }
}


//Creates new library object
// CHANGED AddBooksModal.prototype = Object.create(Library.prototype);


$(() => {
  window.gAddBooksModal = new AddBooksModal();
  window.gAddBooksModal.init();
});
