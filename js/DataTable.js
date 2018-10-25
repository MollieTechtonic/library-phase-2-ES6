// All functional with ES6
// CHANGED*****************DATATABLE IS NOW DECLARED AS A SUBCLASS OF THE PARENT LIBRARY USING CLASS/EXTENDS**************************
class DataTable extends Library {
  // CHANGED***************WE EXPLICITLY DEFINE OUR DATATABLE CONSTRUCTOR HERE FOR CLARITY - REPLACES FUNCTION DATATABLE()**************
  constructor() {
    // CHANGED*************HERE WE USE SUPER TO CALL THE PARENT CLASS "LIBRARY". ENSURES THAT DATATABLE IS A SUBCLASS OF LIBRARY - REPLACES LIBRARY.CALL(THIS)**************************
    super();

    // CHANGED*************PREVIOUSLY, THIS CODE WAS NEEDED TO INHERIT THE LIBRARY CONSTRUCTOR'S INFO AND METHODS***************
    // CHANGED*************LIBRARY.CALL(THIS) IS NOW UNNECESSARY SINCE WE ARE USING ES6 EXTENDS AND SUPER WHICH DO THE EXACT SAME THING*****************************
    // Library.call(this);

    this.$container = $('#data-table');
  // ***************  ";"  ARE ELIMINATED FROM THE END OF MOST FUNCTIONS****************************
  }

  // CHANGED***************ALL CONSTRUCTOR PROTOTYPED METHODS ARE NOW INCLUDED INSIDE THE BODY OF THE CLASS AND ARE NOT DELCARED WITH THE FUNCTION KEYWORD**************************************
  init() {
    this._bindEvents();
    this._bindCustomListeners();
    this._updateStorage(); //all logic branches off _updateStorage call _updateTable, so this._updateTable is no longer necessary
  }

  _bindEvents() {
    $('#search-form').on('submit', $.proxy(this._handleSearch, this));
    $('#show-books-button').on('click', $.proxy(this._showAllBooks, this));
    $('#delete-selected').on('click', $.proxy(this._deleteBooks, this));
    $(document).on('click', '.edit-bk-btn', $.proxy(this._editBook, this));
  }

  _bindCustomListeners() {
    $(document).on('objUpdate', $.proxy(this._updateTable, this));
    //This is a global object that can be accessed as window.bookShelf. This will hold the state of your bookShelf.
  }

  _handleSearch(e) {
    // prevent default since we are using a submit event
    e.preventDefault();
    // serialize the form inputs

    // CHANGED******************VARS HAVE BEEN CHANGEd TO CONST*****************************************
    const serArr = $('#search-form').serializeArray();
    // convert them to an object
    const myObj = {};

    // CHANGED******************STANDARD FUNCTION CONVERTED TO AN ARROW FUNCTION***********************
    $.each(serArr,(index, entry) => {
      if(entry.value){
        myObj[entry.name] = entry.value;
      }
    });
    // run this obj through our search function; returns an array of book(s)
    const searchResults = this.search(myObj);
    // not really sure what this does....
    // custom event showing that an object has been updated? What obj? the DOM?
    this.handleEventTrigger('objUpdate', searchResults);
    // reset form
    $('#search-form').trigger('reset');
    // why return false???
    return false;
  }

  _showAllBooks() {
    this._updateStorage();
  }

  _updateTable(e) {
    console.log("stuff in update table below");
    console.log(e.detail);
    this._makeTable(e.detail);
  }

  _makeTable(books) {
    const _self = this;
    const $tbody = this.$container.find('tbody');
    $tbody.empty();
    $('#books-table-head').html(this._createHead(new Book({})));
    $.each(books, (index, book) => {
      $tbody.append(_self._createRow(book));
    });
  }

  _createHead(book) {
    const tr = $('<tr>');
    for (const key in book) {
      const th = $('<th>').text(spacesToCamelCase(key));
      tr.append(th)
    }
    const dTH = $('<th>').text('Delete Book');
    tr.append(dTH);
    return tr;
  }

  _createRow(book) {
    const tr = $('<tr>');
    //This created our delete column
    // added class del-box to delete box to target more specifically
    const deleteInput = $('<input>').attr({'type': 'checkbox', 'class': 'del-box'});
    const editButton = $('<button>').attr({'type': 'button', 'class': 'btn btn-default edit-bk-btn', 'data-toggle': 'modal', 'data-target': '#edit-book-modal'}).text("Edit");
    for(const key in book){
      const td = $('<td>');
      if (key === 'cover') {
        const img = $('<img>').addClass('tableImg').attr('src', book[key]);
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
        $(td).html(key === 'synopsis' ? `${book[key].substring(0,85)}...` : book[key]);
      }
      tr.append(td);
    }
    const deleteTd = $('<td>');
    $(deleteTd).append(deleteInput);
    tr.append(deleteTd);
    return tr;
  }

  _deleteBooks() {
    const myArr = $(".del-box:checked");
    // console.log(myArr);

    // CHANGED***************** SOME VARS CHANGEd TO LETS***********************************
    for (let i = 0; i < myArr.length; i++) {
      // had to wrap myArr[i] in jquery because the data attr was assigned with jQuery!!! I think... ask Brett as he helped me conceptualize this
      this.removeBookByTitle($(myArr[i]).data('title'));
      // console.log($(myArr[i]).data('title') + " was removed!");
    }
    // update table
    this.handleEventTrigger('objUpdate');
  }

  _editBook(e) {
    e.preventDefault();
    // find the closest row and traverse to find the title
    title = e.currentTarget.closest('tr').children[1].innerText;
    // console.log(title);
    // run the title through getBookByTitle (first entry in the array returned) and assign it to bookToEdit
    const bookToEdit = this.getBookByTitle(title)[0];
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
  }

  _updateStorage() {
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
  }
}

// CHANGED*****************PREVIOUSLY, THIS CODE WAS NEEDED TO OVERRIDE THE EXISTING DATATABLE PROTOTYPE OBJECT AND ASSIGN IT TO THAT OF THE LIBRARY CONSTRUCTOR'S PROTOTYPE********************
// CHANGED*****************NOW, THIS IS UNNECESSARY SINCE WE ARE USING CLASS/EXTENDS/SUPER - THAT TAKES CARE OF SETTING DATATABLE AS A SUBCLASS OF LIBRARY AND IT'S METHODS ARE NOW AVAILABLE WITHOUT HAVING TO MESS WITH PROTOTYPES!************************
// DataTable.prototype = Object.create(Library.prototype);


//This is the document ready that will create a new instance of DataTable
//HINT: Each class||object will need a new instance to be initalized on document ready!
$(() => {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});
