function onLoadCalculation(executionContext) {
  var formContext = executionContext.getFormContext();
  var grossAmountValue = formContext.getAttribute("mphhi_grossamount").getValue();
  var discountAmountValue = formContext.getAttribute("mphhi_discountamount").getValue();
  // var netAmountValue = formContext.getAttribute("mphhi_netamount").getValue();
  var pwdValue = formContext.getAttribute("mphhi_pwd").getValue();
  var seniorCitizenValue = formContext.getAttribute("mphhi_seniorcitizen").getValue();
  var newDiscountValue = formContext.getAttribute("mphhi_discountamount");

    if(pwdValue == true && seniorCitizenValue == true && !discountAmountValue) { // discount of pwd and senior citizen is 20% each
      var currentDiscountValue = grossAmountValue * .2 // senior citizen and pwd combined
      newDiscountValue.setValue(currentDiscountValue);
      var totalDiscount = newDiscountValue.getValue();
      var newNetAmountValue = formContext.getAttribute("mphhi_netamountcustomcalculated").setValue(grossAmountValue - totalDiscount);
      console.log(".4");
    } else if (pwdValue == true && !discountAmountValue) {
      console.log(".2");
      var currentDiscountValue = grossAmountValue * .2 // only pwd discount
      newDiscountValue.setValue(currentDiscountValue);
      var totalDiscount = newDiscountValue.getValue();
      var newNetAmountValue = formContext.getAttribute("mphhi_netamountcustomcalculated").setValue(grossAmountValue - totalDiscount);
    } else if (seniorCitizenValue == true && !discountAmountValue) {
      console.log(".2");
      var currentDiscountValue = grossAmountValue * .2 // only senior citizen discount
      newDiscountValue.setValue(currentDiscountValue);
      var totalDiscount = newDiscountValue.getValue();
      var newNetAmountValue = formContext.getAttribute("mphhi_netamountcustomcalculated").setValue(grossAmountValue - totalDiscount);
    } else {
        if(!discountAmountValue) { // check if discount does not contain data
          var discountAmountValue = formContext.getAttribute("mphhi_discountamount").setValue(0);
          var newNetAmountValue = formContext.getAttribute("mphhi_netamountcustomcalculated").setValue(grossAmountValue);
        } else {
          var newNetAmountValue = formContext.getAttribute("mphhi_netamountcustomcalculated").setValue(grossAmountValue - discountAmountValue);
        }
  }
}

function grossAmountChange(executionContext) {
  var formContext = executionContext.getFormContext();
  var grossAmountValue = formContext.getAttribute("mphhi_grossamount").getValue();
  var discountAmountValue = 0;
  // var netAmountValue = formContext.getAttribute("mphhi_netamount").getValue();
  var pwdValue = formContext.getAttribute("mphhi_pwd").getValue();
  var seniorCitizenValue = formContext.getAttribute("mphhi_seniorcitizen").getValue();
  var newDiscountValue = formContext.getAttribute("mphhi_discountamount");

  if(pwdValue == true && seniorCitizenValue == true) {
    var currentDiscountValue = grossAmountValue * .2 // senior citizen and pwd combined // laging .2 lang
    newDiscountValue.setValue(currentDiscountValue);
    var totalDiscount = newDiscountValue.getValue();
  } else if(pwdValue == true) {
    var currentDiscountValue = grossAmountValue * .2 
    newDiscountValue.setValue(currentDiscountValue);
    var totalDiscount = newDiscountValue.getValue();
  } else if(seniorCitizenValue == true) {
    var currentDiscountValue = grossAmountValue * .2
    newDiscountValue.setValue(currentDiscountValue);
    var totalDiscount = newDiscountValue.getValue();
  } else {
    var totalDiscount = 0 + discountAmountValue;
  }

  // check if discount is greater than gross amount
  if (totalDiscount > grossAmountValue) {
    var newNetAmountValue = formContext.getAttribute("mphhi_netamountcustomcalculated").setValue(0);
  } else {
    var newNetAmountValue = formContext.getAttribute("mphhi_netamountcustomcalculated").setValue(grossAmountValue - totalDiscount);
  }

}

function discountAmountChange(executionContext) {
  var formContext = executionContext.getFormContext();
  var grossAmountValue = formContext.getAttribute("mphhi_grossamount").getValue();
  var discountAmountValue = formContext.getAttribute("mphhi_discountamount").getValue();
  // var netAmountValue = formContext.getAttribute("mphhi_netamount").getValue();
  var pwdValue = formContext.getAttribute("mphhi_pwd").getValue();
  var seniorCitizenValue = formContext.getAttribute("mphhi_seniorcitizen").getValue();
  var newDiscountValue = formContext.getAttribute("mphhi_discountamount");

  // if(pwdValue == true && seniorCitizenValue == true) {
  //   var currentDiscountValue = grossAmountValue * .2 // 
  //   newDiscountValue.setValue(currentDiscountValue + discountAmountValue);
  //   var totalDiscount = newDiscountValue.getValue();
  // } else if(pwdValue == true) {
  //   var currentDiscountValue = grossAmountValue * .2 
  //   newDiscountValue.setValue(currentDiscountValue + discountAmountValue);
  //   var totalDiscount = newDiscountValue.getValue();
  // } else if(seniorCitizenValue == true) {
  //   var currentDiscountValue = grossAmountValue * .2
  //   newDiscountValue.setValue(currentDiscountValue + discountAmountValue);
  //   var totalDiscount = newDiscountValue.getValue();
  // } else {
  //   var totalDiscount = 0 + discountAmountValue;
  // }

  // check if discount is greater than gross amount
  if (discountAmountValue > grossAmountValue) {
    var newNetAmountValue = formContext.getAttribute("mphhi_netamountcustomcalculated").setValue(0);
  } else {
    var newNetAmountValue = formContext.getAttribute("mphhi_netamountcustomcalculated").setValue(grossAmountValue - discountAmountValue);
  }
}