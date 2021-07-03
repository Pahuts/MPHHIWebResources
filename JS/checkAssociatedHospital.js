function getAssocHospitals(executionContext){
  console.log("hello");
  var formContext = executionContext.getFormContext();
  var doctor = formContext.getAttribute("mphhi_doctor").getValue();
  var userSettings = Xrm.Utility.getGlobalContext().userSettings;
  var userId = userSettings.userId; 
  var userName = userSettings.userName;

  Xrm.WebApi.online.retrieveMultipleRecords("mphhi_associatedhospital", "?$select=mphhi_associatedhospitalguid,mphhi_name&$filter=_mphhi_doctor_value eq "+userId+"").then(
    function success(results) {
      if(results.entities.length > 0) {
        for (var i = 0; i < results.entities.length; i++) {
          var mphhi_associatedhospitalguid = results.entities[i]["mphhi_associatedhospitalguid"];
          var mphhi_name = results.entities[i]["mphhi_name"];
          
          console.log(mphhi_name);
          console.log("Doctor has associated hospitals.");
          formContext.getControl("mphhi_preferreddoctor").setVisible(true);
          formContext.getControl("msemr_actorlocation").setVisible(false);
        }
      } else {
        console.log("else");
        getDefaultHospital(executionContext,doctor,userId);
      }

    },
    function(error) {
        console.log(error.message);
      }
  );
}

function getDefaultHospital(executionContext,doctor,userId) {
  console.log("getDefaultHospital");
  var formContext = executionContext.getFormContext();
  var doctor = doctor;
  var userId = userId;
  var lookupData = new Array();
  var lookupItem = new Object();

  Xrm.WebApi.online.retrieveRecord("systemuser", ""+userId+"", "?$select=_mphhi_hospital_value").then(
    function success(result) {
        var _mphhi_hospital_value = result["_mphhi_hospital_value"];
        var _mphhi_hospital_value_formatted = result["_mphhi_hospital_value@OData.Community.Display.V1.FormattedValue"];
        var _mphhi_hospital_value_lookuplogicalname = result["_mphhi_hospital_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
        console.log(_mphhi_hospital_value);
        console.log(_mphhi_hospital_value_formatted);
        console.log(_mphhi_hospital_value_lookuplogicalname);

        lookupItem.id = _mphhi_hospital_value; // hospital GUID
        lookupItem.name = _mphhi_hospital_value_formatted; // hospital Name
        lookupItem.entityType = _mphhi_hospital_value_lookuplogicalname; // hospital Entity Name
        lookupData[0] = lookupItem;
        formContext.getAttribute("msemr_actorlocation").setValue(lookupData);
        formContext.getControl("msemr_actorlocation").setVisible(true);
        formContext.getControl("mphhi_preferreddoctor").setVisible(false);
      
    },
    function(error) {
       console.log(error.message);
      }
  );

  console.log("getDefaultHospital end");
}