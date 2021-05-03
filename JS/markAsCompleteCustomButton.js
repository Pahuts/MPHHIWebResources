function markAsComplete(formContext) {   
  var appStatus = formContext.getAttribute("statecode").getValue();
    if (appStatus != 1) {
      formContext.ui.setFormNotification("Appointment completed.", "INFO", "appointmentCompleted"); // ERROR, INFO, WARNING
      var newAppStatus = formContext.getAttribute("statecode").setValue(1);
      formContext.data.entity.save();
    }
    console.log("button clicked");
}

function showMarkAsCompleteButton(formContext){
  var appStatus = formContext.getAttribute("msemr_appointmentstatus").getValue();
    if(appStatus == 935000002){
      return true;
    }
    else {
      return false;
    }
 }

 