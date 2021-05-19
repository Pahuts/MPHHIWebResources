// get birth date
var bDate = $("#mphhi_dateofbirth_datepicker_description").val();
var bSplit = bDate.split("/"); // split values
var birthMonth = parseInt(bSplit[0]);
var birthDay = parseInt(bSplit[1]);
var birthYear = parseInt(bSplit[2]);

// get date today
var dateToday = new Date();

// get month
var month = dateToday.getMonth();
// get day
var day = dateToday.getDate();
// get year
var year = dateToday.getFullYear();

// parse date to int
var monthInt = parseInt(month);
var dayInt = parseInt(day);
var yearInt = parseInt(year);

if(monthInt < birthMonth && dayInt < birthDay) {
  var getAge = yearInt - birthYear - 1;
  alert(getAge);
} else if (monthInt == birthMonth && dayInt != birthDay){
  var getAge = yearInt - birthYear - 1;
  alert(getAge);
} else if (monthInt == birthMonth && dayInt == birthDay){
  var getAge = yearInt - birthYear;
  alert(getAge)
}else {
  var getAge = yearInt - birthYear;
  alert(getAge);
}
