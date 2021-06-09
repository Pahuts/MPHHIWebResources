function autopopulateRegion(executionContext) {

var formContext = executionContext.getFormContext();
var lookup= formContext.getAttribute("mphhi_address1stateprovince").getValue();  // lookup id of State/Province


  if(lookup){
    var newid = lookup[0].id.slice(1, -1);  //
    var lookupData = new Array();
    var lookupItem = new Object();
    Xrm.WebApi.online.retrieveRecord("mphhi_state", ""+ newid +"", "?$select=_mphhi_region_value").then( // web api to retrieve related region
      function success(result) {
          var _mphhi_region_value = result["_mphhi_region_value"];
          var _mphhi_region_value_formatted = result["_mphhi_region_value@OData.Community.Display.V1.FormattedValue"];
          var _mphhi_region_value_lookuplogicalname = result["_mphhi_region_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
          console.log("REGION: " +_mphhi_region_value);
          console.log(_mphhi_region_value_formatted);
          console.log(_mphhi_region_value_lookuplogicalname);
        
          lookupItem.id = _mphhi_region_value;
          lookupItem.name = _mphhi_region_value_formatted;
          lookupItem.entityType = _mphhi_region_value_lookuplogicalname;
          lookupData[0] = lookupItem;
        
          formContext.getAttribute("mphhi_region").setValue(lookupData); // autopopulate region
      },
      function(error) {
          console.log(error.message);
      }
    );
  } else {
    Xrm.Page.getAttribute("mphhi_region").setValue("");
  }
}