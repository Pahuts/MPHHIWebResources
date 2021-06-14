$(document).ready(function(){
  // ----- END of After Registration Auto Population ------
  //START of Validations for show/hide

  // get Age 
  // get birth date
      // var bDate = $("#mphhi_dateofbirth_datepicker_description").val();
      // var bSplit = bDate.split("/"); // split values
      // var birthMonth = parseInt(bSplit[0]);
      // var birthDay = parseInt(bSplit[1]);
      // var birthYear = parseInt(bSplit[2]);
  
      // // get date today
      // var dateToday = new Date();
  
      // // get month
      // var month = dateToday.getMonth();
      // // get day
      // var day = dateToday.getDate();
      // // get year
      // var year = dateToday.getFullYear();
  
      // // parse date to int
      // var monthInt = parseInt(month);
      // var dayInt = parseInt(day);
      // var yearInt = parseInt(year);
      // if(birthYear <= yearInt) {
      // $("#mphhi_ageportal").parent().parent().parent().show();
      // if(monthInt < birthMonth && dayInt < birthDay) {
      //     var getAge = yearInt - birthYear - 1;
      //     $("#mphhi_ageportal").val(getAge);
      // } else if (monthInt == birthMonth && dayInt < birthDay){
      //     var getAge = yearInt - birthYear - 1;
      //     $("#mphhi_ageportal").val(getAge);
      // } else if (monthInt == birthMonth && birthDay >= dayInt){
      //     var getAge = yearInt - birthYear;
      //     $("#mphhi_ageportal").val(getAge);
      // }else {
      //     var getAge = yearInt - birthYear;
      //     $("#mphhi_ageportal").val(getAge);
      // }
      // } else {
      // $("#mphhi_ageportal").parent().parent().parent().hide();
      // alert("Invalid birth date.");
      // }


  // disable age field
  // if(isNaN($("#mphhi_ageportal").val())) {
  //   $("#mphhi_ageportal").parent().parent().parent().hide();
  // } else {
  //   $("#mphhi_ageportal").parent().parent().parent().show();
  // }
  // $("#mphhi_ageportal").prop("disabled",true); // disable age field
  $("#mphhi_ageportal").parent().parent().parent().hide();
  
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

// ____ DISABLED COS OF BUG    
     // hide address fields function
     
     
//     $("#mphhi_address1countryregion").change(clearHideAddressField);

//     function clearHideAddressField() {

//       if($("#mphhi_address1countryregion_name").val() == "Philippines") {
//         // show fields
//         $("#mphhi_region_name").parent().parent().parent().show();
//         $("#mphhi_address1stateprovince_name").parent().parent().parent().show();
//         $("#mphhi_address1city_name").parent().parent().parent().show();
//         $("#mphhi_address1barangay_name").parent().parent().parent().show();
//         $("#address1_postalcode").parent().parent().parent().show();

//       } else {
//         // hide fields
//         $("#mphhi_region_name").parent().parent().parent().hide();
//         $("#mphhi_address1stateprovince_name").parent().parent().parent().hide();
//         $("#mphhi_address1city_name").parent().parent().parent().hide();
//         $("#mphhi_address1barangay_name").parent().parent().parent().hide();
//         $("#address1_postalcode").parent().parent().parent().hide();
//         // clear fields
//         $("#mphhi_region").val("");
//         $("#mphhi_region_name").val("");
//         $("#mphhi_region_entityname").val("");

//         $("#mphhi_address1stateprovince").val("");
//         $("#mphhi_address1stateprovince_name").val("");
//         $("#mphhi_address1stateprovince_entityname").val("");

//         $("#mphhi_address1city").val("");
//         $("#mphhi_address1city_name").val("");
//         $("#mphhi_address1city_entityname").val("");

//         $("#mphhi_address1barangay").val("");
//         $("#mphhi_address1barangay_name").val("");
//         $("#mphhi_address1barangay_entityname").val("");

//         $("#address1_postalcode").val("");
//       }
//     }
//    //  Autopopulate region field
//   // GET ODATA RESULT BEFORE EXECUTING
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
// // disable region lookup
// $("#mphhi_region_name").parent().find('.input-group-btn').hide(); 
// // =======================================================================================================================================================================
//     clearHideAddressField();
// ____ DISABLED COS OF BUG

$("input#InsertButton").css('float', 'right'); //place 

//START name fields auto capitalization of first letter
$('#mphhi_lastname').on('keydown', function(event) {
  if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
     var $t = $(this);
     event.preventDefault();
     var char = String.fromCharCode(event.keyCode);
     $t.val(char + $t.val().slice(this.selectionEnd));
     this.setSelectionRange(1,1);
  }
});
$('#mphhi_firstname').on('keydown', function(event) {
  if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
     var $t = $(this);
     event.preventDefault();
     var char = String.fromCharCode(event.keyCode);
     $t.val(char + $t.val().slice(this.selectionEnd));
     this.setSelectionRange(1,1);
  }
});
$('#mphhi_middlename').on('keydown', function(event) {
  if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
     var $t = $(this);
     event.preventDefault();
     var char = String.fromCharCode(event.keyCode);
     $t.val(char + $t.val().slice(this.selectionEnd));
     this.setSelectionRange(1,1);
  }
});
//END name fields auto capitalization of first letter

