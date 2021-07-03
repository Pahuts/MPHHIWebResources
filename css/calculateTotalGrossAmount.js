function calculateTotalGrossAmount(executionContext) {
  var formContext = executionContext.getFormContext();
  var totalGrossAmount = 0;
  var medicationID = formContext.data.entity.getId(); // PF Disburment GUID
  var medicationIDSlice = medicationID.slice(1,-1); // remove brackets from GUID
  console.log(medicationIDSlice);

  var req = new XMLHttpRequest();
  req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/mphhi_medicationorders?$select=mphhi_totalpricenoncalculated&$filter=_mphhi_pharmacyorder_value eq "+medicationIDSlice+"", true);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
  req.setRequestHeader("MSCRMCallerID", "");
  req.onreadystatechange = function() {
      if (this.readyState === 4) {
          req.onreadystatechange = null;
          if (this.status === 200) {
              var results = JSON.parse(this.response);
              for (var i = 0; i < results.value.length; i++) {
                  var mphhi_totalpricenoncalculated = results.value[i]["mphhi_totalpricenoncalculated"];
                  var mphhi_totalpricenoncalculated_formatted = results.value[i]["mphhi_totalpricenoncalculated@OData.Community.Display.V1.FormattedValue"];
                  console.log("Total Price: " + mphhi_totalpricenoncalculated);
                  totalGrossAmount = totalGrossAmount + mphhi_totalpricenoncalculated;
                  console.log("Gross Amount: " +totalGrossAmount);
              }
              formContext.getAttribute("mphhi_totalgrossamountnoncalculated").setValue(totalGrossAmount);
          } else {
              console.log(this.statusText);
          }
      }
  };
  req.send();
  console.log("HELLOOOOOOOOOOOOOOO");
    // Xrm.WebApi.online.retrieveMultipleRecords("mphhi_medicationorder", "?$select=mphhi_totalprice&$filter=_mphhi_pharmacyorder_value eq "+medicationIDSlice+"").then(
    //   function success(results) {
    //     for (var i = 0; i < results.entities.length; i++) {
    //       var mphhi_totalpricenoncalculated = results.entities[i]["mphhi_totalpricenoncalculated"];
    //       var mphhi_totalpricenoncalculated_formatted = results.entities[i]["mphhi_totalpricenoncalculated@OData.Community.Display.V1.FormattedValue"];
    //       totalGrossAmount = totalGrossAmount + mphhi_totalpricenoncalculated;
    //     }
    //   },
    //   function(error) {
    //     console.log(error.message);
    //   }
    // );

  
}