function checkMonth(executionContext) {
  var formContext = executionContext.getFormContext();
  var dateField = formContext.getAttribute("mphhi_datedevfield").getValue(); // get date field
  if(dateField) {
    var dateToString = dateField.toDateString(); // convert to string
    var month = dateToString.split(" ")[1]; // get month only
  }

  if(month) { // check if month contains data
    switch(month) {
      case "Jan":
        formContext.getAttribute("mphhi_startmonth").setValue(1);
        break;
      case "Feb":
        formContext.getAttribute("mphhi_startmonth").setValue(2);
        break;
      case "Mar":
        formContext.getAttribute("mphhi_startmonth").setValue(3);
        break;
      case "Apr":
        formContext.getAttribute("mphhi_startmonth").setValue(4);
        break;
      case "May":
        formContext.getAttribute("mphhi_startmonth").setValue(5);
        break;
      case "Jun":
        formContext.getAttribute("mphhi_startmonth").setValue(6);
        break;
      case "Jul":
        formContext.getAttribute("mphhi_startmonth").setValue(7);
        break;
      case "Aug":
        formContext.getAttribute("mphhi_startmonth").setValue(8);
        break;
      case "Sep":
        formContext.getAttribute("mphhi_startmonth").setValue(9);
        break;
      case "Oct":
        formContext.getAttribute("mphhi_startmonth").setValue(10);
        break;
      case "Nov":
        formContext.getAttribute("mphhi_startmonth").setValue(11);
        break;
      case "Dec":
        formContext.getAttribute("mphhi_startmonth").setValue(12);
        break;            
    }
  }
}
