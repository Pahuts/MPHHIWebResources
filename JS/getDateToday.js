function getDateToday(executionContext) {
  var formContext = executionContext.getFormContext();
  var getMonthFull = new Date(); // get date today
  var monthFullName = getMonthFull.toLocaleString('default', { month: 'long' }); // get full name of month
  var monthNumericName = getMonthFull.toLocaleString(); // get numeric name of month
  var dateToday = new Date().toDateString(); // date today to string
  var d = dateToday.split(" "); // remove first 7 characters of string
  var dayNow = d[2];
  var yearNow = d[3];
  console.log(monthFullName + dayNow + yearNow); // show date date today

  var dateTodayTextField = formContext.getAttribute("mphhi_datetoday").getValue();
  dateTodayTextField = formContext.getAttribute("mphhi_datetoday").setValue(monthFullName + " " + dayNow + " " +yearNow);

  // get Date Today + 2
  // get correct month format
  var dateToday2 = new Date();
  var getMonthToday = dateToday2.getMonth()+1;
  var getMonthInt = parseInt(getMonthToday);
  if(getMonthInt == 13) {
    var getMonthString = "1";
  }else {
    var getMonthString = getMonthToday.toString();
  }
  
  var dayPlus2 = parseInt(dayNow) + 2;

  var dateToday2TextField = formContext.getAttribute("mphhi_datetodayplus2").getValue();
  dateToday2TextField = formContext.getAttribute("mphhi_datetodayplus2").setValue(getMonthString + "/" + dayPlus2 + "/" + yearNow);
  
}
