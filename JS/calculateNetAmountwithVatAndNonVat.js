function calculateVATAndNonVATNetAmount(executionContext) {
  var formContext = executionContext.getFormContext();
	var netAmountValue = formContext.getAttribute("mphhi_netamountcustomcalculated").getValue();
	var vatAmountValue = formContext.getAttribute("mphhi_netamountvatable").getValue();
	var nonVatAmountValue = formContext.getAttribute("mphhi_netamountnonvatable").getValue();
  var taxPercentage = formContext.getAttribute("mphhi_doctorstaxrate").getValue();
  
  if(vatAmountValue || nonVatAmountValue) {
    console.log("VAT contains data");
  } else {
    if(taxPercentage) {
      var percentageToDecimal = taxPercentage / 100;
      if(netAmountValue) {
        // Calculate Non-VAT Net Amount
        var nonVat = netAmountValue * percentageToDecimal;
        var setNonVatAmount = formContext.getAttribute("mphhi_netamountnonvatable").setValue(netAmountValue - nonVat);
        // Calculate VAT Net Amount
        var vat = (netAmountValue/1.12) * 0.1; // Always 10% tax for VAT Amount
        var setVatAmount = formContext.getAttribute("mphhi_netamountvatable").setValue(netAmountValue - vat);
      } else if (netAmountValue == 0) {
        // set to 0 both VAT
        var setNonVatAmount = formContext.getAttribute("mphhi_netamountnonvatable").setValue(0);
        var setVatAmount = formContext.getAttribute("mphhi_netamountvatable").setValue(0);
      }
    }
  }

}