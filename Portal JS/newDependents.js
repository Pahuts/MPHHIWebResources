$(document).ready(function(){
    // ----- END of After Registration Auto Population ------
    //START of Validations for show/hide
    function ShowPwdID() {
        var pwd1 = $("#mphhi_pwd_1").prop("checked");
        var pwd0 = $("#mphhi_pwd_0").prop("checked");
        if (pwd1) {
            $("#mphhi_pwdnumber").val("");
            $("#mphhi_pwdnumber").parent().parent().show();
            $("#mphhi_pwdnumber_label").parent().parent().show();
            
            $("#mphhi_pwdexpirydate_datepicker_description").val("");
            $("#mphhi_pwdexpirydate_datepicker_description").parent().parent().show();
            $("#mphhi_pwdexpirydate_label").parent().parent().show();
        } else if (pwd0) {
            $("#mphhi_pwdnumber").parent().parent().hide();
            $("#mphhi_pwdnumber_label").parent().parent().hide();
            
            $("#mphhi_pwdexpirydate_datepicker_description").parent().parent().hide();
            $("#mphhi_pwdexpirydate_label").parent().parent().hide();
        }
    }
    
    function ShowSeniorCitizen() {
        var snr1 = $("#mphhi_seniorcitizen_1").prop("checked");
        var snr0 = $("#mphhi_seniorcitizen_0").prop("checked");
        if (snr1) {
            $("#mphhi_seniorcitizennumber").val("");
            $("#mphhi_seniorcitizennumber").parent().parent().show();
            $("#mphhi_seniorcitizennumber_label").parent().parent().show();
        } else if (snr0) {
            $("#mphhi_seniorcitizennumber").parent().parent().hide();
            $("#mphhi_seniorcitizennumber_label").parent().parent().hide();
        }
    }
    $('#mphhi_maritalstatus').change(function () 
    {
        if (($("#mphhi_maritalstatus").val() != '') || ($("#mphhi_maritalstatus").val() != null))
        {
            if (($("#mphhi_maritalstatus").val() == 205220001 ) || ($("#mphhi_maritalstatus").val() == 205220006)) 
            {
                //show
                $("#mphhi_spousepartnername").closest("td").show();
            }
            else
            {
                //hide
                $("#mphhi_spousepartnername").closest("td").hide();
                //clear
                $("#mphhi_spousepartnername").val("");
            }
        }
        else
        {
            //hide
            $("#mphhi_spousepartnername").closest("td").hide();
            //clear
            $("#mphhi_spousepartnername").val("");
        }
    });
    //hide
    $("#mphhi_spousepartnername").closest("td").hide();

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

    //css
    // $('.input-group').css({
    //     // 'position' : 'relative',
    //     // 'display': 'table',
    //     // 'border-collapse': 'separate',
    //     //'width': '100%'
    // });
       // hide address fields function
       
    $("#mphhi_address1countryregion").change(clearHideAddressField);
  
    function clearHideAddressField() {
  
      if($("#mphhi_address1countryregion_name").val() == "Philippines") {
        // show fields
        $("#mphhi_region_name").parent().parent().parent().show();
        $("#mphhi_address1stateprovince_name").parent().parent().parent().show();
        $("#mphhi_address1city_name").parent().parent().parent().show();
        $("#mphhi_address1barangay_name").parent().parent().parent().show();
        $("#address1_postalcode").parent().parent().parent().show();
  
      } else {
        // hide fields
        $("#mphhi_region_name").parent().parent().parent().hide();
        $("#mphhi_address1stateprovince_name").parent().parent().parent().hide();
        $("#mphhi_address1city_name").parent().parent().parent().hide();
        $("#mphhi_address1barangay_name").parent().parent().parent().hide();
        $("#address1_postalcode").parent().parent().parent().hide();
        // clear fields
        $("#mphhi_region").val("");
        $("#mphhi_region_name").val("");
        $("#mphhi_region_entityname").val("");
  
        $("#mphhi_address1stateprovince").val("");
        $("#mphhi_address1stateprovince_name").val("");
        $("#mphhi_address1stateprovince_entityname").val("");
  
        $("#mphhi_address1city").val("");
        $("#mphhi_address1city_name").val("");
        $("#mphhi_address1city_entityname").val("");
  
        $("#mphhi_address1barangay").val("");
        $("#mphhi_address1barangay_name").val("");
        $("#mphhi_address1barangay_entityname").val("");
  
        $("#address1_postalcode").val("");
      }
    }
    //  Autopopulate region field
  // GET ODATA RESULT BEFORE EXECUTING
  $("#mphhi_address1stateprovince").change( 
    function() {
        var selectedState = {};
        selectedState = region.find(
            function(regionObject) {
              // return (dateObject.mphhi_date.match("^" + preferredDate) && dateObject.mphhi_doctor.Id == $("#mphhi_preferreddoctor").val());
              return ($("#mphhi_address1stateprovince").val() == regionObject.mphhi_stateid);
            }
        );
        if (selectedState) {
          // autopopulate Region field
          console.log(selectedState.mphhi_region);
          console.log(selectedState.mphhi_region["Id"]); // get id of region
          console.log(selectedState.mphhi_region["Name"]); // get name of region
          $("#mphhi_region").val(selectedState.mphhi_region["Id"]); // id of region
          $("#mphhi_region_name").val(selectedState.mphhi_region["Name"]); // name of region
          $("#mphhi_region_entityname").val("mphhi_region"); // entityname of region
        }
        else {
          // $("#mphhi_timeslotdate").val("").change();
          // clear region lookup
          $("#mphhi_region").val(""); // id of region
          $("#mphhi_region_name").val(""); // name of region
          $("#mphhi_region_entityname").val(""); // entityname of region
          // clear city lookup
          $("#mphhi_address1city").val(""); // id of region
          $("#mphhi_address1city_name").val(""); // name of region
          $("#mphhi_address1city_entityname").val(""); // entityname of region
          // clear barangay
          $("#mphhi_address1barangay").val(""); // id of region
          $("#mphhi_address1barangay_name").val(""); // name of region
          $("#mphhi_address1barangay_entityname").val(""); // entityname of region
        }
    }
);
// End of Autopopulate Function
// disable region lookup
$("#mphhi_region_name").parent().find('.input-group-btn').hide(); 
// =======================================================================================================================================================================
    clearHideAddressField();

});