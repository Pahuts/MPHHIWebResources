$(document).ready(function() {  
    // Mark lookups as required
    $("#mphhi_paymentmethod").closest(".control").prev(".info").addClass("required");
    $("#mphhi_paymentoption").closest(".control").prev(".info").addClass("required");
  
    // Relabel "Do you have LOA?" options
    $("label[for='mphhi_withloa_0']").html('<span class="sr-only">Do you have an LOA? </span>No');
    $("label[for='mphhi_withloa_1']").html('<span class="sr-only">Do you have an LOA? </span>Yes, I have a copy');
  
    $("label[for='mphhi_withloa_1']").insertBefore($("#mphhi_withloa_0"));
    $("#mphhi_withloa_1").insertBefore("label[for='mphhi_withloa_1']");

    $("[data-name='hidden3']").closest("fieldset").hide();
  
    $("a.add-folder.btn.btn-info.action").hide(); // Hide SharePoint "New Folder" button
    
    
    // Change fields based on Appointment Type
    var defaultTNCLabel = $("#mphhi_agreetotelemedconditions_label").html();    // Get default label for terms and conditions checkbox
    var appointmentType = $("#mphhi_appointmenttype").val();
  
    // Clear agreement checkbox
    $("#mphhi_agreetotelemedconditions").prop("checked", false);
    $("#mphhi_agreetotelemedconditions").change();

    switch (appointmentType) {
        case "205220000":       // E-Consultation
            // Show agreement checkbox
            $("#mphhi_agreetotelemedconditions").closest("td").show();
            $("#mphhi_agreetotelemedconditions_label").html("I agree with the provisions on the <a href='/consent-to-telemedicine' target='_blank'>Consent to Telemedicine Conditions</a>.");
            break;
        case "205220001":       // Face-to-Face Consultation
            // Show agreement checkbox
            $("#mphhi_agreetotelemedconditions").closest("td").show();
            $("#mphhi_agreetotelemedconditions_label").html("I agree with the conditions on the <a href='/privacy-notice' target='_blank'>Telemed Data Privacy Notice</a>.");
            break;
        case "205220002":       // Outpatient Service
            // Show agreement checkbox
            $("#mphhi_agreetotelemedconditions").closest("td").show();
            $("#mphhi_agreetotelemedconditions_label").html("I agree with the provisions on the <a href='/consent-for-procedure' target='_blank'>Consent for Procedure</a>.");
            break;
        default:
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
                $("#NextButton").prop("disabled", false);
            }
            else {
                $("#NextButton").prop("disabled", true);
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
        if ($("#mphhi_paymentoption").val() == "205220000"   // Payment Option is Self-Pay
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
    $("a[href='#Files']").on("click", function () { scrollToAndFocus('Files','Files'); } );
    

    // gumagana to pero sa step 1 lang AHHAHAHA
      // Negate submission if medicine subgrid does not contain data
      if (typeof (Page_Validators) == 'undefined') return;
      // Validator definition
      // Require at least one educational background
      var medicationValidator = document.createElement('span');
      medicationValidator.style.display = "none";
      medicationValidator.id = "MedicationValidator";          
      medicationValidator.errormessage = "At least one Medication entry is required.";            
      medicationValidator.evaluationfunction = function () {
          var rowCount = 0;
          rowCount = $("#medicine_subgrid table tbody tr").length;
          if (rowCount <=0) {
              return false;
          }
          else {
              return true;
          }
      };            
      
      Page_Validators.push(medicationValidator);

          // Medication validator {oTHER KIND OF VALIDATOR}
    var MedicationValidator = document.createElement('span');
    MedicationValidator.style.display = "none";
    MedicationValidator.id = "MedicationValidator";
    MedicationValidator.controltovalidate = "mphhi_paymentoption";
    MedicationValidator.errormessage = "<a href='#mphhi_paymentoption_label'>At least one Medication entry is required.</a>";
    MedicationValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    MedicationValidator.initialvalue = "";
    MedicationValidator.evaluationfunction = function () {
      if ($("#medicine_subgrid tbody").children().length) {
          return true;
      }
      else {
          return false;
      }
    };
    // Add the new validator to the page validators array:
    Page_Validators.push(MedicationValidator);
    // Wire-up the click event handler of the validation summary link
    $("a[href='#medicine_subgrid']").on("click", function () { scrollToAndFocus('mphhi_paymentoption_label','mphhi_paymentoption'); });
});