function setWorkHoursDevField(executionContext) {  
  var formContext = executionContext.getFormContext(); 
  var workHour = formContext.getAttribute("mphhi_workhour").getValue();
      if (workHour == false) {
        var newAppStatus = formContext.getAttribute("mphhi_workhourdevfield").setValue("No");
      } else if (workHour == true) {
        var newAppStatus = formContext.getAttribute("mphhi_workhourdevfield").setValue("Yes");
      } else {
        console.log("walang laman yung work hour?");
      }
  console.log(workHour);
}

