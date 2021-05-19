$(document).ready(function () {
    // INITIALIZE FORM
    $("#msemr_actorpatient").closest("td").hide();      // Hide Patient field

    $("td.lookup div.input-group").width("100%");   // Expand all lookup fields

    $("[data-name='hidden']").closest("fieldset").hide();  // Hide dev section
    
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

    // Reposition From Previous appointment radio button
    $("label[for='mphhi_frompreviousappointment_1']").insertBefore($("#mphhi_frompreviousappointment_0"));
    $("#mphhi_frompreviousappointment_1").insertBefore("label[for='mphhi_frompreviousappointment_1']");

    // Adjust Quick View form colspan
    $("#PreviousAppointmentQV").closest("td").attr("colspan","2");
    
    // Adjust lookup colspan
    $("#mphhi_previousappointment").closest("td").attr("colspan","2");
    $("#mphhi_department").closest("td").attr("colspan","2");
    $("#mphhi_preferreddoctor").closest("td").attr("colspan","2");
    $("#mphhi_diagnosticcenter").closest("td").attr("colspan","2");
    $("#mphhi_outpatientservice").closest("td").attr("colspan","2");
    // Mark lookups as required
    $("#mphhi_department").closest(".control").prev(".info").addClass("required");
    $("#mphhi_preferreddoctor").closest(".control").prev(".info").addClass("required");
    $("#mphhi_diagnosticcenter").closest(".control").prev(".info").addClass("required");
    $("#mphhi_outpatientservice").closest(".control").prev(".info").addClass("required");
    $("#mphhi_paymentmethod").closest(".control").prev(".info").addClass("required");
    $("#mphhi_paymentoption").closest(".control").prev(".info").addClass("required");

    // Relabel "Do you have LOA?" options
    $("label[for='mphhi_withloa_0']").html('<span class="sr-only">Do you have an LOA? </span>No');
    $("label[for='mphhi_withloa_1']").html('<span class="sr-only">Do you have an LOA? </span>Yes, I have a copy');

    $("label[for='mphhi_withloa_1']").insertBefore($("#mphhi_withloa_0"));
    $("#mphhi_withloa_1").insertBefore("label[for='mphhi_withloa_1']");

    // Get the query string from the URL
    var queryString = window.location.search;
    queryString = queryString.substring(1);

    // Parse the query string and assign parameters to "params" object
    var queries = queryString.split("&");
    var params = {};
    var query;
    for (var i = 0; i < queries.length; ++i) {
        query = queries[i].split("=");
        params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
    }
    if (!params['id']) {
        window.location.replace("/book-now");
    }

    // OData query for timeslot dates
    var dates = [];
    var currentDatesURL = "~/_odata/TimeslotDates";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        url: currentDatesURL,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        async: false,
        success: function(data, textStatus, xhr) {
            dates = dates.concat(data.value);
            currentProgramURL = data["odata.nextLink"];
        }
    });


    // BIND CHANGE FUNCTIONS

    // Change fields based on Appointment Type
    var defaultTNCLabel = $("#mphhi_agreetotelemedconditions_label").html();    // Get default label for terms and conditions checkbox
    $("#mphhi_appointmenttype").change(
        function() {
            var appointmentType = $("#mphhi_appointmenttype").val();

            // Clear agreement checkbox
            $("#mphhi_agreetotelemedconditions").prop("checked", false);
            $("#mphhi_agreetotelemedconditions").change();
            
            switch (appointmentType) {
                case "205220000":       // E-Consultation
                    // Show payment
                    $(".section[data-name='payment']").closest("fieldset").show();
                    // Show Doctor's Specialization and Preferred Doctor
                    $("#mphhi_department").closest("td").show();
                    $("#mphhi_preferreddoctor").closest("td").show();
                    // Hide and clear Diagnostic Center, Outpatient Service, and Referral
                    $("#mphhi_diagnosticcenter").closest("td").hide();
                    $("#mphhi_diagnosticcenter").val("");
                    $("#mphhi_diagnosticcenter").change();
                    $("#mphhi_outpatientservice").closest("td").hide();
                    $("#mphhi_outpatientservice").val("");
                    $("#mphhi_outpatientservice").change();
                    $("#mphhi_referral").closest("tr").hide();
                    $("#mphhi_referral").val("");
                    // Show agreement checkbox
                    $("#mphhi_agreetotelemedconditions").closest("td").show();
                    $("#mphhi_agreetotelemedconditions_label").html("I agree with the provisions on the <a href='/consent-to-telemedicine' target='_blank'>Consent to Telemedicine Conditions</a>.");
                    break;
                case "205220001":       // Face-to-Face Consultation
                    // Hide payment
                    $(".section[data-name='payment']").closest("fieldset").hide();
                    $("#mphhi_department").closest("td").show();
                    $("#mphhi_preferreddoctor").closest("td").show();
                    $("#mphhi_diagnosticcenter").closest("td").hide();
                    $("#mphhi_diagnosticcenter").val("");
                    $("#mphhi_diagnosticcenter").change();
                    $("#mphhi_outpatientservice").closest("td").hide();
                    $("#mphhi_outpatientservice").val("");
                    $("#mphhi_outpatientservice").change();
                    $("#mphhi_referral").closest("tr").hide();
                    // Show agreement checkbox
                    $("#mphhi_agreetotelemedconditions").closest("td").show();
                    $("#mphhi_agreetotelemedconditions_label").html("I agree with the conditions on the <a href='/privacy-notice' target='_blank'>Telemed Data Privacy Notice</a>.");
                    break;
                case "205220002":       // Outpatient Service
                    // Hide payment
                    $(".section[data-name='payment']").closest("fieldset").hide();
                    $("#mphhi_department").closest("td").hide();
                    $("#mphhi_department").val("");
                    $("#mphhi_department").change();
                    $("#mphhi_preferreddoctor").closest("td").hide();
                    $("#mphhi_preferreddoctor").val("");
                    $("#mphhi_preferreddoctor").change();
                    $("#mphhi_diagnosticcenter").closest("td").show();
                    $("#mphhi_outpatientservice").closest("td").show();
                    $("#mphhi_referral").closest("tr").show();
                    // Show agreement checkbox
                    $("#mphhi_agreetotelemedconditions").closest("td").show();
                    $("#mphhi_agreetotelemedconditions_label").html("I agree with the provisions on the <a href='/consent-for-procedure' target='_blank'>Consent for Procedure</a>.");
                    break;
                default:
                    // Hide payment
                    $(".section[data-name='payment']").closest("fieldset").hide();
                    $("#mphhi_department").closest("td").hide();
                    $("#mphhi_preferreddoctor").closest("td").hide();
                    $("#mphhi_diagnosticcenter").closest("td").hide();
                    // Hide agreement checkbox
                    $("#mphhi_agreetotelemedconditions").closest("td").hide();
                    $("#mphhi_outpatientservice").closest("td").hide(defaultTNCLabel);
                    break;
            }
            // Clear Preferred Hospital
            $("msemr_actorlocation").val("");
            $("msemr_actorlocation_name").val("");
            $("msemr_actorlocation_entityname").val("");
            // Execute Preferred Hospital on-change function
            // Related fields will clear as part of this function
            $("#msemr_actorlocation").change();
        }
    );
    $("#mphhi_appointmenttype").change();

    // Clear fields when Preferred Hospital is cleared
    $("#msemr_actorlocation").change(
        function() {
            // Clear Doctor's Specialization (Department)
            $("#mphhi_department").val("");
            $("#mphhi_department_name").val("");
            $("#mphhi_department_entityname").val("");
            // Execute Doctor's Specialization on-change function
            $("#mphhi_department").change();
            // Clear Diagnostic Center
            $("#mphhi_diagnosticcenter").val("");
            $("#mphhi_diagnosticcenter_name").val("");
            $("#mphhi_diagnosticcenter_entityname").val("");
            // Execute Diagnostic Center on-change function
            $("#mphhi_diagnosticcenter").change();
        }
    );
    $("#msemr_actorlocation").change();

    // Clear Preferred Doctor when Doctor's Specialization (Department) is cleared
    $("#mphhi_department").change(
        function() {
            // Clear Preferred Doctor
            $("#mphhi_preferreddoctor").val("");
            $("#mphhi_preferreddoctor_name").val("");
            $("#mphhi_preferreddoctor_entityname").val("");
        }
    );
    $("#mphhi_department").change();

    // Clear Outpatient Service when Diagnostic Center is cleared
    $("#mphhi_diagnosticcenter").change(
        function() {
            // Clear Outpatient Service
            $("#mphhi_outpatientservice").val("");
            $("#mphhi_outpatientservice_name").val("");
            $("#mphhi_outpatientservice_entityname").val("");
        }
    );
    $("#mphhi_diagnosticcenter").change();

    // Populated Timeslot Date lookup based on Preferred Date
    // GET ODATA RESULT BEFORE EXECUTING
    $("#mphhi_preferreddate").closest("div.control").on("dp.change", 
        function() {
            var preferredDate = $("#mphhi_preferreddate").val().split("T")[0];
            var selectedDate = {};
            selectedDate = dates.find(
                function(dateObject) {
                    /*
                    if (dateObject.mphhi_date) {
                        return dateObject.mphhi_date.match("^" + preferredDate);
                    }
                    */
                    return (dateObject.mphhi_date.match("^" + preferredDate) && dateObject.mphhi_doctor.Id == $("#mphhi_preferreddoctor").val());
                }
            );
            if (selectedDate) {
                $("#mphhi_timeslotdate").val(selectedDate.mphhi_timeslotdateid).change();
            }
            else {
                $("#mphhi_timeslotdate").val("").change();
            }
        }
    );
    $("#mphhi_preferreddate").closest("div.control").trigger("dp.change");


    // Hide/Show Payment Method based on Payment Option
    $("#mphhi_paymentoption").change(
        function() {
            if ($("#mphhi_paymentoption").val() == "205220000") {
                $("#mphhi_paymentmethod").closest("tr").show();     // Hide/show the entire row
                $("#mphhi_withloa").closest("tr").show();
            }
            else {
                $("#mphhi_paymentmethod").closest("tr").hide();
                $("#mphhi_withloa").closest("tr").hide();
            }
        }
    );
    $("#mphhi_paymentoption").change();

    // Enable/disable Submit button based on whether agreement has been accepted
    $("#mphhi_agreetotelemedconditions").change(
        function() {
            if ($("#mphhi_agreetotelemedconditions").prop("checked")) {
                $("#UpdateButton").prop("disabled", false);
            }
            else {
                $("#UpdateButton").prop("disabled", true);
            }
        }
    );
    $("#mphhi_agreetotelemedconditions").change();



    // DEFINE VALIDATORS

    // Doctor's Specialization (Department) validator
    var timeslotValidator = document.createElement('span');
    timeslotValidator.style.display = "none";
    timeslotValidator.id = "timeslotValidator";
    timeslotValidator.controltovalidate = "mphhi_timeslot";
    timeslotValidator.errormessage = "<a href='#mphhi_timeslot_label'>Timeslot is a required field.</a>";
    timeslotValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    timeslotValidator.initialvalue = "";
    timeslotValidator.evaluationfunction = function () {
        if (!$("#mphhi_timeslot").val()) {
            return false;
        }
        else {
            return true;
        }
    };
    // Add the new validator to the page validators array:
    Page_Validators.push(timeslotValidator);
    // Wire-up the click event handler of the validation summary link
    $("a[href='#mphhi_timeslot_label']").on("click", function () { scrollToAndFocus('mphhi_timeslot_label','mphhi_timeslot'); });


    // Doctor's Specialization (Department) validator
    var departmentValidator = document.createElement('span');
    departmentValidator.style.display = "none";
    departmentValidator.id = "departmentValidator";
    departmentValidator.controltovalidate = "mphhi_department";
    departmentValidator.errormessage = "<a href='#mphhi_department_label'>Doctor's Specialization is a required field.</a>";
    departmentValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    departmentValidator.initialvalue = "";
    departmentValidator.evaluationfunction = function () {
        if (($("#mphhi_appointmenttype").val() == "205220000" || $("#mphhi_appointmenttype").val() == "205220001")   // Appointment Type is E-Consultation or Face-to-Face
            && !($("#mphhi_department").val())) {
            return false;
        }
        else {
            return true;
        }
    };
    // Add the new validator to the page validators array:
    Page_Validators.push(departmentValidator);
    // Wire-up the click event handler of the validation summary link
    $("a[href='#mphhi_department_label']").on("click", function () { scrollToAndFocus('mphhi_department_label','mphhi_department'); });
    

    // Preferred Doctor validator
    var preferredDoctorValidator = document.createElement('span');
    preferredDoctorValidator.style.display = "none";
    preferredDoctorValidator.id = "preferredDoctorValidator";
    preferredDoctorValidator.controltovalidate = "mphhi_preferreddoctor";
    preferredDoctorValidator.errormessage = "<a href='#mphhi_preferreddoctor_label'>Preferred Doctor is a required field.</a>";
    preferredDoctorValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    preferredDoctorValidator.initialvalue = "";
    preferredDoctorValidator.evaluationfunction = function () {
        if (($("#mphhi_appointmenttype").val() == "205220000" || $("#mphhi_appointmenttype").val() == "205220001")   // Appointment Type is E-Consultation or Face-to-Face
            && !$("#mphhi_preferreddoctor").val()) {
            return false;
        }
        else {
            return true;
        }
    };
    // Add the new validator to the page validators array:
    Page_Validators.push(preferredDoctorValidator);
    // Wire-up the click event handler of the validation summary link
    $("a[href='#mphhi_preferreddoctor_label']").on("click", function () { scrollToAndFocus('mphhi_preferreddoctor_label','mphhi_preferreddoctor'); });
    
    
    // Diagnostic Center validator
    var diagnosticCenterValidator = document.createElement('span');
    diagnosticCenterValidator.style.display = "none";
    diagnosticCenterValidator.id = "diagnosticCenterValidator";
    diagnosticCenterValidator.controltovalidate = "mphhi_diagnosticcenter";
    diagnosticCenterValidator.errormessage = "<a href='#mphhi_diagnosticcenter_label'>Diagnostic Center is a required field.</a>";
    diagnosticCenterValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    diagnosticCenterValidator.initialvalue = "";
    diagnosticCenterValidator.evaluationfunction = function () {
        if ($("#mphhi_appointmenttype").val() == "205220002"   // Appointment Type is Outpatient Service
            && !$("#mphhi_diagnosticcenter").val()) {
            return false;
        }
        else {
            return true;
        }
    };
    // Add the new validator to the page validators array:
    Page_Validators.push(diagnosticCenterValidator);
    // Wire-up the click event handler of the validation summary link
    $("a[href='#mphhi_diagnosticcenter_label']").on("click", function () { scrollToAndFocus('mphhi_diagnosticcenter_label','mphhi_diagnosticcenter'); });
    
    
    // Outpatient Service validator
    var outpatientServiceValidator = document.createElement('span');
    outpatientServiceValidator.style.display = "none";
    outpatientServiceValidator.id = "outpatientServiceValidator";
    outpatientServiceValidator.controltovalidate = "mphhi_outpatientservice";
    outpatientServiceValidator.errormessage = "<a href='#mphhi_outpatientservice_label'>Outpatient Service is a required field.</a>";
    outpatientServiceValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    outpatientServiceValidator.initialvalue = "";
    outpatientServiceValidator.evaluationfunction = function () {
        if ($("#mphhi_appointmenttype").val() == "205220002"   // Appointment Type is Outpatient Service
            && !$("#mphhi_outpatientservice").val()) {
            return false;
        }
        else {
            return true;
        }
    };
    // Add the new validator to the page validators array:
    Page_Validators.push(outpatientServiceValidator);
    // Wire-up the click event handler of the validation summary link
    $("a[href='#mphhi_outpatientservice_label']").on("click", function () { scrollToAndFocus('mphhi_outpatientservice_label','mphhi_outpatientservice'); });
    
    
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
    
});