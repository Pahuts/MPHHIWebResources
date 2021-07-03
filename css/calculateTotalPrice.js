function calculateTotalPrice(executionContext) {
  var formContext = executionContext.getFormContext();
  var pricePerUnit = formContext.getAttribute("mphhi_priceperunit").getValue();
  var quantity = formContext.getAttribute("mphhi_quantity").getValue();
  var totalPrice = 0;
  formContext.getAttribute("mphhi_totalpricenoncalculated").getValue();
  if(quantity == 0) {
    formContext.ui.setFormNotification("Quantity should be greater than 0.", "ERROR", "1");
  }
  else if(pricePerUnit && quantity) {
    totalPrice = pricePerUnit * quantity;
    formContext.getAttribute("mphhi_totalpricenoncalculated").setValue(totalPrice);
    formContext.ui.clearFormNotification("1");
    }
  }