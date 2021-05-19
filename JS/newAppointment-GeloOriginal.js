$(document).ready(function () {
    // INITIALIZE FORM
    $("td.lookup div.input-group").width("100%");   // Expand all lookup fields

    $("[data-name='hidden']").closest("fieldset").hide();  // Hide dev section
    
    // Adjust lookup colspan
    $("#mphhi_department").closest("td").attr("colspan","2");
    $("#mphhi_preferreddoctor").closest("td").attr("colspan","2");
    $("#mphhi_diagnosticcenter").closest("td").attr("colspan","2");
    $("#mphhi_outpatientservice").closest("td").attr("colspan","2");
    // Mark lookups as required
    $("#mphhi_department").closest(".control").prev(".info").addClass("required");
    $("#mphhi_preferreddoctor").closest(".control").prev(".info").addClass("required");
    $("#mphhi_diagnosticcenter").closest(".control").prev(".info").addClass("required");
    $("#mphhi_outpatientservice").closest(".control").prev(".info").addClass("required");

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
    if (!params['dependentid']) {
        $("#msemr_actorpatient").closest("td").hide();      // Hide Patient field if no dependent GUID is supplied
    }

    // OData query for timeslot dates
    var dates = [];
    var currentDatesURL = "/_odata/TimeslotDates";
    while(currentDatesURL) {
        $.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            url: currentDatesURL,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            success: function(data, textStatus, XHR) {
                dates = dates.concat(data.value);
                currentDatesURL = data["odata.nextLink"];
            }
        });
    }
    

    // BIND CHANGE FUNCTIONS

    // Change fields based on Appointment Type
    $("#mphhi_appointmenttype").change(
        function() {
            var appointmentType = $("#mphhi_appointmenttype").val();
            
            switch (appointmentType) {
                case "205220000":       // E-Consultation
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
                    break;
                case "205220001":       // Face-to-Face Consultation
                    $("#mphhi_department").closest("td").show();
                    $("#mphhi_preferreddoctor").closest("td").show();
                    $("#mphhi_diagnosticcenter").closest("td").hide();
                    $("#mphhi_diagnosticcenter").val("");
                    $("#mphhi_diagnosticcenter").change();
                    $("#mphhi_outpatientservice").closest("td").hide();
                    $("#mphhi_outpatientservice").val("");
                    $("#mphhi_outpatientservice").change();
                    $("#mphhi_referral").closest("tr").hide();
                    $("#mphhi_referral").val("");
                    break;
                case "205220002":       // Outpatient Service
                    $("#mphhi_department").closest("td").hide();
                    $("#mphhi_department").val("");
                    $("#mphhi_department").change();
                    $("#mphhi_preferreddoctor").closest("td").hide();
                    $("#mphhi_preferreddoctor").val("");
                    $("#mphhi_preferreddoctor").change();
                    $("#mphhi_diagnosticcenter").closest("td").show();
                    $("#mphhi_outpatientservice").closest("td").show();
                    $("#mphhi_referral").closest("tr").show();
                    break;
                default:
                    $("#mphhi_department").closest("td").hide();
                    $("#mphhi_department").val("");
                    $("#mphhi_department").change();
                    $("#mphhi_preferreddoctor").closest("td").hide();
                    $("#mphhi_preferreddoctor").val("");
                    $("#mphhi_preferreddoctor").change();
                    $("#mphhi_preferreddoctor").closest("td").show();
                    $("#mphhi_diagnosticcenter").closest("td").hide();
                    $("#mphhi_diagnosticcenter").val("");
                    $("#mphhi_diagnosticcenter").change();
                    $("#mphhi_outpatientservice").closest("td").hide();
                    $("#mphhi_outpatientservice").val("");
                    $("#mphhi_outpatientservice").change();
                    $("#mphhi_referral").closest("tr").hide();
                    $("#mphhi_referral").val("");
                    break;
            }
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


    // DEFINE VALIDATORS

    // Timeslot validator
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
    
});