//START mobile number validation
$('#mphhi_mobilephone').after('<div style="margin-top: 7px;" id="CheckCountryCode"></div>');
$('#CheckCountryCode').after('<div style="margin-top: 7px;" id="CheckLength"></div>');
$("#mphhi_mobilephone").on('keyup', function() // If password DOES NOT have one special character 
{
  var mobilenumber = $("#mphhi_mobilephone").val();
  var first2 = mobilenumber.substr(0, 2);

  if ((mobilenumber != null) || (mobilenumber != ""))
  {
      if (first2 != 63) {
          $("#CheckCountryCode").html("Mobile number should start with the value 63").css("color","red");
          $("#CheckCountryCode").css("display","block");
      }
      else if (first2 == 63) {
          $("#CheckCountryCode").html("").css("display","none");
      }
      else
      {
          $("#CheckCountryCode").html("Mobile number should start with 63").css("color","red");
          $("#CheckCountryCode").css("display","block");
      }
  }
});


$('#mphhi_mobilephone').on('keyup', function () { // prevent letters and special character input
  var c = this.selectionStart,
      r = /[^0-9]/gi,
      v = $(this).val();
  if (r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
  }
  this.setSelectionRange(c, c);
});

$("#mphhi_mobilephone").on('keyup', function() // If mobile phone exceeds 12 characters
{
  var mobilenumber = $("#mphhi_mobilephone").val();
  if ((mobilenumber != null) || (mobilenumber != ""))
  {
      if (mobilenumber.length > 12) {
          $("#CheckLength").html("Mobile number should not exceed 12 numbers").css("color","red");
          $("#CheckLength").css("display","block");
      }
      else if (mobilenumber.length <= 12) {
          $("#CheckLength").html("").css("display","none");
      }
      else
      {
          $("#CheckLength").html("Mobile number should not exceed 12 numbers").css("color","red");
          $("#CheckLength").css("display","block");
      }
  }
});
//END mobile number validation
//CUSTOM CSS FOR NEW UI
  $('#mphhi_legalnextofkin').parent().parent().parent().css('vertical-align','middle'); //align middle the legal next of kin checkbox

  $('fieldset[aria-label="Discount IDs"]').find('legend[class="section-title"]').append('<div class="description below" style="color: #666;font-style: italic !important;font-size: 13px;">Please select applicable Discount IDs that you have</div>'); //PWD section

  $("#mphhi_pwd").parent().parent().parent().css('padding','10px 20px'); //PWD checkbox

  $(".crmEntityFormView .cell").css('padding','0 6px 20px;');

  $(".form-control").css('border-color','#5BBA47');

  // $("#mphhi_contactlookup option:contains('"+userfullname+"')").remove(); //remove option same as user fullname
  // $("#mphhi_contactlookup option").each(function()
  // {
  //     $( "#mphhi_contactlookup option" ).text();
  //     $('#theOptions2 option[value=' + val + ']').remove();
  // });
});