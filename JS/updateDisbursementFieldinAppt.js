function getRelatedAppointments(executionContext)
{
  var formContext = executionContext.getFormContext();
  // var a = formContext.getAttribute("mphhi_startdate").getValue();
  // var b = a.toISOString();
  // get month
  var disbursementStatus = formContext.getAttribute("statuscode").getValue();
  var month = formContext.getAttribute("mphhi_month").getValue();
  console.log("Month: " + month);
  // get doctor value
  var doctorLookup = formContext.getAttribute("mphhi_doctorsname").getValue();
  var doctorGUID = doctorLookup[0].id;
  var sliceDoctorGUID = doctorGUID.slice(1,-1);
  console.log(sliceDoctorGUID);

  // and _msemr_actorlocation_value eq 123 -- pending
  Xrm.WebApi.online.retrieveMultipleRecords("msemr_appointmentemr", "?$select=mphhi_appointmentguid,mphhi_appointmentnumber,mphhi_datedevfield,_mphhi_doctor_value,mphhi_grossamount,mphhi_netamount,mphhi_startmonth,_msemr_actorlocation_value&$filter=msemr_appointmentstatus eq 935000002 and _mphhi_doctor_value eq "+sliceDoctorGUID+" and mphhi_startmonth eq "+month+" and mphhi_disbursed ne true").then(
    function success(results) {
        for (var i = 0; i < results.entities.length; i++) {
          var mphhi_appointmentguid = results.entities[i]["mphhi_appointmentguid"];
          var mphhi_appointmentnumber = results.entities[i]["mphhi_appointmentnumber"];
          var mphhi_datedevfield = results.entities[i]["mphhi_datedevfield"];
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
          // console.log("APPOINTMENT GUID: " + mphhi_appointmentguid);
          // console.log("VISIT ID: " + mphhi_appointmentnumber);
          // console.log("APPOINTMENT DATE: " + mphhi_datedevfield);
          // console.log("PF DISB START DATE: " + b);
          alert(mphhi_appointmentguid);
          if(disbursementStatus == "205220000") {
            console.log("Payment already disbursed to the doctor");
          }else {
            updatePFDisbursement(formContext, mphhi_appointmentguid);
          }
          
        }
    },
    function(error) {
        console.log(error.message);
    }
  );
  // end of retrieve function
  Xrm.Page.data.entity.save();
  // setTimeout(function () {
  //   // Call the Open Entity Form method and pass through the current entity name and ID to force CRM to reload the record
  //   Xrm.Utility.openEntityForm(Xrm.Page.data.entity.getEntityName(), Xrm.Page.data.entity.getId());
  // }, 3000);

}

function updatePFDisbursement(formContext,mphhi_appointmentguid) {
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
          } else {
              console.log(this.statusText);
          }
      }
  };
  req.send(JSON.stringify(entity));

}
