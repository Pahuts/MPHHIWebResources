function confirmButton(formContext) {   
  var appStatus = formContext.getAttribute("msemr_appointmentstatus").getValue();
  var paymentType = formContext.getAttribute("mphhi_paymentoption").getValue(); // Self Pay = 205220000 | HMO = 205220001
  var withLOA = formContext.getAttribute("mphhi_withloa").getValue();
  if(paymentType == 205220001) {
    if (appStatus != 935000008) {
      if(withLOA == true){
        formContext.ui.setFormNotification("Appointment confirmed.", "INFO", "appointmentConfirmed"); // ERROR, INFO, WARNING
        var newAppStatus = formContext.getAttribute("msemr_appointmentstatus").setValue(935000008); // Confirmed - Paid
        var setPaid = formContext.getAttribute("mphhi_appointmentpaid").setValue(205220000); // gawing paid yung appointment paid? field
        formContext.ui.clearFormNotification("LOA");
        formContext.data.entity.save();
      } else {
        formContext.ui.setFormNotification("LOA is required for HMO payments.", "ERROR", "LOA");
      }
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
  // console.log("button clicked");
}

function onChangeLOA(executionContext) {
  var formContext = executionContext.getFormContext();
  var withLOA = formContext.getAttribute("mphhi_withloa").getValue();
  if(withLOA == true) {
    formContext.ui.clearFormNotification("LOA");
    formContext.data.entity.save();
  }
}