$(document).ready(function () {
  // INITIALIZE FORM
  $("td.lookup div.input-group").width("100%");   // Expand all lookup fields

  $("[data-name='hidden']").closest("fieldset").hide();  // Hide dev section

  // Reposition From Previous appointment radio button
  $("label[for='mphhi_frompreviousappointment_1']").insertBefore($("#mphhi_frompreviousappointment_0"));
  $("#mphhi_frompreviousappointment_1").insertBefore("label[for='mphhi_frompreviousappointment_1']");

  // Adjust Quick View form colspan
  $("#PreviousAppointmentQV").closest("td").attr("colspan","2");

  $("a.add-folder.btn.btn-info.action").hide(); // Hide SharePoint "New Folder" button

  $("#mphhi_previousappointment").closest("td").hide(); // Hide previous appointment field

  // Show or hide Previous Appointment field based on "Do you have previous prescription/s or attachment/s from previous appointment?" field
  $("#mphhi_frompreviousappointment").change(
      function() {
          if($("#mphhi_frompreviousappointment_0").prop("checked")) {
              $("#mphhi_previousappointment").parent().parent().parent().hide(); // Hide previous appointment field
          } else if($("#mphhi_frompreviousappointment_1").prop("checked")) {
              $("#mphhi_previousappointment").parent().parent().parent().show(); // Show previous appointment field
              $("#mphhi_previousappointment").closest(".control").prev(".info").addClass("required");
          }
      }
  );
  
  // Adjust lookup colspan
  $("#mphhi_previousappointment").closest("td").attr("colspan","2");
  // Mark lookups as required
  $("#mphhi_paymentmethod").closest(".control").prev(".info").addClass("required");
  $("#mphhi_paymentoption").closest(".control").prev(".info").addClass("required");

  // Relabel "Do you have LOA?" options
  $("label[for='mphhi_withloa_0']").html('<span class="sr-only">Do you have an LOA? </span>No');
  $("label[for='mphhi_withloa_1']").html('<span class="sr-only">Do you have an LOA? </span>Yes, I have a copy');

  $("label[for='mphhi_withloa_1']").insertBefore($("#mphhi_withloa_0"));
  $("#mphhi_withloa_1").insertBefore("label[for='mphhi_withloa_1']");
  

  // BIND CHANGE FUNCTIONS
  
  // Change fields based on Appointment Type
  var defaultTNCLabel = $("#mphhi_agreetotelemedconditions_label").html();    // Get default label for terms and conditions checkbox
  var appointmentType = $("#mphhi_appointmenttype").val();

  // Clear agreement checkbox
  $("#mphhi_agreetotelemedconditions").prop("checked", false);
  $("#mphhi_agreetotelemedconditions").change();
  
  switch (appointmentType) {
      case "205220000":       // E-Consultation
          // Show payment
          $(".section[data-name='payment']").closest("fieldset").show();
          // Show agreement checkbox
          $("#mphhi_agreetotelemedconditions").closest("td").show();
          $("#mphhi_agreetotelemedconditions_label").html("I agree with the provisions on the <a href='/consent-to-telemedicine' target='_blank'>Consent to Telemedicine Conditions</a>.");
          break;
      case "205220001":       // Face-to-Face Consultation
          // Hide payment
          $(".section[data-name='payment']").closest("fieldset").hide();
          // Clear payment
          $("#mphhi_paymentoption").val("");
          $("#mphhi_paymentmethod").val("");
          $("#mphhi_withloa_1").prop("checked", false);
          // Show agreement checkbox
          $("#mphhi_agreetotelemedconditions").closest("td").show();
          $("#mphhi_agreetotelemedconditions_label").html("I agree with the conditions on the <a href='/privacy-notice' target='_blank'>Telemed Data Privacy Notice</a>.");
          break;
      case "205220002":       // Outpatient Service
          // Hide payment
          $(".section[data-name='payment']").closest("fieldset").show();
          // Clear payment
          $("#mphhi_paymentoption").val("");
          $("#mphhi_paymentmethod").val("");
          $("#mphhi_withloa_1").prop("checked", false);
          // Show agreement checkbox
          $("#mphhi_agreetotelemedconditions").closest("td").show();
          $("#mphhi_agreetotelemedconditions_label").html("I agree with the provisions on the <a href='/consent-for-procedure' target='_blank'>Consent for Procedure</a>.");
          break;
      default:
          // Hide payment
          $(".section[data-name='payment']").closest("fieldset").hide();
          // Clear payment
          $("#mphhi_paymentoption").val("");
          $("#mphhi_paymentmethod").val("");
          $("#mphhi_withloa_1").prop("checked", false);
          // Hide agreement checkbox
          $("#mphhi_agreetotelemedconditions").closest("td").hide();
          $("#mphhi_agreetotelemedconditions_label").html(defaultTNCLabel);
          break;
  }


  // BIND CHANGE FUNCTIONS

  // Hide/Show Payment Method based on Payment Option
  $("#mphhi_paymentoption").change(
      function() {
          if ($("#mphhi_paymentoption").val() == "205220000") {   // Self-Pay
              $("#mphhi_paymentmethod").closest("tr").show();     // Hide/show the entire row
              $("#mphhi_withloa").closest("tr").hide();
              $("#mphhi_withloa_1").prop("checked", false);
          }
          else if ($("#mphhi_paymentoption").val() == "205220001"){   // HMO
              $("#mphhi_paymentmethod").closest("tr").hide();
              $("#mphhi_paymentmethod").val("");
              $("#mphhi_withloa").closest("tr").show();
          }
          else {
              $("#mphhi_paymentmethod").closest("tr").hide();
              $("#mphhi_paymentmethod").val("");
              $("#mphhi_withloa").closest("tr").hide();
              $("#mphhi_withloa_1").prop("checked", false);
          }
      }
  );
  $("#mphhi_paymentoption").change();

  // Enable/disable Submit button based on whether agreement has been accepted
  $("#mphhi_agreetotelemedconditions").change(
      function() {
          if ($("#mphhi_agreetotelemedconditions").prop("checked")) {
              $("#SubmitButton").prop("disabled", false);
          }
          else {
              $("#SubmitButton").prop("disabled", true);
          }
      }
  );
  $("#mphhi_agreetotelemedconditions").change();


  // DEFINE VALIDATORS
  
  // Payment Option validator
  var paymentOptionValidator = document.createElement('span');
  paymentOptionValidator.style.display = "none";
  paymentOptionValidator.id = "paymentOptionValidator";
  paymentOptionValidator.controltovalidate = "mphhi_paymentoption";
  paymentOptionValidator.errormessage = "<a href='#mphhi_paymentoption_label'>Payment Option is a required field.</a>";
  paymentOptionValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
  paymentOptionValidator.initialvalue = "";
  paymentOptionValidator.evaluationfunction = function () {
      if ($("#mphhi_appointmenttype").val() == "205220000"   // Appointment Type is E-Consultation
          && !$("#mphhi_paymentoption").val()) {
          return false;
      }
      else {
          return true;
      }
  };
  // Add the new validator to the page validators array:
  Page_Validators.push(paymentOptionValidator);
  // Wire-up the click event handler of the validation summary link
  $("a[href='#mphhi_paymentoption_label']").on("click", function () { scrollToAndFocus('mphhi_paymentoption_label','mphhi_paymentoption'); });
  

  // Payment Method validator
  var paymentMethodValidator = document.createElement('span');
  paymentMethodValidator.style.display = "none";
  paymentMethodValidator.id = "paymentMethodValidator";
  paymentMethodValidator.controltovalidate = "mphhi_paymentmethod";
  paymentMethodValidator.errormessage = "<a href='#mphhi_paymentmethod_label'>Payment Method is a required field.</a>";
  paymentMethodValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
  paymentMethodValidator.initialvalue = "";
  paymentMethodValidator.evaluationfunction = function () {
      if ($("#mphhi_appointmenttype").val() == "205220002"   // Appointment Type is Outpatient Service
          && $("#mphhi_paymentoption").val() == "205220000"   // Payment Option is Self-Pay
          && !$("#mphhi_paymentmethod").val()) {
          return false;
      }
      else {
          return true;
      }
  };
  // Add the new validator to the page validators array:
  Page_Validators.push(paymentMethodValidator);
  // Wire-up the click event handler of the validation summary link
  $("a[href='#mphhi_paymentmethod_label']").on("click", function () { scrollToAndFocus('mphhi_paymentmethod_label','mphhi_paymentmethod'); });
  
  
  // LOA validator
  var LOAValidator = document.createElement('span');
  LOAValidator.style.display = "none";
  LOAValidator.id = "LOAValidator";
  LOAValidator.controltovalidate = "mphhi_paymentmethod";
  LOAValidator.errormessage = "<a href='#mphhi_paymentmethod_label'>At least one file must be uploaded for the LOA.</a>";
  LOAValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
  LOAValidator.initialvalue = "";
  LOAValidator.evaluationfunction = function () {
      if ($("#mphhi_withloa_1").prop("checked")) {
          if ($("#Files .sharepoint-data tbody").children().length) {
              return true;
          }
          else {
              return false;
          }
      }
      else {
          return true;
      }
  };
  // Add the new validator to the page validators array:
  Page_Validators.push(LOAValidator);
  // Wire-up the click event handler of the validation summary link
  $("a[href='#Files']").on("click", function () { scrollToAndFocus('Files','Files'); });


  // Odata for Outpatient Service
    //===========================================================================================================================================================================
  // OData query for prepayment - Outpatient Services Entity
  var prePayment = [];
  var outPatientServicesURL = "~/_odata/OutpatientService";
  $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      url: outPatientServicesURL,
      beforeSend: function(XMLHttpRequest) {
          XMLHttpRequest.setRequestHeader("Accept", "application/json");
      },
      async: false,
      success: function(data, textStatus, xhr) {
        prePayment = prePayment.concat(data.value);
        outPatientServicesURL = data["odata.nextLink"];
      }
  });

// Populated Timeslot Date lookup based on Preferred Date
// GET ODATA RESULT BEFORE EXECUTING
var outPatientService = $("#mphhi_outpatientservice").val();
if(outPatientService) {
  // $("#mphhi_outpatientservice").change( 
  //   function() {
        var selectedOutPatientService = {};
        selectedOutPatientService = prePayment.find(
            function(prePaymentObject) {
              return ($("#mphhi_outpatientservice").val() == prePaymentObject.mphhi_outpatientservicesid);
            }
        );
        if (selectedOutPatientService) {
            console.log("Prepayment Value: " + selectedOutPatientService.mphhi_prepaymentrequired);
            if(selectedOutPatientService.mphhi_prepaymentrequired == true){
              $("#mphhi_paymentmethod").children('option:eq(3)').hide();
            } else {
              $("#mphhi_paymentmethod").children('option:eq(3)').show();
            }
        }
        else {
            // $("#mphhi_timeslotdate").val("").change();
            console.log("No outpatient service selected.");
        }
     
  // );
}

// $("#mphhi_outpatientservice").change();
// =======================================================================================================================================================================
$("#mphhi_outpatientservice").parent().parent().parent().hide();
});