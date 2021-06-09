function markAsComplete(formContext){
  var confirmStrings = {
    title: "ALERT",
    subtitle: "Are you sure you want to mark this appointment as complete?",
    text: "NOTE: This will make the appointment record read-only."
  }
  Xrm.Navigation.openConfirmDialog(confirmStrings).then(
      function (success) {
          if (success.confirmed) {
              completeAppointment(formContext);
          }
      }
  );
}

function completeAppointment(formContext) {
  // var appStatus = formContext.getAttribute("statecode").getValue();
  var appointmentStatus = formContext.getAttribute("msemr_appointmentstatus").getValue();
    if (appointmentStatus != 935000004) {
      formContext.ui.setFormNotification("Appointment completed.", "INFO", "appointmentCompleted"); // ERROR, INFO, WARNING
      
      // var newAppStatus = formContext.getAttribute("statecode").setValue(1);
      var newStatus = formContext.getAttribute("msemr_appointmentstatus").setValue(935000004);

      var cs = formContext.ui.controls.get();
      for (var i in cs) 
      {
       var c = cs[i];
       if (c.getName() != "" && c.getName() != null) 
       {
        if (!c.getDisabled()) {c.setDisabled(true);}
       }
      }
      var disbursedField = formContext.getControl("mphhi_disbursed").setDisabled(false);
      var disbursementLookup = formContext.getControl("mphhi_disbursed").setDisabled(false);
      formContext.ui.setFormNotification("This record is now Read-only.", "INFO", "readOnly"); // ERROR, INFO, WARNING
      formContext.data.entity.save();
    }
    // console.log("button clicked");
}

// function showMarkAsCompleteButton(formContext){
//   var appStatus = formContext.getAttribute("msemr_appointmentstatus").getValue();
//     if(appStatus == 935000002 || appStatus == 935000008){
//       return true;
//     }
//     else {
//       return false;
//     }
//  }

function showMarkAsCompleteButton(primaryControl) {
  var appStatus = primaryControl.getAttribute("msemr_appointmentstatus").getValue();

    if (appStatus == 935000002 || appStatus == 935000008) {
        return true;
    }
    else
        return false;
        
}