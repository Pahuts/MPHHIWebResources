function showAlert(executionContext) {
  var formContext = executionContext.getFormContext();
  formContext.ui.setFormNotification("Please wait for a few minutes for the timeslots to take effect.",  "INFO", "1");
  
}