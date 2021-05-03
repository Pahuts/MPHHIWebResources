function getDateToday(executionContext) {
  var formContext = executionContext.getFormContext();
  var getMonthFull = new Date(); // get date today
  var month = getMonthFull.toLocaleString('default', { month: 'long' });
  var dateToday = new Date().toDateString(); // date today to string
  var d = dateToday.substring(7); // remove first 7 characters of string
  console.log(month + d); // show date date today

  var dateTodayTextField = formContext.getAttribute("mphhi_datetoday").getValue();
  dateTodayTextField = formContext.getAttribute("mphhi_datetoday").setValue(month + d);
}
