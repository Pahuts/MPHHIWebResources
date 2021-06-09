$('a[role="menuitem"][href="/access-denied/"]').hide(); //hide my appointments weblink
// add active class to nav link
$('a[role="menuitem"][aria-label="Appointments"]').addClass("active-nav");

// add class to Booking details field set
$("fieldset[aria-label='Booking Details']").addClass("adjust-margin");
$("#mphhi_appointmenttype_label").addClass("custom-label");
// $("#mphhi_appointmenttype").prepend("<p class='sub-content'>Please select the type of appointment you want to book.</p>");
$(".description.above").addClass("custom-description");


$(document).ready(function() {
  
    // get the patient GUID and Name (will be used for the sharepoint flow)
    var getContactGUID = $("#msemr_actorpatient").val();
    var getContactName = $("#msemr_actorpatient_name").val();

    // hide fields
    $("#mphhi_contactname").parent().parent().hide();
    $("#mphhi_contactguid").parent().parent().hide();
    $("#mphhi_contactguidnodashes").parent().parent().hide();

    var contactName = document.getElementById("mphhi_contactname").value = getContactName;
    var contactGUID = document.getElementById("mphhi_contactguid").value = getContactGUID;
    var b = contactGUID.replace(/-/g, "");
    var contactGUIDNoDashes = document.getElementById("mphhi_contactguidnodashes").value = b;
});