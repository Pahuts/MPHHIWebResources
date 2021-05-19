function retrieveMedicationRecords(executionContext) {
  var formContext = executionContext.getFormContext();
  var prescriptionID = formContext.data.entity.getId();
  var slicePresc = prescriptionID.slice(1,-1);
  var previousPrescriptionID = formContext.getAttribute("mphhi_previousprescriptionguid").getValue();
  var prescriptionCopied = formContext.getAttribute("mphhi_prescriptioncopied").getValue();
  if(prescriptionCopied != "Yes") {
    if(prescriptionID) {
      if(previousPrescriptionID) {
        // get Medication Records via web api
        Xrm.WebApi.online.retrieveMultipleRecords("msemr_medication", "?$select=mphhi_brandname,mphhi_dispenseactualquantity,mphhi_dispenserequestvalidityperiodenddate,mphhi_dispenserequestvalidityperiodstartdate,mphhi_dosage,mphhi_duration,mphhi_enddateandendtime,mphhi_frequency,mphhi_frequencyothers,mphhi_genericname,mphhi_medicationguid,mphhi_preparation,mphhi_quantity,_mphhi_route_value,mphhi_startdate,mphhi_unit&$filter=_mphhi_prescription_value eq "+previousPrescriptionID+"").then(
          function success(results) {
              for (var i = 0; i < results.entities.length; i++) {
                  var mphhi_brandname = results.entities[i]["mphhi_brandname"];
                  var mphhi_dispenseactualquantity = results.entities[i]["mphhi_dispenseactualquantity"];
                  var mphhi_dispenseactualquantity_formatted = results.entities[i]["mphhi_dispenseactualquantity@OData.Community.Display.V1.FormattedValue"];
                  var mphhi_dispenserequestvalidityperiodenddate = results.entities[i]["mphhi_dispenserequestvalidityperiodenddate"];
                  var mphhi_dispenserequestvalidityperiodstartdate = results.entities[i]["mphhi_dispenserequestvalidityperiodstartdate"];
                  var mphhi_dosage = results.entities[i]["mphhi_dosage"];
                  var mphhi_duration = results.entities[i]["mphhi_duration"];
                  var mphhi_enddateandendtime = results.entities[i]["mphhi_enddateandendtime"];
                  var mphhi_frequency = results.entities[i]["mphhi_frequency"];
                  var mphhi_frequency_formatted = results.entities[i]["mphhi_frequency@OData.Community.Display.V1.FormattedValue"];
                  var mphhi_frequencyothers = results.entities[i]["mphhi_frequencyothers"];
                  var mphhi_genericname = results.entities[i]["mphhi_genericname"];
                  var mphhi_medicationguid = results.entities[i]["mphhi_medicationguid"];
                  var mphhi_preparation = results.entities[i]["mphhi_preparation"];
                  var mphhi_quantity = results.entities[i]["mphhi_quantity"];
                  var mphhi_quantity_formatted = results.entities[i]["mphhi_quantity@OData.Community.Display.V1.FormattedValue"];
                  var _mphhi_route_value = results.entities[i]["_mphhi_route_value"];
                  var _mphhi_route_value_formatted = results.entities[i]["_mphhi_route_value@OData.Community.Display.V1.FormattedValue"];
                  var _mphhi_route_value_lookuplogicalname = results.entities[i]["_mphhi_route_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                  var mphhi_startdate = results.entities[i]["mphhi_startdate"];
                  var mphhi_unit = results.entities[i]["mphhi_unit"];
                
                  createMedicationRecords(executionContext,slicePresc,mphhi_brandname,mphhi_dispenserequestvalidityperiodenddate,mphhi_dispenserequestvalidityperiodstartdate,mphhi_dosage,mphhi_duration,
                    mphhi_enddateandendtime,mphhi_frequency,mphhi_frequencyothers,mphhi_genericname,mphhi_quantity,_mphhi_route_value,mphhi_startdate,mphhi_unit,mphhi_preparation);
              }
              
          },
          function(error) {
              //Xrm.Utility.alertDialog(error.message);
          }
        );
        // end of retrieve function
        var prescriptionCopied = formContext.getAttribute("mphhi_prescriptioncopied").setValue("Yes");
        
      } else {
        return false;
      }
    } else {
      return false;
    }

  }
}

function createMedicationRecords(executionContext,slicePresc,mphhi_brandname,mphhi_dispenserequestvalidityperiodenddate,mphhi_dispenserequestvalidityperiodstartdate,mphhi_dosage,mphhi_duration,
  mphhi_enddateandendtime,mphhi_frequency,mphhi_frequencyothers,mphhi_genericname,mphhi_quantity,_mphhi_route_value,mphhi_startdate,mphhi_unit,mphhi_preparation) {
  // start of medication creation
  var formContext = executionContext.getFormContext();
    var entity = {};
    entity.mphhi_brandname = mphhi_brandname;
    entity.mphhi_dispenserequestvalidityperiodenddate = mphhi_dispenserequestvalidityperiodenddate;
    entity.mphhi_dispenserequestvalidityperiodstartdate = mphhi_dispenserequestvalidityperiodstartdate;
    entity.mphhi_dosage = mphhi_dosage;
    entity.mphhi_duration = mphhi_duration;
    entity.mphhi_enddateandendtime = mphhi_enddateandendtime;
    entity.mphhi_startdate = mphhi_startdate;
    entity.mphhi_frequency = mphhi_frequency;
    entity.mphhi_frequencyothers = mphhi_frequencyothers;
    entity.mphhi_genericname = mphhi_genericname;
    entity.mphhi_preparation = mphhi_preparation;
    entity["mphhi_Prescription@odata.bind"] = "/mphhi_eprescriptions("+slicePresc+")";
    entity.mphhi_quantity = mphhi_quantity;
    entity["mphhi_Route@odata.bind"] = "/mphhi_routes("+_mphhi_route_value+")";
    entity.mphhi_unit = mphhi_unit;
  
    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/msemr_medications", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function() {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204) {
                var uri = this.getResponseHeader("OData-EntityId");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(uri);
                var newEntityId = matches[1];
            } else {
                //alert(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(entity));
}