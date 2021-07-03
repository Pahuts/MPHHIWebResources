function autopopulateSubject(executionContext) {
  let formContext = executionContext.getFormContext();
  var whType = formContext.getAttribute("mphhi_timeslottype").getValue(); // workhour type
  var whTypeName = "";
  var hospital = formContext.getAttribute("mphhi_associatedhospital").getValue(); // hospital id
  var doctor = formContext.getAttribute("mphhi_doctor").getValue(); //doctor name
  var stateCode = formContext.getAttribute("statecode").getValue();
  
  if(whType) {
    if(whType == 205220000) {
      whTypeName = "E-Consultation";
    } else if(whType == 205220001) {
      whTypeName = "Face to Face Consultation";
    }
  }

  if(doctor) {
    var doctorName = doctor[0].name;
    console.log(doctorName);
  }

  if(hospital) {
    var hospitalId = hospital[0].id;
    console.log("Hospital ID: " + hospitalId);
    var sliceHospital = hospitalId.slice(1,-1);
  }
  
  
    // retrieve Hospital GUID in Associated Hospital
    if(whType && sliceHospital && doctorName) {
      var req = new XMLHttpRequest();
      req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/mphhi_associatedhospitals("+sliceHospital+")?$select=_mphhi_hospital_value", true);
      req.setRequestHeader("OData-MaxVersion", "4.0");
      req.setRequestHeader("OData-Version", "4.0");
      req.setRequestHeader("Accept", "application/json");
      req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
      req.onreadystatechange = function() {
          if (this.readyState === 4) {
              req.onreadystatechange = null;
              if (this.status === 200) {
                  var result = JSON.parse(this.response);
                  var _mphhi_hospital_value = result["_mphhi_hospital_value"];
                  var _mphhi_hospital_value_formatted = result["_mphhi_hospital_value@OData.Community.Display.V1.FormattedValue"];
                  var _mphhi_hospital_value_lookuplogicalname = result["_mphhi_hospital_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                  var hospitalId = _mphhi_hospital_value;
                  console.log(_mphhi_hospital_value); // hospital guid
                  console.log(_mphhi_hospital_value_formatted); // hospital name
                  console.log(_mphhi_hospital_value_lookuplogicalname); // hospital entity name
                  getHospitalAcronym(executionContext,hospitalId,whTypeName,doctorName);
              } else {
                  //console.log(this.statusText);
                  console.log("Compiling data.");
              }
          }
      };
      req.send();
    }
  }

function getHospitalAcronym(executionContext,hospitalId,whTypeName,doctorName) {
    // retrieve Hospital Acronym using retrieved Hospital GUID
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/msemr_locations("+hospitalId+")?$select=mphhi_shortnameacronym", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function() {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                var mphhi_shortnameacronym = result["mphhi_shortnameacronym"];
                var hospitalAcronym = mphhi_shortnameacronym;
                console.log(hospitalAcronym);
                updateSubject(executionContext,hospitalAcronym,whTypeName,doctorName);
            } else {
                console.log(this.statusText);
            }
        }
    };
    req.send();
}

function updateSubject(executionContext,hospitalAcronym,whTypeName,doctorName) {
  var formContext = executionContext.getFormContext();
  Xrm.Page.getAttribute("subject").setValue(`${hospitalAcronym} - ${whTypeName} - ${doctorName}`); // used legacy syntax for now
  console.log("Subject: " + hospitalAcronym,whTypeName,doctorName);
  //setTimeout("Xrm.Page.data.entity.save();", 2000);
  //formContext.getAttribute("subject").setValue(`${hospitalAcronym} - ${whType} - ${doctorName}`);  // commented out because of unknown issue, event wont trigger
}
