$('a[role="menuitem"][href="/access-denied/"]').hide(); //hide my appointments weblink
// add active class to nav link
$('a[role="menuitem"][aria-label="Appointments"]').addClass("active-nav");

// add class to Booking details field set
// $("fieldset[aria-label='Booking Details']").addClass("adjust-margin");
// $("#mphhi_appointmenttype_label").addClass("custom-label");
// // $("#mphhi_appointmenttype").prepend("<p class='sub-content'>Please select the type of appointment you want to book.</p>");
// $(".description.above").addClass("custom-description");


$(document).ready(function() {
  // Limit file types for sharepoint upload
  $("input[name='file']").attr("id","filer");// add id to the file button
  function fileValidation() {
  var fileInput = document.getElementById('filer');
  var filePath = fileInput.value;
  // Allowing file type   // /(\.doc|\.docx|\.xlsx|\.pdf|\.jpg|\.png|\.rtf|\.wps|\.wks|\.wpd)$/i;
  var allowedExtensions = /(\.doc|\.docx|\.xlsx|\.pdf|\.jpg|\.png)$/i;
  if (!allowedExtensions.exec(filePath)) {
      alert('Invalid file type');
      fileInput.value = '';
      return false;
    }
  }

$("#filer").change(fileValidation);
// end of file type limitation script

// check if file exceed 5mb
  $('#filer').bind('change', function() {
    //this.files[0].size gets the size of your file.
    //alert(this.files[0].size); // returns the file size in bytes
    let fileSizeInBytes = this.files[0].size;
    let fileSizeInMB = fileSizeInBytes / 1048576; // generates the file size into MB
    let fileInput = document.getElementById('filer');
    //alert(fileSizeInMB);
    if(fileSizeInMB > 2) { // check if file size is greater than 5 mb
        alert('File exceeds 2 mb.');
        fileInput.value = '';
        return false;
    }
  });
// end of file size limitation function

    // Nag-eerror itong code haha
    /*
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
    */
    
    // autosearch lookup after user is done typing
    var typingTimer; //timer identifier
    var doneTypingInterval = 1000;  //time in ms
    var $inputLookup = $('.query.form-control');
    
    $inputLookup.on('keyup', function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTypingLookup, doneTypingInterval);
    });
    
    //on keydown, clear the countdown 
    $inputLookup.on('keydown', function () {
      clearTimeout(typingTimer);
    });
    
    function doneTypingLookup () {
      $("button[aria-label='Search Results']").click();
    }
});

// add description to step 3 subgrids
$("fieldset[aria-label='Attach the Files you want to share with your Doctor'] .section-title").append("<br><p class='attach-files-subgrid'>The file you want to attach should not exceed 2 mb. Only .docx, .xlsx, .pdf, .jpg, and .png file types are allowed.</p>");


//check if previous page is from dependent appointment
      // alert("previous url is: " + document.referrer);
      // var dependentpage = 'https://mphhi-dev-us.powerappsportals.com/my-appointments/dependents-appointments/';
      // if(document.referrer == dependentpage)
      // {

      //   $("#msemr_actorpatient").parent().parent().find('button[title="Clear lookup field"]').click();
      // }

      