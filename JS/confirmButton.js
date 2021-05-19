function confirmButton(formContext) {   
  var appStatus = formContext.getAttribute("msemr_appointmentstatus").getValue();
  var paymentType = formContext.getAttribute("mphhi_paymentoption").getValue(); // Self Pay = 205220000 | HMO = 205220001
  if(paymentType == 205220001) {
    if (appStatus != 935000008) {
      formContext.ui.setFormNotification("Appointment confirmed.", "INFO", "appointmentConfirmed"); // ERROR, INFO, WARNING
      var newAppStatus = formContext.getAttribute("msemr_appointmentstatus").setValue(935000008); // Confirmed - Paid
      formContext.data.entity.save();
    } else {
      formContext.ui.setFormNotification("Appointment is already confirmed.", "INFO", "appointmentAlreadyConfirmed");
    }
  } else {
    if (appStatus != 935000002) {
      formContext.ui.setFormNotification("Appointment confirmed.", "INFO", "appointmentConfirmed"); // ERROR, INFO, WARNING
      var newAppStatus = formContext.getAttribute("msemr_appointmentstatus").setValue(935000002); // Confirmed - For Payment
      formContext.data.entity.save();
      } else {
        formContext.ui.setFormNotification("Appointment is already confirmed.", "INFO", "appointmentAlreadyConfirmed");
      }
  }
  console.log("button clicked");
}

