function Library() {};

Library.prototype.handleEventTrigger = function(sEvent,oData){
  var oData = oData || window.bookShelf;
  if(sEvent) {
    var event = new CustomEvent(sEvent, {'detail':oData});
    document.dispatchEvent(event);
  }
};


Library.prototype.addBook = function(book) {
  for(var i = 0; i < window.bookShelf.length; i++) {
    if(book.title.toLowerCase().trim() === window.bookShelf[i].title.toLowerCase().trim()){
      console.log("Sorry " + book.title + " already exists.");
      return false;
    }
  }
  console.log("added " + book.title + " to book shelf");
  window.bookShelf.push(book);
  this.setStorage();
  return true;
};


Library.prototype.removeBookByTitle = function(title) {
  for (var i = 0; i < window.bookShelf.length; i++) {
    if(window.bookShelf[i].title.toLowerCase() === title.toLowerCase()) {
      console.log("removed " + window.bookShelf[i].title + " from book shelf");
      window.bookShelf.splice(i,1);
      this.setStorage();
      return true;
    }
  }
  return false;
};


Library.prototype.removeBookByAuthor = function(author) {
  var booksRemoved = false;
  for (var i = window.bookShelf.length - 1; i >= 0; i--) {
    if (window.bookShelf[i].author.toLowerCase() === author.toLowerCase()) {
      console.log("removed books by " + window.bookShelf[i].author + " from book shelf");
      window.bookShelf.splice(i, 1);
      booksRemoved = true;
      this.setStorage();
    }
  }
  return booksRemoved;
};


Library.prototype.getRandomBook = function() {
  if(window.bookShelf.length){
    return window.bookShelf[Math.floor(Math.random() * Math.floor(window.bookShelf.length))];
  }
  return null;
};


Library.prototype.getBookByTitle = function(title) {
  var matchedArr = [];
  for (var i = 0; i < window.bookShelf.length; i++) {
    if(window.bookShelf[i].title.toLowerCase().search(title.toLowerCase()) >= 0){
      matchedArr.push(window.bookShelf[i]);
    }
  }
  return matchedArr;
};


Library.prototype.getBooksByAuthor = function(authorName) {
  var matchedArr = [];
  for (var i = 0; i < window.bookShelf.length; i++) {
    if(window.bookShelf[i].author.toLowerCase().search(authorName.toLowerCase()) >= 0){
      matchedArr.push(window.bookShelf[i]);
    }
  }
  return matchedArr;
};


Library.prototype.addBooks = function(books) {
  var counter = 0;
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i])) {
      counter++;
    }
  }
  this.setStorage();
  return counter;
};


Library.prototype.getAuthors = function() {
  if (window.bookShelf.length) {
    return window.bookShelf.unique("author");
  }
  return [];
};


Library.prototype.getRandomAuthorName = function() {
  if (!window.bookShelf.length) {
    return null;
  } else {
    return window.bookShelf[Math.floor(Math.random() * Math.floor(window.bookShelf.length))].author;
  }
};

// review kyle's pen on factory method - consider refactoring this
// REFACTOR BELOW TO ACCEPT BOTH TITLE AND AUTHOR
Library.prototype.search = function(searchParams) {
  //searchParams is an object
  // initialize a var to hold all of our matching book obj
  var searchArray;
  // if both auth and title are given, ask for just one
  // how to prevent default jumping to top when alert is closed
  if (searchParams.author && searchParams.title) {
    alert("Please enter either a title OR and author, not both.");
    // and assign the array passed to _handleUpdate as the original window.bookShelf - then return it
    searchArray = window.bookShelf;
    return searchArray;
    // else, if just author is entered
  } else if (searchParams.author) {
    // run the author name thru getBooksByAuthor and assign to a var; returns a single obj or array of obj
    var foundBooks = this.getBooksByAuthor(searchParams.author);
    // make our initial var equal to our found books
    searchArray = foundBooks;
    // if not found, alert and keep bookself same
    if (searchArray.length === 0) {
      alert("Book not found");
      searchArray = window.bookShelf;
    }
    // return the searchArray for use in the _handleSearch function on DataTable.js
    return searchArray;
    // else, if just title is entered
  } else if (searchParams.title) {
    // runt the title name thru getBookByTitle and assign to a var; returns an obj
    var foundBooks = this.getBookByTitle(searchParams.title);
    // make our initial var equal to our found book
    searchArray = foundBooks;
    // if not found, alert and keep bookself same
    if (searchArray.length === 0) {
      alert("Book not found");
      searchArray = window.bookShelf;
    }
    // return the searchArray for use in the _handleSearch function on DataTable.js
    return searchArray;
  } else {
    // if nothing is entered, ask for a value
    alert("Please enter a title or author to search the library.");
    // and assign the array passed to _handleUpdate as the original window.bookShelf - then return it
    searchArray = window.bookShelf;
    return searchArray;
  }
};


Library.prototype.getStorage = function() {
  var arr = [];
  var parsedObj = JSON.parse(localStorage.getItem("myLibrary"));
  for (var i = 0; i < parsedObj.length; i++) {
    arr.push(new Book(parsedObj[i]));
  }
  return arr;
};

Library.prototype.setStorage = function() {
  localStorage.setItem('myLibrary', JSON.stringify(window.bookShelf));
  return console.log("STORAGE HAS BEEN SET");
};
