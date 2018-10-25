// All functional with ES6
/*Constructor for Book class - no methods yet*/
class Book {
  constructor(oArgs) {
    this.cover = oArgs.cover;
    this.title = oArgs.title; //Required
    this.author = oArgs.author; //Required
    this.synopsis = oArgs.synopsis;
    this.numberOfPages = oArgs.numberOfPages; //Required
    this.publishDate = new Date(String(oArgs.publishDate)).getUTCFullYear(); //Required
    this.rating = oArgs.rating;

    // WHY RETURN FALSE???????????????????????????????????????????????
    return false;
  }

  editBook(oArg) {
    oArg.preventDefault();
    console.log("editBook is firing");
  }
}
