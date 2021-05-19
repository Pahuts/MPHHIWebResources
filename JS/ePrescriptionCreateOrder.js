function OnClickOfCustomButton(formContext) {
  try {
    var time = 8000;  //Display time in milliseconds
    var id = 'orderdetails';
    var data = { "Patient" : "" , "Doctor" : "" , "PrescriptionGUID" : ""};
    data.Patient = formContext.getAttribute("mphhi_patient").getValue()[0].name;
    data.Doctor = formContext.getAttribute("mphhi_doctor").getValue()[0].name;
    data.PrescriptionGUID = formContext.getAttribute("mphhi_eprescriptionguid").getValue();

    // Define the query to execute the action
    var requestUrl = "https://prod-136.westus.logic.azure.com:443/workflows/79e820ccdfcf436e8d4a7a8bdecc9b13/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YN3HTI94oFddefZO9EHSprRh571-Hap3qtJq5GmQf30";
    // Create request
    var req = new XMLHttpRequest();
    req.open("POST", requestUrl, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
      if(this.readyState == 4 /* complete */ || this.readyState == 2 ) {
        req.onreadystatechange = null;
        if (this.status == 200 || this.status == 204 || this.status == 202) {
          // success
          // Xrm.Navigation.openAlertDialog ({ text: "Flow Called."}, { height: 200, width: 300});
          Xrm.Utility.showProgressIndicator("Loading...");
          setTimeout("Xrm.Utility.closeProgressIndicator()", 5000);
          formContext.ui.setFormNotification("Order details sent to patient.", "INFO", id); // ERROR, INFO, WARNING
          setTimeout("formContext.ui.clearFormNotification(orderdetails)", 6000);
          setTimeout( function () {formContext.ui.clearFormNotification(id);}, time );
          console.log("Flow called.");
        } else {
          // error
          var error = JSON.parse(this.response).error;
        }
      }
    };
    req.send(JSON.stringify(data));
  } catch(ex) {
    // do something
  }
}
