var getContactGUID = $("#msemr_actorpatient").val();
var getContactName = $("#msemr_actorpatient_name").val();

var contactName = document.getElementById("mphhi_contactname").value = getContactName;
var contactGUID = document.getElementById("mphhi_contactguid").value = getContactGUID;
var b = contactGUID.replace(/-/g, "");
var contactGUIDNoDashes = document.getElementById("mphhi_contactguidnodashes").value = b;
