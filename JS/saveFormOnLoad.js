function saveForm(executionContext) {
  var formContext = executionContext.getFormContext();
  var urgency  = formContext.getAttribute("mphhi_urgency").getValue();
  if(urgency != null || urgency != "") {
    Xrm.Page.data.entity.save();
  }
}