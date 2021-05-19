function openAppointment() {
  var entityFormOptions = {};
  entityFormOptions["entityName"] = "recurringappointmentmaster";
  entityFormOptions["formId"] = "3E168A0B-1D6E-4073-9A03-31FA33CB6A9B";
  
  // Open the form.
  Xrm.Navigation.openForm(entityFormOptions).then(
      function (success) {
          console.log(success);
      },
      function (error) {
          console.log(error);
      });
}

function doctorsFormLoad(executionContext) {
  formContext = executionContext.getFormContext();
  //var newNonWorkHour = formContext.getAttribute("mphhi_workhour").setValue(false);
  // Xrm.Page.getAttribute("new_myfield").setRequiredLevel("none"); //Not Required
  // Xrm.Page.getAttribute("new_myfield").setRequiredLevel("recommended"); //Business Recommended
  formContext.getAttribute("mphhi_doctor").setRequiredLevel("required"); // Business Required
  //formContext.getAttribute("msemr_actorpatient").setRequiredLevel("none"); // Business Required
  var startTime = formContext.getAttribute("mphhi_starttimedev").getValue();
  if(startTime) {
    console.log("Start time contains data");
  }else {
    var workHour = formContext.getAttribute("mphhi_workhour").setValue(true);
  }
  
}

function setWorkHoursDevField(executionContext) {  
  var formContext = executionContext.getFormContext(); 
  var workHour = formContext.getAttribute("mphhi_workhour").getValue();
    if (workHour == false) {
      var newAppStatus = formContext.getAttribute("mphhi_workhourdevfield").setValue("No");
    } else if (workHour == true) {
      var newAppStatus = formContext.getAttribute("mphhi_workhourdevfield").setValue("Yes");
    }
    console.log(newAppStatus);
}

