function getCountry(executionContext){
  // get current user
  var formContext = executionContext.getFormContext();
  var countryLookupField = formContext.getAttribute("mphhi_country").getValue();
  var currentId = "fbd569a5-30b1-eb11-8236-000d3a54b303";
  var currentName = "Philippines";

  if(!countryLookupField) {
    setLookupField(executionContext, "mphhi_country", currentId, currentName, "mphhi_country"); // lookup field for user country
    console.log(" ");
  }
}

function setLookupField(executionContext, fieldName, lookupId, lookupName, entityName) {
  var formContext = executionContext.getFormContext();
  var lookupData = new Array();
  var lookupItem = new Object();

  lookupItem.id = lookupId;
  lookupItem.name = lookupName;
  lookupItem.entityType = entityName;
  lookupData[0] = lookupItem;

  formContext.getAttribute(fieldName).setValue(lookupData);
  Xrm.Page.getAttribute(fieldName).fireOnChange()
}