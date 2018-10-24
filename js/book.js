/*Constructor for Book class - no methods yet*/
var Book = function(oArgs) {
  this.cover = oArgs.cover;
  this.title = oArgs.title; //Required
  this.author = oArgs.author; //Required
  this.synopsis = oArgs.synopsis;
  this.numberOfPages = oArgs.numberOfPages; //Required
  this.publishDate = new Date(String(oArgs.publishDate)).getUTCFullYear(); //Required
  this.rating = oArgs.rating;

  // WHY RETURN FALSE???????????????????????????????????????????????
  return false;
};

Book.prototype.editBook = function(oArg) {
  oArg.preventDefault();
  console.log("editBook is firing");
};
