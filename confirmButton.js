function confirmButton(formContext) {   
  var appStatus = formContext.getAttribute("msemr_appointmentstatus").getValue();
  if (appStatus != 935000002) {
    formContext.ui.setFormNotification("Appointment confirmed.", "INFO", "appointmentConfirmed"); // ERROR, INFO, WARNING
    var newAppStatus = formContext.getAttribute("msemr_appointmentstatus").setValue(935000002);
    formContext.data.entity.save();
  } else {
    formContext.ui.setFormNotification("Appointment is already confirmed.", "INFO", "appointmentAlreadyConfirmed");
  }
  console.log("button clicked");
}

