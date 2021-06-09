function hideConfirmButtonFromOtherForms() {
  var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();
  //var formItem = formContext.ui.formSelector.getCurrentItem().getLabel();
  return formName == "Appointment (EMR) Main"; // name of the form where you will show the button
}

function hideRecurrenceButtonFromOtherForms() {
  var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();
  //var formItem = formContext.ui.formSelector.getCurrentItem().getLabel();
  return formName == "Doctor's Working Hours"; // name of the form where you will show the button
}





// function hideRecurrenceButtonFromOtherForms() {
//   var formName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();
//   //var formItem = formContext.ui.formSelector.getCurrentItem().getLabel();
//   return formName == "Doctor's Non-Working Hours"; // name of the form where you will show the button
// }
