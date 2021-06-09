function showReadOnly(executionContext) {
  var formContext = executionContext.getFormContext();
  var appStatus = formContext.getAttribute("msemr_appointmentstatus").getValue();

  if(appStatus == 935000004) {   
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
    formContext.ui.setFormNotification("This record is read-only.", "INFO", "readOnly"); // ERROR, INFO, WARNING
  }
  
}