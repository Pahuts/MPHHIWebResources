function copyNetAmountThenSave(executionContext) {
  var formContext = executionContext.getFormContext();
  var netAmount  = formContext.getAttribute("mphhi_netamount").getValue();
  var netAmountCopy  = formContext.getAttribute("mphhi_netamountnoncalculated").setValue(netAmount); // copy net amount calculated field
  Xrm.Page.data.entity.save(); // save field
}