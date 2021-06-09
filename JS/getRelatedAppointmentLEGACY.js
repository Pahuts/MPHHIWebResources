function getRelatedAppointments(executionContext)
{
  var formContext = executionContext.getFormContext();
  var pfID= formContext.data.entity.getId(); // PF Disburment GUID
  var pfIDSlice = pfID.slice(1,-1); // remove brackets from GUID
  var disbursementStatus = formContext.getAttribute("statuscode").getValue(); // get Status Reason value
  var month = formContext.getAttribute("mphhi_month").getValue(); // get Month value
  console.log("Month: " + month); // for debugging only
  // get doctor lookup value
  var doctorLookup = formContext.getAttribute("mphhi_doctorsname").getValue();
  var doctorGUID = doctorLookup[0].id;
  var sliceDoctorGUID = doctorGUID.slice(1,-1); // remove brackets from guid
  console.log(sliceDoctorGUID); // for debugging only

  Xrm.WebApi.online.retrieveMultipleRecords("msemr_appointmentemr", "?$select=mphhi_appointmentguid&$filter=_mphhi_disbursement_value eq "+pfIDSlice+"").then( // retrieve records that have this PF Disbursement as their lookup
    function success(results) {
        for (var i = 0; i < results.entities.length; i++) {
            var mphhi_appointmentguid = results.entities[i]["mphhi_appointmentguid"];
            removePFDisbursementValueInAppointment(executionContext,mphhi_appointmentguid);
        }
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
      }
    );
  // end of retrieve function and remove function
  Xrm.Page.getAttribute("mphhi_totalgrossamount").setValue(0);
  Xrm.Page.getAttribute("mphhi_totalnetamount").setValue(0);
  // run next retrieve function
  retrieveMultipleAppointmentRecords(executionContext);

}

