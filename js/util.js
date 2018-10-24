function spacesToCamelCase(str) {
  var splits = str.split(/(?=[A-Z]+)/); //splits string parameter on capital letters
  var rejoined = splits.join(" "); //joins the split string array into a new string with spaces between elements
  var myArr = [];
  for(i = 0;i < rejoined.length;i++)
  if(i === 0){
    myArr.push(rejoined[i].toUpperCase()) //capitalizes first letter to turn camelcase into pascal case
  }else{
    myArr.push(rejoined[i]) //handles every other letter
  }
  return myArr.join(""); //joins array into one string on empty space.
};


// BELOW FUNCTION TAKES IN AN ARRAY OF OBJECTS AND RETURNS THEM AS A NEW ARRAY OF ***BOOK*** OBJECTS.
function bookify(arr) {
  var tempArr = [];
  for (var i = 0; i < arr.length; i++) {
    var myObj = new Object();
    for (var key in arr[i]) {
        myObj[key] = arr[i][key];
    }
    tempArr.push(new Book(myObj));
  }
  return tempArr;
}


function formatDate(date) {
  if (!(date instanceof Date)) {
    console.log("This is not a valid Date object");
    return;
  }

  var months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  var formattedDate = months[month] + " " + day + ", " + year;
  return formattedDate;
};

function stars(rating) {
  var $div = $('<div>');
  for(var i=0; i<5; i++) {
    var $star = $('<span>').addClass('fa fa-star');
    if(i<rating){ $star.addClass('checked'); }
    $div.append($star);
  }
  return $div;
};

//This is an extension
Array.prototype.unique = function(key) {
  var a = this.concat();
  for(var i=0; i<a.length; ++i) {
    for(var j=i+1; j<a.length; ++j) {
      if(a[i][key].toLowerCase() === a[j][key].toLowerCase()) {
        a.splice(j--, 1);
      }
    }
  }
  return a;
};
