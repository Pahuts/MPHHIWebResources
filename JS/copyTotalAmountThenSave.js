function copyTotalAmountThenSave(executionContext) {
  var formContext = executionContext.getFormContext();
  var totalAmount  = formContext.getAttribute("mphhi_totalamount").getValue();
  var totalAmountCopy  = formContext.getAttribute("mphhi_totalamountnoncalculated").getValue(); // copy net amount calculated field

  if(totalAmount != null || totalAmount != "") {
    var totalAmountCopy  = formContext.getAttribute("mphhi_totalamountnoncalculated").setValue(totalAmount); // copy net amount calculated field
    Xrm.Page.data.entity.save(); // save field
  } 
} 