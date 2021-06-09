function getUser(executionContext){
  // get current user
  var formContext = executionContext.getFormContext();
  var doctorLookupField = formContext.getAttribute("mphhi_doctor").getValue();
  var userSettings = Xrm.Utility.getGlobalContext().userSettings;
  var currentId = userSettings.userId; 
  var currentName = userSettings.userName;
  if(!doctorLookupField) {
    setLookupField(executionContext, "mphhi_doctor", currentId, currentName, "systemuser");
  } else {
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
}