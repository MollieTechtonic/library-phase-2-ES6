// constructor - when run at the bottom, creates an instance of dataTable
function DataTable() {
  // RESETS THE CONTEXT TO JUST THIS CONTAINER - HAVE TO CALL FOR EVERY SINGLE MODULE
  // call() method ==> an object can use a method belonging to another object
  Library.call(this);
  // ASSIGN VALUE TO WHATEVER WE ARE TRYING TO TARGET
  this.$container = $('#data-table');
};

// Creates a new library object
// MAKES LIBRARY METHODS AVAILABLE TO DATATABLE?? CONTEXT INSIDE OF THE METHODS WILL STILL BE WRONG WHICH IS WHY WE DO LIBRARY.CALL(THIS) ABOVE
DataTable.prototype = Object.create(Library.prototype);


DataTable.prototype.init = function() {
  this._bindEvents();
  this._bindCustomListeners();
  this._updateStorage(); //all logic branches off _updateStorage call _updateTable, so this._updateTable is no longer necessary
};


DataTable.prototype._bindEvents = function() {
  $('#search-form').on('submit', $.proxy(this._handleSearch, this));
  $('#show-books-button').on('click', $.proxy(this._showAllBooks, this));
  $('#delete-selected').on('click', $.proxy(this._deleteBooks, this));
  $(document).on('click', '.edit-bk-btn', $.proxy(this._editBook, this));
};


DataTable.prototype._bindCustomListeners = function() {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
  //This is a global object that can be accessed as window.bookShelf. This will hold the state of your bookShelf.
};


DataTable.prototype._handleSearch = function(e) {
  // prevent default since we are using a submit event
  e.preventDefault();
  // serialize the form inputs
  var serArr = $('#search-form').serializeArray();
  // convert them to an object
  var myObj = {};
  $.each(serArr,function(index, entry){
    if(entry.value){
      myObj[entry.name] = entry.value;
    }
  });
  // run this obj through our search function; returns an array of book(s)
  var searchResults = this.search(myObj);
  // not really sure what this does....
  // custom event showing that an object has been updated? What obj? the DOM?
  this.handleEventTrigger('objUpdate', searchResults);
  // reset form
  $('#search-form').trigger('reset');
  // why return false???
  return false;
};


DataTable.prototype._showAllBooks = function() {
  this._updateStorage();
};


DataTable.prototype._updateTable = function(e) {
  console.log("stuff in update table below");
  console.log(e.detail);
  this._makeTable(e.detail);
};


DataTable.prototype._makeTable = function(books) {
  var _self = this;
  var $tbody = this.$container.find('tbody');
  $tbody.empty();
  $('#books-table-head').html(this._createHead(new Book({})));
  $.each(books, function(index, book){
    $tbody.append(_self._createRow(book));
  });
};


DataTable.prototype._createHead = function(book) {
  var tr = $('<tr>');
  for (var key in book) {
    var th = $('<th>').text(spacesToCamelCase(key));
    tr.append(th)
  }
  var dTH = $('<th>').text('Delete Book');
  tr.append(dTH);
  return tr;
};


DataTable.prototype._createRow = function(book) {
  var tr = $('<tr>');
  //This created our delete column
  // added class del-box to delete box to target more specifically
  var deleteInput = $('<input>').attr({'type': 'checkbox', 'class': 'del-box'});
  var editButton = $('<button>').attr({'type': 'button', 'class': 'btn btn-default edit-bk-btn', 'data-toggle': 'modal', 'data-target': '#edit-book-modal'}).text("Edit");
  for(var key in book){
    var td = $('<td>');
    if (key === 'cover') {
      var img = $('<img>').addClass('tableImg').attr('src', book[key]);
      $(td).html(img);
    } else if(key === 'rating'){
      $(td).html(stars(book[key]));
      // ADDED THE BELOW - FOR EACH BOOK ADDED, GIVE THE DELETEINPUT CHECKBOX AND THE EDIT BOOK BUTTON A DATA ATTR EQUAL TO THE TITLE!!!
    } else if(key === 'title'){
      $(deleteInput).data('title', book[key]);
      $(editButton).data('title', book[key]);
      // console.log($(editButton).data('title'));
      // ALSO HAVE TO ASSIGN THE HTML TO EQUAL THE BOOK TITLE AS WELL - SIMILAR TO OTHERS ABOVE
      $(td).html(book[key]);
    } else if(key === 'editBook') {
      $(td).append(editButton);
    } else {
      $(td).html(key === 'synopsis' ? book[key].substring(0,85) + "..." : book[key]);
    }
    tr.append(td);
  }
  var deleteTd = $('<td>');
  $(deleteTd).append(deleteInput);
  tr.append(deleteTd);
  return tr;
};


DataTable.prototype._deleteBooks = function() {
  var myArr = $(".del-box:checked");
  // console.log(myArr);
  for (var i = 0; i < myArr.length; i++) {
    // had to wrap myArr[i] in jquery because the data attr was assigned with jQuery!!! I think... ask Brett as he helped me conceptualize this
    this.removeBookByTitle($(myArr[i]).data('title'));
    // console.log($(myArr[i]).data('title') + " was removed!");
  }
  // update table
  this.handleEventTrigger('objUpdate');
};

DataTable.prototype._editBook = function (e) {
  e.preventDefault();
  // find the closest row and traverse to find the title
  title = e.currentTarget.closest('tr').children[1].innerText;
  // console.log(title);
  // run the title through getBookByTitle (first entry in the array returned) and assign it to bookToEdit
  var bookToEdit = this.getBookByTitle(title)[0];
  console.log(bookToEdit.publishDate);

  // prepopulate the form fields with the current info
  // HOW TO HANDLE DATE AND COVER?????
  $('#title-edit-input').val(bookToEdit.title);
  $('#author-edit-input').val(bookToEdit.author);
  $('#rating-edit-input').val(bookToEdit.rating);
  $('#pages-edit-input').val(bookToEdit.numberOfPages);
  // $('#date-edit-input').val(bookToEdit.publishDate);
  $('#synopsis-edit-input').val(bookToEdit.synopsis);
  // $('#cover-edit-input').val(bookToEdit.cover);

  // ANYTHING ELSE NEEDED HERE? NEXT STEP IS TO CALL THE CLICKEVENT AND SUBMIT THE NEW VALUES THAT ARE ENTERED
};


DataTable.prototype._updateStorage = function() {
  if (window.localStorage.length > 0) {
    console.log('BOOKSHELF EXISTS SETTING VALUE');
    window.bookShelf = this.getStorage();
    this.handleEventTrigger('objUpdate',window.bookShelf);
  } else {
    console.log('BOOKSHELF DOES NOT EXIST ADDING BOOKS!');

    this.addBooks(bookify(bookList));
    this.handleEventTrigger('objUpdate',window.bookShelf);
    this.setStorage();
  }
};

//This is the document ready that will create a new instance of DataTable
//HINT: Each class||object will need a new instance to be initalized on document ready!
$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
