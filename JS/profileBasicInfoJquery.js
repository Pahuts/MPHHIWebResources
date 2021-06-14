$('a[role="menuitem"][href="/access-denied/"]').hide(); //hide my appointments weblink
// add active class to nav link
$('a[role="menuitem"][aria-haspopup="true"]').addClass("active-nav");
$(document).ready(function(){
    // ----- START of After Registration Auto Population ------
//    $('#salutation').val(localStorage.getItem("salutation"));
//    $('#lastname').val(localStorage.getItem("lastname"));
//    $('#firstname').val(localStorage.getItem("firstname"));
//    $('#mphhi_suffix').val(localStorage.getItem("mphhi_suffix"));
//    $('#middlename').val(localStorage.getItem("middlename"));
//    //insert for DOB
//    $('#mphhi_governmentissuedidtype').val(localStorage.getItem("mphhi_governmentissuedidtype"));
//    $('#governmentid').val(localStorage.getItem("governmentid"));
//    //mobilephone
//    $('#mobilephone').val(localStorage.getItem("mobilephone"));
//    //addresses
//    $('#address1_line1').val(localStorage.getItem("address1_line1"));
//    $('#address1_line2').val(localStorage.getItem("address1_line2"));

    //need to add condition if page is on first load
    //$('#ContentContainer_MainContent_MainContent_ContentBottom_SubmitButton').click();
    //localStorage.clear();
    
    
    // ----- END of After Registration Auto Population ------
    //START of Validations for show/hide
    function ShowPwdID() {
        // var pwd1 = $("#mphhi_pwd_1").prop("checked");
        // var pwd0 = $("#mphhi_pwd_0").prop("checked");
        // if (pwd1) {
        //     $("#mphhi_pwdnumber").val("");
        //     $("#mphhi_pwdnumber").parent().parent().parent().show();
        //     $("#mphhi_pwdnumber_label").parent().parent().show();
            
        //     $("#mphhi_pwdexpirydate_datepicker_description").val("");
        //     $("#mphhi_pwdexpirydate_datepicker_description").parent().parent().show();
        //     $("#mphhi_pwdexpirydate_label").parent().parent().show();

        //     //show Sharepoint Subgrid
        //     $('table[data-name="Files"]').parent().show();
        //     $('tr[data-foldername="msemr_appointmentemr"]').hide(); // Hide SharePoint appointment emr folder
        // } else if (pwd0) {
        //     $("#mphhi_pwdnumber").parent().parent().parent().hide();
        //     $("#mphhi_pwdnumber_label").parent().parent().hide();
            
        //     $("#mphhi_pwdexpirydate_datepicker_description").parent().parent().hide();
        //     $("#mphhi_pwdexpirydate_label").parent().parent().hide();

        //     //hide Sharepoint Subgrid
        //     $('table[data-name="Files"]').parent().hide();
        //     $('tr[data-foldername="msemr_appointmentemr"]').hide(); // Hide SharePoint appointment emr folder
        // }

        //$("#mphhi_pwd").prop("checked", true);

        if ($('#mphhi_pwd').is(":checked") === true ) {
            $("#mphhi_pwdnumber").val("");
            $("#mphhi_pwdnumber").parent().parent().parent().show();
            $("#mphhi_pwdnumber_label").parent().parent().show();
                
            $("#mphhi_pwdexpirydate_datepicker_description").val("");
            $("#mphhi_pwdexpirydate_datepicker_description").parent().parent().show();
            $("#mphhi_pwdexpirydate_label").parent().parent().show();
    
            //show Sharepoint Subgrid
            $('table[data-name="Files"]').parent().show();
            $('tr[data-foldername="msemr_appointmentemr"]').hide(); // Hide SharePoint appointment emr folder
        } else if ($('#mphhi_pwd').is(":checked") === false ) {
            $("#mphhi_pwdnumber").parent().parent().parent().hide();
            $("#mphhi_pwdnumber_label").parent().parent().hide();
            
            $("#mphhi_pwdexpirydate_datepicker_description").parent().parent().hide();
            $("#mphhi_pwdexpirydate_label").parent().parent().hide();
    
            //hide Sharepoint Subgrid
            $('table[data-name="Files"]').parent().hide();
            $('tr[data-foldername="msemr_appointmentemr"]').hide(); // Hide SharePoint appointment emr folder
        }
    }
    
    function ShowSeniorCitizen() {
        var agePortal = $("#mphhi_ageportal").val();
        var snr1 = $("#mphhi_seniorcitizen_1").prop("checked");
        var snr0 = $("#mphhi_seniorcitizen_0").prop("checked");

        $("#mphhi_seniorcitizen_0").attr('disabled');
        if (agePortal >= 60)
        {
            $('#mphhi_seniorcitizen_1').prop('checked', true);
            $("#mphhi_seniorcitizennumber").parent().parent().parent().show();
            $("#mphhi_seniorcitizennumber_label").parent().parent().show();

            //show Sharepoint Subgrid
            $('table[data-name="Files"]').parent().show();
            $('tr[data-foldername="msemr_appointmentemr"]').hide(); // Hide SharePoint appointment emr folder
        }
        else if (agePortal < 60)
        {
            $('#mphhi_seniorcitizen_0').prop('checked', true);
            $("#mphhi_seniorcitizennumber").parent().parent().parent().hide();
            $("#mphhi_seniorcitizennumber_label").parent().parent().hide();

            //hide Sharepoint Subgrid
            $('table[data-name="Files"]').parent().hide();
            $('tr[data-foldername="msemr_appointmentemr"]').hide(); // Hide SharePoint appointment emr folder
        }
        
        // if (snr1) {
        //     $("#mphhi_seniorcitizennumber").val("");
        //     $("#mphhi_seniorcitizennumber").parent().parent().show();
        //     $("#mphhi_seniorcitizennumber_label").parent().parent().show();

        //     //show Sharepoint Subgrid
        //     $('table[data-name="Files"]').parent().show();
        //     $('tr[data-foldername="msemr_appointmentemr"]').hide(); // Hide SharePoint appointment emr folder
        // } else if (snr0) {
        //     $("#mphhi_seniorcitizennumber").parent().parent().hide();
        //     $("#mphhi_seniorcitizennumber_label").parent().parent().hide();

        //     //show Sharepoint Subgrid
        //     $('table[data-name="Files"]').parent().hide();
        //     $('tr[data-foldername="msemr_appointmentemr"]').hide(); // Hide SharePoint appointment emr folder
        // }
    }
    //disable senior citizen
    $("#mphhi_seniorcitizen_0").attr('disabled', true); 
    $("#mphhi_seniorcitizen_1").attr('disabled', true);
    //hide senior citizen field
    $("#mphhi_seniorcitizen").parent().parent().parent().hide();

    $('#mphhi_maritalstatus').change(function () 
    {
        if (($("#mphhi_maritalstatus").val() != '') || ($("#mphhi_maritalstatus").val() != null))
        {
            if (($("#mphhi_maritalstatus").val() == 205220001 ) || ($("#mphhi_maritalstatus").val() == 205220006)) 
            {
                //show
                $("#spousesname").closest("td").show();
            }
            else
            {
                //hide
                $("#spousesname").closest("td").hide();
                //clear
                $("#spousesname").val("");
            }
        }
        else
        {
            //hide
            $("#spousesname").closest("td").hide();
            //clear
            $("#spousesname").val("");
        }
    });
    //hide
    $("#spousesname").closest("td").hide();

    ShowPwdID();
    ShowSeniorCitizen();
    $("#mphhi_pwd").change(ShowPwdID);
    $("#mphhi_seniorcitizen").change(ShowSeniorCitizen);
    //END of Validations for show/hide
    
    //START of Field Validations
        //start birthday validation
        if (typeof (Page_Validators) == 'undefined') return;
        // Date of birth validator: disallow future date
        var dateOfBirthValidator = document.createElement('span');
        dateOfBirthValidator.style.display = "none";
        dateOfBirthValidator.id = "mphhi_dateofbirthValidator";
        dateOfBirthValidator.controltovalidate = "mphhi_dateofbirth";
        dateOfBirthValidator.errormessage = "<a href='#mphhi_dateofbirth'>Date of Birth cannot be set to a future date.</a>";
        dateOfBirthValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
        dateOfBirthValidator.initialvalue = "";
        dateOfBirthValidator.evaluationfunction = function () {
            var currentDate = new Date();
            var dateOfBirth = $("#mphhi_dateofbirth").val();
            if (dateOfBirth) {
                dateOfBirth = new Date(dateOfBirth);      // Convert to Date object if filled in
            }
            if ((dateOfBirth == "") || (dateOfBirth < currentDate)) {
                return true;
            }
            else {
                return false;
            }
        };

        // Add the new validator to the page validators array:
        Page_Validators.push(dateOfBirthValidator);

        // Wire-up the click event handler of the validation summary link
        $("a[href='#mphhi_dateofbirth']").on("click", function () { scrollToAndFocus('mphhi_dateofbirth'); });
        //end birthday validation
    //END of Field Validations



    //Hide OOB Sections
    $("#ContentContainer_MainContent_MainContent_ContentBottom_MarketingOptionsPanel").hide();
    $("#ProfileFormView").parent().hide();
    
    //Insert CSS
    //$("input#governmentid").closest("td").css("padding-top", "20px");
    //move subgrid above save button
    $('#UpdateButton').appendTo('#EntityListControl');
    $('#UpdateButton').css("margin-top", "20px");
    $('#UpdateButton').css("margin-bottom", "50px");
    $('#UpdateButton').addClass("pull-right");
    //add Guarantors label to subgrid
    $("#EntityListControl").prepend('<legend class="section-title">Guarantor</legend>');
    //hide dependents weblink
    $('a[class="weblink list-group-item"][aria-label="Manage My Dependents"]').hide();
    //hide dependents-appointments weblink
    $('a[class="weblink list-group-item"][href="/dependents-appointments/"]').hide();

    //hide dependents weblink
    $('a[href="/dependents/"][class="weblink list-group-item"]').hide();

    //hide in header dropdown
    $('a[href="/profile/profile-my-appointments/"][role="menuitem"]').hide();
    $('a[href="/profile/profile-my-medical-histories/"][role="menuitem"]').hide();
    $('a[href="/guarantors/"][role="menuitem"]').hide();
    $('a[href="/dependents-appointments/"][role="menuitem"]').hide();
    
    //hide if Corporate User
    if ($('#mphhi_corporateuser_1').is(":checked") == true) //check if email confirmed is yes
    {
        $('a[class="weblink list-group-item"][href="/profile/profile-my-appointments/"][title="Appointments"][aria-label="Appointments"]').hide(); //hide appointments
        $('a[class="weblink list-group-item"][href="/profile/profile-my-medical-histories/"][title="Medical History"][aria-label="Medical History"]').hide(); //hide medical history
        $('a[class="weblink list-group-item"][href="/guarantors/"][title="Guarantors"][aria-label="Guarantors"]').hide(); //hide guarantors
        $('a[class="weblink list-group-item"][aria-label="Manage My Dependents"]').hide(); //hide dependents weblink
        $('a[href="/dependents/"][role="menuitem"][aria-label="Manage My Dependents"]').hide(); // hide dependents in header dropdown
        $('a[href="/my-appointments/dependents-appointments/"][role="menuitem"]').hide(); // hide dependents appointments in header dropdown
        $('a[class="dropdown-toggle"][aria-label="Appointments"][role="menuitem"]').hide(); // hide appointments in header 
    }
    else{
        $('a[href="/corporate-appointments/"][role="menuitem"]').hide(); // hide corporate appointments in header 
    }
    
    $('#mphhi_corporateuser').parent().parent().hide();//hide corporate user field


// Start of Profile Image Script
     var WFId;
     var userName = '{{user.fullname}}';
     var userId = '{{user.id}}';
     var path = "~/" + userId + "_profilepic";
     var profilePic = userId + "_profilepic";
     var GetWebfile = "~/_odata/webfileset/?$filter=adx_name eq '" + profilePic + "'";

     $.ajax({
         type: "GET",
         url: GetWebfile,
         dataType: 'json'
     }).done(function (json) {
         var WFColl = json.value;
         // Get Webfile Guid
         WFId = WFColl[0].adx_webfileid;
     })
    
     $('.col-md-4').find("img").removeAttr("src");
     $('.col-md-4').find("img").attr("src", path);
     $('.col-md-4').find("img").attr("style", "height: 60px;width: 60px;border-radius: 30px;");
     // Show default Image If user has not uploaded profile pic yet
     $('.col-md-4').find("img").attr("onerror", "this.onerror=null; this.src='/xrm-adx/images/contact_photo.png';");
     $('.col-md-4').find("img").click(function () {
         var imagePath = $('.col-md-4').find("img").attr("src");
         if (imagePath.indexOf("_profilepic") >= 0) // To Update Profile Pic
         {
             window.open("~/Profile-Image-Update-Page/?id=" + WFId + "", "", "top=150,left=300,width=600,height=300");
         } 
         else // To Upload Profile Pic first time
         {
             window.open("~/Profile-Image-Page", "", "top=150,left=300,width=400,height=150");
         }
     });
// End of Profile Image Script

//hide security 
$(".nav-profile").hide();

$("a.add-folder.btn.btn-info.action").hide(); // Hide SharePoint "New Folder" button

$('tr[data-foldername="msemr_appointmentemr"]').hide(); // Hide SharePoint appointment emr folder

//CUSTOM CSS FOR NEW UI
$("#mphhi_ageportal").parent().parent().parent().hide(); //hide age field
$("#UpdateButton").attr('value','Save Edit'); //rename save button
$('fieldset[aria-label="Attach the copies of your IDs"]').find('legend[class="section-title"]').append('<div class="description below" style="color: #666;">The file size you want to attach should not exceed 2mb. Only .docx .xlsx .pdf .jpg and .png file types are allowed</div>');

$('a[class="weblink list-group-item"][href="/profile/"]').css('background-color','rgb(15, 75, 145) !important');
$('a[class="weblink list-group-item"][href="/profile/"]').css('color','#fff');
$('a[class="weblink list-group-item"][href="/profile/"]').find('span').html('Basic Information');

$('#mphhi_legalnextofkin').parent().parent().parent().css('vertical-align','middle'); //align middle the legal next of kin checkbox

$("#mphhi_pwd").parent().parent().parent().css('padding','10px 20px'); //PWD checkbox

$('fieldset[aria-label="Discount IDs"]').find('legend[class="section-title"]').append('<div class="description below" style="color: #666;">Please select applicable Discount IDs that you have</div>'); //PWD section

$('<hr style="border-top: 1px solid lightgrey;"></hr>').insertBefore('fieldset[aria-label="Section"]'); //add horizontal rule before the new section
$('<hr style="border-top: 1px solid lightgrey;"></hr>').insertBefore('fieldset[aria-label="Discount IDs"]'); //add horizontal rule before the new section
//$('<hr style="border-top: 1px solid lightgrey;"></hr>').insertBefore('fieldset[aria-label="Attach the copies of your IDs"]'); //add horizontal rule before the new section
$('<hr style="border-top: 1px solid lightgrey;"></hr>').insertBefore('fieldset[aria-label="Address Information"]'); //add horizontal rule before the new section
$('<hr style="border-top: 1px solid lightgrey;"></hr>').insertBefore('fieldset[aria-label="Contact Information"]'); //add horizontal rule before the new section
$('<hr style="border-top: 1px solid lightgrey;"></hr>').insertBefore('fieldset[aria-label="Emergency Contact"]'); //add horizontal rule before the new section

// adjust region border radius
$('#mphhi_region_name').css('border-radius', '5px');

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