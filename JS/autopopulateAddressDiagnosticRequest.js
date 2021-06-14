function retrieveHospitalAddress(executionContext) {
  var formContext = executionContext.getFormContext();
  var hLookupField= formContext.getAttribute("mphhi_hospital").getValue();  // lookup id of State/Province
  var currentRecordGUID = formContext.data.entity.getId(); // gets the records GUID

  if(hLookupField){
    console.log("true");
    var hLookupGUID = hLookupField[0].id.slice(1, -1);  // get lookup guid
    // country
    var hLookupCountryData = new Array();
    var hLookupCountry = new Object();
    // region
    var hLookupRegionData = new Array();
    var hLookupRegion = new Object();
    // state
    var hLookupStateData = new Array();
    var hLookupState= new Object();
    // city
    var hLookupCityData = new Array();
    var hLookupCity = new Object();
    // barangay
    var hLookupBarangayData = new Array();
    var hLookupBarangay = new Object();
    // zip code
    var hLookupZIPCodeData = new Array();
    var hLookupZIPCode = new Object();

    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/msemr_locations("+hLookupGUID+")?$select=_mphhi_barangay_value,_mphhi_city_value,_mphhi_country_value,_mphhi_region_value,_mphhi_stateprovince_value,_mphhi_zippostalcodelookup_value", true);
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
                var _mphhi_barangay_value = result["_mphhi_barangay_value"];
                var _mphhi_barangay_value_formatted = result["_mphhi_barangay_value@OData.Community.Display.V1.FormattedValue"];
                var _mphhi_barangay_value_lookuplogicalname = result["_mphhi_barangay_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var _mphhi_city_value = result["_mphhi_city_value"];
                var _mphhi_city_value_formatted = result["_mphhi_city_value@OData.Community.Display.V1.FormattedValue"];
                var _mphhi_city_value_lookuplogicalname = result["_mphhi_city_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var _mphhi_country_value = result["_mphhi_country_value"];
                var _mphhi_country_value_formatted = result["_mphhi_country_value@OData.Community.Display.V1.FormattedValue"];
                var _mphhi_country_value_lookuplogicalname = result["_mphhi_country_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var _mphhi_region_value = result["_mphhi_region_value"];
                var _mphhi_region_value_formatted = result["_mphhi_region_value@OData.Community.Display.V1.FormattedValue"];
                var _mphhi_region_value_lookuplogicalname = result["_mphhi_region_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var _mphhi_stateprovince_value = result["_mphhi_stateprovince_value"];
                var _mphhi_stateprovince_value_formatted = result["_mphhi_stateprovince_value@OData.Community.Display.V1.FormattedValue"];
                var _mphhi_stateprovince_value_lookuplogicalname = result["_mphhi_stateprovince_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var _mphhi_zippostalcodelookup_value = result["_mphhi_zippostalcodelookup_value"];
                var _mphhi_zippostalcodelookup_value_formatted = result["_mphhi_zippostalcodelookup_value@OData.Community.Display.V1.FormattedValue"];
                var _mphhi_zippostalcodelookup_value_lookuplogicalname = result["_mphhi_zippostalcodelookup_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                // get country
                hLookupCountry.id = _mphhi_country_value;
                hLookupCountry.name = _mphhi_country_value_formatted;
                hLookupCountry.entityType = _mphhi_country_value_lookuplogicalname;
                hLookupCountryData[0] = hLookupCountry;
                // get region
                hLookupRegion.id = _mphhi_region_value;
                hLookupRegion.name = _mphhi_region_value_formatted;
                hLookupRegion.entityType = _mphhi_region_value_lookuplogicalname;
                hLookupRegionData[0] = hLookupRegion;
                // get state
                hLookupState.id = _mphhi_stateprovince_value;
                hLookupState.name = _mphhi_stateprovince_value_formatted;
                hLookupState.entityType = _mphhi_stateprovince_value_lookuplogicalname;
                hLookupStateData[0] = hLookupState;
                // get city
                hLookupCity.id = _mphhi_city_value;
                hLookupCity.name = _mphhi_city_value_formatted;
                hLookupCity.entityType = _mphhi_city_value_lookuplogicalname;
                hLookupCityData[0] = hLookupCity;
                // get barangay
                hLookupBarangay.id = _mphhi_barangay_value;
                hLookupBarangay.name = _mphhi_barangay_value_formatted;
                hLookupBarangay.entityType = _mphhi_barangay_value_lookuplogicalname;
                hLookupBarangayData[0] = hLookupBarangay;
                // get zip code
                hLookupZIPCode.id = _mphhi_zippostalcodelookup_value;
                hLookupZIPCode.name = _mphhi_zippostalcodelookup_value_formatted;
                hLookupZIPCode.entityType = _mphhi_zippostalcodelookup_value_lookuplogicalname;
                hLookupZIPCodeData[0] = hLookupZIPCode;
                // populate lookup fields
                if(_mphhi_country_value) {
                  formContext.getAttribute("mphhi_country").setValue(hLookupCountryData); // autopopulate country
                } else {
                  formContext.getAttribute("mphhi_country").setValue(null);
                }
                if(_mphhi_region_value) {
                  formContext.getAttribute("mphhi_region").setValue(hLookupRegionData); // autopopulate region
                } else {
                  formContext.getAttribute("mphhi_region").setValue(null);
                }
                if(_mphhi_stateprovince_value) {
                  formContext.getAttribute("mphhi_state").setValue(hLookupStateData); // autopopulate state
                } else {
                  formContext.getAttribute("mphhi_state").setValue(null);
                }
                if(_mphhi_city_value) {
                  formContext.getAttribute("mphhi_city").setValue(hLookupCityData); // autopopulate city
                } else {
                  formContext.getAttribute("mphhi_city").setValue(null);
                }
                if(_mphhi_barangay_value) {
                  formContext.getAttribute("mphhi_barangay").setValue(hLookupBarangayData); // autopopulate barangay
                } else {
                  formContext.getAttribute("mphhi_barangay").setValue(null);
                }
                if(_mphhi_zippostalcodelookup_value) {
                  formContext.getAttribute("mphhi_zipcode").setValue(hLookupZIPCodeData); // autopopulate zipcode
                } else {
                  formContext.getAttribute("mphhi_zipcode").setValue(null);
                }
            } else {
                console.log("Hospital GUID does not exist.");
            }
        }
    };
    req.send();
  
  }
}

// function updateDiagnosticCenterAddress(executionContext, sliceRecordGUID, _mphhi_barangay_value, _mphhi_city_value, _mphhi_country_value, _mphhi_region_value, _mphhi_stateprovince_value) {
//   var formContext = executionContext.getFormContext();
  
//   var entity = {};
//   entity["mphhi_Barangay@odata.bind"] = "/mphhi_barangaies("+_mphhi_barangay_value+")";
//   entity["mphhi_City@odata.bind"] = "/mphhi_cities("+_mphhi_city_value+")";
//   entity["mphhi_Country@odata.bind"] = "/mphhi_countries("+_mphhi_country_value+")";
//   entity["mphhi_Region@odata.bind"] = "/mphhi_regions("+_mphhi_region_value+")";
//   entity["mphhi_State@odata.bind"] = "/mphhi_states("+_mphhi_stateprovince_value+")";
  
//   var req = new XMLHttpRequest();
//   req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/mphhi_diagnosticcenters("+sliceRecordGUID+")", true);
//   req.setRequestHeader("OData-MaxVersion", "4.0");
//   req.setRequestHeader("OData-Version", "4.0");
//   req.setRequestHeader("Accept", "application/json");
//   req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
//   req.onreadystatechange = function() {
//       if (this.readyState === 4) {
//           req.onreadystatechange = null;
//           if (this.status === 204) {
//               //Success - No Return Data - Do Something
//           } else {
//               Xrm.Utility.alertDialog(this.statusText);
//           }
//       }
//   };
//   req.send(JSON.stringify(entity));

// }

