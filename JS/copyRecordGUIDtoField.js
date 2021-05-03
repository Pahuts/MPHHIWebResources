function getRecordGUID(executionContext) {
  // this script gets the guid of the record and copies it to a dev field
  var formContext = executionContext.getFormContext();
  var devField = formContext.getAttribute("mphhi_devrecordguid").getValue();
  var mainRecordGUID = formContext.data.entity.getId(); // gets the records GUID
  var sliceGUID = mainRecordGUID.slice(1,-1);

  // get lookup guid
  var lookupField = formContext.getAttribute("msemr_actorpatient").getValue();
  var lookupGUID = lookupField[0].id;
  var sliceLookupGUID = lookupGUID.slice(1,-1);
  alert(sliceLookupGUID);


  if(!devField){
    var setMainField = formContext.getAttribute("mphhi_devrecordguid").setValue(sliceGUID); // copy guid to dev field
    var setLookupField = formContext.getAttribute("mphhi_devpatientlookupguid").setValue(sliceLookupGUID); // copy lookup guid to dev field
    console.log("populated");
  }
  console.log("GUID field contains data.");
}