function retrieveMultipleAppointmentRecords(executionContext) {
  var formContext = executionContext.getFormContext();
  var pfID= formContext.data.entity.getId(); // PF Disburment GUID
  var pfIDSlice = pfID.slice(1,-1); // remove brackets from GUID
  var disbursementStatus = formContext.getAttribute("statuscode").getValue(); // get Status Reason value
  var month = formContext.getAttribute("mphhi_month").getValue(); // get Month value
  console.log("Month: " + month); // for debugging only
  // get doctor lookup value
  var doctorLookup = formContext.getAttribute("mphhi_doctorsname").getValue();
  var doctorGUID = doctorLookup[0].id;
  var sliceDoctorGUID = doctorGUID.slice(1,-1); // remove brackets from guid
  console.log(sliceDoctorGUID); // for debugging only
  var totalNetAmount = 0;
  var totalDiscountAmount = 0;
  var totalGrossAmount = 0;

  // and _msemr_actorlocation_value eq 123 -- pending
  Xrm.WebApi.online.retrieveMultipleRecords("msemr_appointmentemr", "?$select=mphhi_appointmentguid,mphhi_appointmentnumber,mphhi_datedevfield,mphhi_discountamount,_mphhi_doctor_value,mphhi_grossamount,mphhi_netamount,mphhi_startmonth,_msemr_actorlocation_value&$filter=mphhi_appointmentpaid eq 205220000 and _mphhi_doctor_value eq "+sliceDoctorGUID+" and mphhi_startmonth eq "+month+" and mphhi_disbursed ne true").then(
    function success(results) {
        for (var i = 0; i < results.entities.length; i++) {
          var mphhi_appointmentguid = results.entities[i]["mphhi_appointmentguid"];
          var mphhi_appointmentnumber = results.entities[i]["mphhi_appointmentnumber"];
          var mphhi_datedevfield = results.entities[i]["mphhi_datedevfield"];
          var mphhi_discountamount = results.entities[i]["mphhi_discountamount"];
          var mphhi_discountamount_formatted = results.entities[i]["mphhi_discountamount@OData.Community.Display.V1.FormattedValue"];
          var _mphhi_doctor_value = results.entities[i]["_mphhi_doctor_value"];
          var _mphhi_doctor_value_formatted = results.entities[i]["_mphhi_doctor_value@OData.Community.Display.V1.FormattedValue"];
          var _mphhi_doctor_value_lookuplogicalname = results.entities[i]["_mphhi_doctor_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
          var mphhi_grossamount = results.entities[i]["mphhi_grossamount"];
          var mphhi_grossamount_formatted = results.entities[i]["mphhi_grossamount@OData.Community.Display.V1.FormattedValue"];
          var mphhi_netamount = results.entities[i]["mphhi_netamount"];
          var mphhi_netamount_formatted = results.entities[i]["mphhi_netamount@OData.Community.Display.V1.FormattedValue"];
          var mphhi_startmonth = results.entities[i]["mphhi_startmonth"];
          var mphhi_startmonth_formatted = results.entities[i]["mphhi_startmonth@OData.Community.Display.V1.FormattedValue"];
          var _msemr_actorlocation_value = results.entities[i]["_msemr_actorlocation_value"];
          var _msemr_actorlocation_value_formatted = results.entities[i]["_msemr_actorlocation_value@OData.Community.Display.V1.FormattedValue"];
          var _msemr_actorlocation_value_lookuplogicalname = results.entities[i]["_msemr_actorlocation_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
          totalGrossAmount = totalGrossAmount + mphhi_grossamount;
          totalDiscountAmount = totalDiscountAmount + mphhi_discountamount;
          totalNetAmount = totalNetAmount + mphhi_netamount;
          if(disbursementStatus == "205220000") {
            console.log("Payment already disbursed to the doctor");
            updateDisbursedField(formContext, mphhi_appointmentguid); // Update disbursed field in retrieved appointment
            //updateTotalNetAmount(formContext, mphhi_appointmentguid); 
          }else {
            updatePFDisbursement(formContext, mphhi_appointmentguid); // Update pf disbursement lookup in retrieved appointment
            //updateTotalNetAmount(formContext, mphhi_appointmentguid); 
            
          }
        }
        Xrm.Page.getAttribute("mphhi_totalgrossamount").setValue(totalGrossAmount);
        Xrm.Page.getAttribute("mphhi_totaldiscountamount").setValue(totalDiscountAmount);
        Xrm.Page.getAttribute("mphhi_totalnetamount").setValue(totalNetAmount);
        
    },
    function(error) {
        console.log(error.message);
    }
  );
    // end of retrieve function
    
    setTimeout(function () {
        Xrm.Page.data.entity.save();}, 1000); 
  setTimeout(function () {
  // Call the Open Entity Form method and pass through the current entity name and ID to force CRM to reload the record
  Xrm.Utility.openEntityForm(Xrm.Page.data.entity.getEntityName(), Xrm.Page.data.entity.getId());}, 4000); 
}

function updatePFDisbursement(formContext,mphhi_appointmentguid) { // update PF Disbursement lookup field in retrieved Appointment
  var totalnetamount = 0;
  var pfID= formContext.data.entity.getId();
  var pfIDSlice = pfID.slice(1,-1);

  var entity = {};
  entity["mphhi_Disbursement_msemr_appointmentemr@odata.bind"] = "/mphhi_pfdisbursements("+pfIDSlice+")";
  
  var req = new XMLHttpRequest();
  req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/msemr_appointmentemrs("+mphhi_appointmentguid+")", true);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.onreadystatechange = function() {
      if (this.readyState === 4) {
          req.onreadystatechange = null;
          if (this.status === 204) {
              //Success - No Return Data - Do Something
            //   var results = JSON.parse(this.response);

            //     for (var i = 0; i < results.value.length; i++) {
            //         var netamount = results.value[i]["mphhi_netamount"];
            //         totalnetamount = totalnetamount + netamount;
            //         console.log(totalnetamount);
            //     }
            //     Xrm.Page.getAttribute("mphhi_totalnetamount").setValue(totalnetamount);
          } else {
              console.log(this.statusText);
          }
      }
  };
  req.send(JSON.stringify(entity));

}

function updateDisbursedField(formContext,mphhi_appointmentguid) { // update Disbursed two option field in retrieved Appointment
  var entity = {};
  entity.mphhi_disbursed = true;

  Xrm.WebApi.online.updateRecord("msemr_appointmentemr", ""+mphhi_appointmentguid+"", entity).then(
      function success(result) {
          var updatedEntityId = result.id;
      },
      function(error) {
          Xrm.Utility.alertDialog(error.message);
      }
  );
}

function removePFDisbursementValueInAppointment(executionContext,mphhi_appointmentguid) {
    // remove PF Disbursement value before running retrieve functions
    var req = new XMLHttpRequest();
    req.open("DELETE", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/msemr_appointmentemrs("+mphhi_appointmentguid+")/mphhi_Disbursement_msemr_appointmentemr/$ref", true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function() { 
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204 || this.status === 1223) {
                //Success - No Return Data - Do Something
                console.log("success");
            } else {
                console.log(this.statusText);
            }
        }
    };
    req.send();
}