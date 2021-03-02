function openAppointment() {
  var entityFormOptions = {};
  entityFormOptions["entityName"] = "msemr_appointmentemr";
  entityFormOptions["formId"] = "5d8d5371-5bea-4795-bb80-1ec53f91bfdf";
  
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
}

