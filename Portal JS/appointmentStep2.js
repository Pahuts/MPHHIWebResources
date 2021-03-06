$(document).ready(function () {

    // ****************************************************************
    // Store input elements as variables
    // ****************************************************************

    var appointmentType = $("#mphhi_appointmenttype");
    var consultationSection = $("[data-name='consultation']").closest("fieldset").show();
    var outpatientSection = $("[data-name='outpatient']").closest("fieldset");

    // Level 1 Consultation/Outpatient
    var hospital = $("#msemr_actorlocation");

    // CONSULTATION FIELDS
    // Level 1
    var preferredDoctor = $("#mphhi_doctor");
    var specialization = $("#mphhi_specialization");

    // Under Hospital
    // Level 2
    var preferredDoctor_H = $("#mphhi_preferreddoctorunderhospital");
    var specialization_H = $("#mphhi_specializationunderhospital");
    // Level 3
    var specialization_PD_H = $("#mphhi_specializationunderdunderh");
    var preferredDoctor_S_H = $("#mphhi_preferreddoctorundersunderh");

    // Under Preferred Doctor
    // Level 2
    var hospital_PD = $("#mphhi_hospitalunderdoctor");
    // Level 3
    var specialization_H_PD = $("#mphhi_specializationunderhunderd");

    // Under Specialization
    // Level 2
    var hospital_S = $("#mphhi_hospitalunderspecialization");
    var preferredDoctor_S = $("#mphhi_preferreddoctorunderspecialization");
    // Level 3
    var preferredDoctor_H_S = $("#mphhi_preferreddoctorunderhunders");
    var hospital_PD_S = $("#mphhi_hospitalunderpdunders");


    // OUTPATIENT FIELDS
    // Level 1
    var outpatientService = $("#mphhi_outpatientservice");
    var diagnosticCenter = $("#mphhi_diagnosticcenter");

    // Under Hospital
    // Level 2
    var outpatientService_H = $("#mphhi_outpatientserviceunderhospital");
    var diagnosticCenter_H = $("#mphhi_diagnosticcenterunderhospital");
    // Level 3
    var diagnosticCenter_OS_H = $("#mphhi_diagnosticcenterunderosunderh");
    var outpatientService_DC_H = $("#mphhi_outpatientserviceunderdcunderh");

    // Under Outpatient Service
    // Level 2
    var hospital_OS = $("#mphhi_hospitalunderoutpatientservice");
    var diagnosticCenter_OS = $("#mphhi_diagnosticcenterunderoutpatientservice");
    // Level 3
    var diagnosticCenter_H_OS = $("#mphhi_diagnosticcenterunderhunderos");
    var hospital_DC_OS = $("#mphhi_hospitalunderdcunderos");

    // Under Diagnostic Center
    // Level 2
    var hospital_DC = $("#mphhi_hospitalunderdiagnosticcenter");
    var outpatientService_DC = $("#mphhi_outpatientserviceunderdiagnosticcenter");
    // Level 3
    var outpatientService_H_DC = $("#mphhi_outpatientserviceunderhunderdc");
    var hospital_OS_DC = $("#mphhi_hospitalunderosunderdc");


    // SCHEDULING FIELDS
    // Preferred Date, Timeslot, and Outpatient Start and End Times
    var preferredDate = $("#mphhi_preferreddate");
    var timeslotDate = $("#mphhi_timeslotdate");
    var timeslot = $("#mphhi_timeslot");
    var outpatientTime = $("#mphhi_outpatientstarttime");
    // var eConsultationTimeslot = $("#mphhi_econsultationtimeslot");
    // var faceToFaceTimeslot = $("#mphhi_facetofacetimeslot");
    // var timeslotToShow = eConsultationTimeslot;     // Tracks which Timeslot field is affected by hide/show logic

    // REFERENCE DATES
    /*
    var today = $("#mphhi_today");
    var yesterday = $("#mphhi_yesterday");
    var maxAppointmentLead = $("#mphhi_maxappointmentlead");
    */

    // Create array with all dates up to max lead date; for use in blacklisting dates
    var possibleDates = [];
    // var yesterdayDateArray = yesterday.val().split("T")[0].split("-");      // Need to split components to strip time when converting to Date object
    // var maxAppointmentLeadArray = maxAppointmentLead.val().split("T")[0].split("-");

    // Workaround for calculated fields:
    var currentDate = new Date();
    var today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    var yesterday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
    var maxAppointmentLead = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, currentDate.getDate());
    var yesterdayDateArray = yesterday.toISOString().split("T")[0].split("-");      // Need to split components to strip time when converting to Date object
    var maxAppointmentLeadArray = maxAppointmentLead.toISOString().split("T")[0].split("-");

    var currentIterationDate = new Date(yesterdayDateArray[0], yesterdayDateArray[1] - 1, yesterdayDateArray[2]);       // Initialize to yesterday
    var maxAppointmentLeadDate = new Date(maxAppointmentLeadArray[0], maxAppointmentLeadArray[1] - 1, maxAppointmentLeadArray[2]);
    while (currentIterationDate <= maxAppointmentLeadDate) {
        currentIterationDate.setDate(currentIterationDate.getDate() + 1);
        possibleDates = possibleDates.concat(currentIterationDate.getMonth + 1, );
    }



    // ****************************************************************
    // Shorthand functions for field layout
    // ****************************************************************

    function showField(field) {
        field.closest("td").show();
    }

    function clearField(field) {
        // If lookup, clear name and hide X button
        if (field.closest("td").hasClass("lookup")) {
            $("#" + field.attr("id") + "_name").val("").change();
            field.siblings(".input-group-btn").find(".clearlookupfield").hide()
        }
        field.val("").change();
    }

    function hideField(field) {
        field.closest("td").hide();
    }

    function moveAfter(field1, field2) {    // Field 1 AFTER Field 2
        field1.closest("td").insertAfter(field2.closest("td"));
    }


    // ****************************************************************
    // Copy functions: copy lower level field values to top level fields
    // ****************************************************************
    // Do NOT trigger change event for level 1 fields when copying field values
    // This will clear all non-level 1 fields

    function copyToHospital(sourceField) {
        $("#" + hospital.attr("id") + "_entityname").val("msemr_location");
        // $("#" + hospital.attr("id") + "_name").val($("#" + sourceField.attr("id") + "_name").val());
        hospital.val(sourceField.val());
        showPreferredDateAndTimeslot();
        showOutpatientTime();
    }
    function copyToPreferredDoctor(sourceField) {
        $("#" + preferredDoctor.attr("id") + "_entityname").val("mphhi_associatedhospital");
        // $("#" + preferredDoctor.attr("id") + "_name").val($("#" + sourceField.attr("id") + "_name").val());
        preferredDoctor.val(sourceField.val());
        showPreferredDateAndTimeslot();
    }
    /*
    function copyToDepartment(sourceField) {
        $("#" + department.attr("id") + "_entityname").val("mphhi_department");
        // $("#" + department.attr("id") + "_name").val($("#" + sourceField.attr("id") + "_name").val());
        department.val(sourceField.val());
        showPreferredDateAndTimeslot();
    }
    */
    function copyToOutpatientService(sourceField) {
        $("#" + outpatientService.attr("id") + "_entityname").val("mphhi_outpatientservice");
        // $("#" + outpatientService.attr("id") + "_name").val($("#" + sourceField.attr("id") + "_name").val());
        outpatientService.val(sourceField.val());
        showOutpatientTime();
    }
    function copyToDiagnosticCenter(sourceField) {
        $("#" + diagnosticCenter.attr("id") + "_entityname").val("mphhi_diagnosticcenter");
        // $("#" + diagnosticCenter.attr("id") + "_name").val($("#" + sourceField.attr("id") + "_name").val());
        diagnosticCenter.val(sourceField.val());
        showOutpatientTime();
    }


    // ****************************************************************
    // Query for valid Timeslot Dates
    // ****************************************************************

    function queryAvailableTimeslotDates(currentPreferredDoctor, currentAppointmentType) {
        var timeslotDates = [];

        if (currentPreferredDoctor && currentAppointmentType) {
            // Set Timeslot Type based on Appointment Type
            var timeslotType;
            switch (currentAppointmentType) {
                case "205220000":       // E-Consultation
                    timeslotType = "205220000";     // Can technically be assigned as appointmentType.val(), but mapping values directly provides better futureproofing
                case "205220001":       // Face-to-Face
                    timeslotType = "205220001";
                    break;
                default:
                    console.error("Cannot determine timeslot type.")
                    timeslotType = "";
                    break;
            }
    
            // Construct query filter
            // var yesterdayString = yesterday.val().split("T")[0];
            var yesterdayString = yesterday.toISOString().split("T")[0];
            // var maxAppointmentLeadString = maxAppointmentLead.val().split("T")[0];
            var maxAppointmentLeadString = maxAppointmentLead.toISOString().split("T")[0];
            var currentDatesURL = "/_odata/TimeslotDates?$filter="
                + "mphhi_date gt (datetime'" + yesterdayString + "') and "
                + "mphhi_date lt (datetime'"+ maxAppointmentLeadString + "') and "
                + "mphhi_doctor/Id eq guid'" + currentPreferredDoctor + "' and "
                + "mphhi_timeslottype/Value eq " + timeslotType;
    
            var continueODataLoop = true;   // Variable for exiting while loop
            var startTime = new Date().getTime();   // For benchmarking
            while(continueODataLoop) {
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
                        timeslotDates = timeslotDates.concat(data.value);
                        currentDatesURL = data["odata.nextLink"];
                    },
                    error: function() {
                        continueODataLoop = false;
                    }
                });
                if (!currentDatesURL) {
                    continueODataLoop = false;
                }
            }
            var totalQueryTime = new Date().getTime() - startTime;
            console.log("Date query finished in " + totalQueryTime + "ms");
        }
        console.log(timeslotDates);
        // Return output
        return timeslotDates;
    }

    function queryAssociatedHospital(currentPreferredDoctor) {
        var queriedDoctor = [];

        if (currentPreferredDoctor) {
            var specializationURL = "/_odata/AssociatedHospitals?$filter="
                + "mphhi_associatedhospitalid/Id eq guid'" + currentPreferredDoctor;
    
            var startTime = new Date().getTime();   // For benchmarking
            $.ajax({
                type: "GET",
                dataType: "json",
                async: false,
                contentType: "application/json; charset=utf-8",
                url: specializationURL,
                beforeSend: function(XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Accept", "application/json");
                },
                success: function(data, textStatus, XHR) {
                    queriedDoctor = data.value;
                },
                error: function() {
                }
            });
            var totalQueryTime = new Date().getTime() - startTime;
            console.log("Associated Hospital query finished in " + totalQueryTime + "ms");
        }
        // Return output
        return queriedDoctor;
    }

    // ****************************************************************
    // Show Preferred Date only if all Level 1 fields are filled
    // ****************************************************************

    var availableTimeslotDates = [];    // Declare outside for use outside
    function showPreferredDateAndTimeslot() {
        preferredDate.val("");      // Clear actual date input
        $("#" + preferredDate.attr("id") + "_datepicker_description").val("");    // Clear date picker text
        // preferredDate.closest("div.control").trigger("dp.change");      // Trigger date picker on-change function
        clearField(timeslot);

        if (preferredDoctor.val()) {
            showField(preferredDate);
            showField(timeslot);
            // Query for available dates
            availableTimeslotDates = queryAvailableTimeslotDates(preferredDoctor.val(), appointmentType.val());
            console.log(availableTimeslotDates);
            // Create new array containing only dates
            var availableDates = [];
            var currentDateString;
            for (timeslotDate of availableTimeslotDates) {
                currentDateString = timeslotDate.mphhi_date;
                console.log(currentDateString);
                //availableDates = availableDates.push(currentDateString.toISOString().split("T")[0]);
            }
            console.log(availableDates);
            // Create blacklisted dates array
            var blacklistedDates = possibleDates.filter(e => !availableDates.includes(e));
            console.log(blacklistedDates);
            var dateArray = [];
            for (date of blacklistedDates) {
                dateArray = date.split("-");
                date = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
            }
            console.log(blacklistedDates);
            // Apply disabled dates
            preferredDate.siblings(".datetimepicker").data("DateTimePicker").disabledDates(blacklistedDates);
        }
        else {
            hideField(preferredDate);
            hideField(timeslot);
        }
    }

    function showOutpatientTime() {
        clearField(outpatientTime);

        if (hospital.val() && diagnosticCenter.val() && outpatientService.val()) {
            showField(outpatientTime);
        }
        else {
            hideField(outpatientTime);
        }
    }


    // ****************************************************************
    // Bind change function for Preferred Date
    // ****************************************************************

    preferredDate.closest("div.control").on("dp.change", 
        function() {
            // Clear Timeslot
            timeslot.val("");
            $("#" + timeslot.attr("id") + "_name").val("");
            // Disable Timeslot
            timeslot.parent().find('.input-group-btn').hide(); 
            // Clear placeholder
            $("#" + timeslot.attr("id") + "_name").prop("placeholder", "");

            if (preferredDate.val() && availableTimeslotDates.length > 0) {     // availableTimeslotDates should already be populated by the time Preferred Date is visible; this is just a failsafe
                // Search for corresponding date
                var currentSelectedDate = preferredDate.val().split("T")[0].split;
                var currentTimeslotDate = availableTimeslotDates.find(date => date.mphhi_date.startsWith(currentSelectedDate));
    
                // Populate Timeslot Date and show Timeslot only if Timeslot Date is found
                if (currentTimeslotDate) {
                    timeslotDate.val(currentSelectedDate.mphhi_timeslotdateid);      // Get first returned value only
                    timeslot.closest(".input-group").find('.input-group-btn').show();
                }
                else {
                    timeslotDate.val("");
                    $("#" + timeslot.attr("id") + "_name").prop("placeholder", "No timeslots available");
                    timeslot.closest(".input-group").find('.input-group-btn').hide();
                }
            }
        }
    );
    preferredDate.closest("div.control").trigger("dp.change");


    // ****************************************************************
    // Appointment Type on-change function
    // ****************************************************************

    appointmentType.change(
        function() {
            // Clear hospital
            clearField(hospital);
            $("#" + hospital.attr("id") + "_name").val("");
            // Clear consultation booking fields
            clearField(preferredDoctor);
            $("#" + preferredDoctor.attr("id") + "_name").val("");
            clearField(preferredDate);
            clearField(timeslot);
            // Clear outpatient booking fields
            clearField(diagnosticCenter);
            $("#" + diagnosticCenter.attr("id") + "_name").val("");
            clearField(outpatientService);
            $("#" + outpatientService.attr("id") + "_name").val("");
            clearField(outpatientTime);

            switch (appointmentType.val()) {
                case "205220000":
                case "205220001":
                    $("#msemr_actorlocation").closest("tr").insertBefore($("#mphhi_specialization").closest("tr"));
                    consultationSection.show();
                    outpatientSection.hide();
                    break;
                case "205220002":
                case "205220003":
                    $("#msemr_actorlocation").closest("tr").insertBefore($("#mphhi_diagnosticcenter").closest("tr"));
                    consultationSection.hide();
                    outpatientSection.show();
                    break;
                default:
                    consultationSection.hide();
                    outpatientSection.hide();
                    break;
            }
        }
    );

    // ****************************************************************
    // General hide/show functions per level
    // On field change:
    // If fields are populated:
    //     - Hide fields on same level
    //     - Show fields on lower level
    //     - Clear fields on lower level
    // Otherwise, if fields are empty:
    //     - Clear fields under it
    //     - Hide fields under it - this must be done AFTER clearing to satisfy visiblity logic
    //     - Show fields on same level
    // Finally, copy field values to top-level fields (to be added when binding change function templates)
    // ****************************************************************

    function level1FieldChange(
        L1_Field_Primary,     // Level 1 field this function is bound to
        L1_Field_1,           // Other Level 1 field
        L1_Field_2,           // Other Level 1 field
        L2_Field_1,           // Level 2 field under primary L1 field
        L2_Field_2            // Level 2 field under primary L1 field
        ) {
        if (L1_Field_Primary.val()) {
            hideField(L1_Field_1);
            hideField(L1_Field_2);
            showField(L2_Field_1);
            clearField(L2_Field_1);
            showField(L2_Field_2);
            clearField(L2_Field_2);
        }
        else {
            clearField(L2_Field_1);
            clearField(L2_Field_2);
            hideField(L2_Field_1);
            hideField(L2_Field_2);
            showField(L1_Field_1);
            showField(L1_Field_2);
        }
    };

    function level2FieldChange(
        L2_Field_Primary,    // Level 2 field this function is bound to
        L2_Field,            // Other Level 2 field with the same parent
        L3_Field             // Level 3 field under priamry Level 2 field
    ) {
        if (L2_Field_Primary.val()) {
            hideField(L2_Field);
            showField(L3_Field);
            clearField(L3_Field);
        }
        else {
            clearField(L3_Field);
            hideField(L3_Field);
            showField(L2_Field);
        }
    }



    // ****************************************************************
    // Bind change functions for cascading fields
    // ****************************************************************

    // Hospital
    // Consultation
    hospital.change(function() {    
        level1FieldChange(hospital, specialization, preferredDoctor, specialization_H, preferredDoctor_H);
    });
    // Outpatient
    hospital.change(function() {
        level1FieldChange(hospital, diagnosticCenter, outpatientService, diagnosticCenter_H, outpatientService_H);
    });


    
    // CONSULTATION FIELDS
    // Level 1
    preferredDoctor.change(function() {     // Preferred Doctor Level 1 has only one path and needs a unique on-change function
        if (preferredDoctor.val()) {
            clearField(hospital_PD);
            clearField(specialization_H_PD);
            hideField(hospital);
            hideField(specialization);
            showField(hospital_PD);
						showField(specialization_H_PD);
        }
        else {
            clearField(hospital_PD);
            clearField(specialization_H_PD);
            hideField(hospital_PD);
            hideField(specialization_H_PD);
            showField(hospital);
            showField(specialization);
        }
    });
    specialization.change(function() {
        level1FieldChange(specialization, hospital, preferredDoctor, hospital_S, preferredDoctor_S);
    });


    // Under Hospital
    // Level 2
    preferredDoctor_H.change(function() {
        level2FieldChange(preferredDoctor_H, specialization_H, specialization_PD_H);
        copyToPreferredDoctor(preferredDoctor_H);
        var associatedHospitalQuery = queryAssociatedHospital(preferredDoctor_H.val());
        if (associatedHospitalQuery.length > 0) {
            specialization_PD_H.val(associatedHospitalQuery[0].mphhi_primaryspecialization.Name);       // Autopopulate Level 3 Specialization
        }
    });
    specialization_H.change(function() {
        level2FieldChange(specialization_H, preferredDoctor_H, preferredDoctor_S_H);
    });
    // Level 3
    preferredDoctor_S_H.change(function() {
        copyToPreferredDoctor(preferredDoctor_S_H);
    });
    // Specialization under PD under H is locked and auto-populated and needs no on-change function


    // Under Preferred Doctor
    // Level 2
    hospital_PD.change(function() {
        copyToPreferredDoctor(hospital_PD);
        var associatedHospitalQuery = queryAssociatedHospital(preferredDoctor_H.val());
        if (associatedHospitalQuery.length > 0) {
            specialization_H_PD.val(associatedHospitalQuery[0].mphhi_primaryspecialization.Name);       // Autopopulate Level 3 Specialization
        }
    });
    // No Level 2 field for Specialization under Preferred Doctor

    // Level 3
    // Specialization under H under PD is locked and auto-populated and needs no on-change function
    // No Level 3 field for Hospital under S under PD

    
    // Under Specialization
    // Level 2
    hospital_S.change(function() {
        level2FieldChange(hospital_S, preferredDoctor_S, preferredDoctor_H_S);
        copyToHospital(hospital_S);
    });
    preferredDoctor_S.change(function() {
        level2FieldChange(preferredDoctor_S, hospital_S, hospital_PD_S);
        copyToPreferredDoctor(preferredDoctor_S);
        var associatedHospitalQuery = queryAssociatedHospital(preferredDoctor_H.val());
        if (associatedHospitalQuery.length > 0) {
            hospital_PD_S.val(associatedHospitalQuery[0].mphhi_hospital.Name);       // Autopopulate Level 3 Specialization
        }
    });
    // Level 3
    // Hospital under PD under S is locked and auto-populated and needs no on-change function
    preferredDoctor_H_S.change(function() {
        copyToPreferredDoctor(preferredDoctor_H_S);
    });



    // OUTPATIENT FIELDS
    // Level 1
    outpatientService.change(function() {
        level1FieldChange(outpatientService, hospital, diagnosticCenter, hospital_OS, diagnosticCenter_OS);
    });
    diagnosticCenter.change(function() {
        level1FieldChange(diagnosticCenter, hospital, outpatientService, hospital_DC, outpatientService_DC);
    });

    // Under Hospital
    // Level 2
    outpatientService_H.change(function() {
        level2FieldChange(outpatientService_H, diagnosticCenter_H, diagnosticCenter_OS_H);
        copyToOutpatientService(outpatientService_H);
    });
    diagnosticCenter_H.change(function() {
        level2FieldChange(diagnosticCenter_H, outpatientService_H, outpatientService_DC_H);
        copyToDiagnosticCenter(diagnosticCenter_H);
    });
    // Level 3
    outpatientService_DC_H.change(function() {
        copyToOutpatientService(outpatientService_DC_H);
    });
    diagnosticCenter_OS_H.change(function() {
        copyToDiagnosticCenter(diagnosticCenter_OS_H);
    });

    // Under Outpatient Service
    // Level 2
    hospital_OS.change(function() {
        level2FieldChange(hospital_OS, diagnosticCenter_OS, diagnosticCenter_H_OS);
        copyToHospital(hospital_OS);
    });
    diagnosticCenter_OS.change(function() {
        level2FieldChange(diagnosticCenter_OS, hospital_OS, hospital_DC_OS);
        copyToDiagnosticCenter(diagnosticCenter_OS);
    });
    // Level 3
    hospital_DC_OS.change(function() {
        copyToHospital(hospital_DC_OS);
    });
    diagnosticCenter_H_OS.change(function() {
        copyToDiagnosticCenter(diagnosticCenter_H_OS);
    });

    // Under Diagnostic Center
    // Level 2
    hospital_DC.change(function() {
        level2FieldChange(hospital_DC, outpatientService_DC, outpatientService_H_DC);
        copyToHospital(hospital_DC);
    });
    outpatientService_DC.change(function() {
        level2FieldChange(outpatientService_DC, hospital_DC, hospital_OS_DC);
        copyToOutpatientService(outpatientService_DC);
    });
    // Level 3
    hospital_OS_DC.change(function() {
        copyToHospital(hospital_OS_DC);
    });
    outpatientService_H_DC.change(function() {
        copyToOutpatientService(outpatientService_H_DC);
    });



    // ****************************************************************
    // Initialize form
    // ****************************************************************

    // Initialize change functions
    appointmentType.change();
    hospital.change();
    specialization.change();
    preferredDoctor.change();
    diagnosticCenter.change();
    outpatientService.change();

    $("td.lookup, td.datetime").find("div.input-group").width("100%");   // Expand all lookup and date fields

    $("[data-name='hidden']").closest("fieldset").hide();  // Hide dev section
    $("[data-name='field_dump']").closest("fieldset").hide();  // Hide extra field section

    // Set maximum and minimum appointment dates
    // preferredDate.siblings(".datetimepicker").data("DateTimePicker").maxDate(today.val().split("T")[0]);
    // preferredDate.siblings(".datetimepicker").data("DateTimePicker").maxDate(maxAppointmentLead.val().split("T")[0]);
    preferredDate.siblings(".datetimepicker").data("DateTimePicker").minDate(today);
    preferredDate.siblings(".datetimepicker").data("DateTimePicker").maxDate(maxAppointmentLead);


    function markAsRequired(field) {
        field.closest(".control").prev(".info").addClass("required");
    }
    // Hospital
    markAsRequired(hospital);
    // Hospital under consultation fields
    markAsRequired(hospital_S);
    markAsRequired(hospital_PD_S);
    markAsRequired(hospital_PD);
    // Hospital under outpatient fields
    markAsRequired(hospital_DC);
    markAsRequired(hospital_OS_DC);
    markAsRequired(hospital_OS);
    markAsRequired(hospital_DC_OS);
    // Specialization
    markAsRequired(specialization);
    markAsRequired(specialization_H);
    /*
    // Department
    markAsRequired(department);
    markAsRequired(department_H);
    markAsRequired(department_PD_H);
    markAsRequired(department_PD);
    markAsRequired(department_H_PD);
    */
    // Preferred Doctor
    markAsRequired(preferredDoctor);
    markAsRequired(preferredDoctor_H);
    markAsRequired(preferredDoctor_S_H);
    markAsRequired(preferredDoctor_S);
    markAsRequired(preferredDoctor_H_S);
    // Diagnostic Center
    markAsRequired(diagnosticCenter);
    markAsRequired(diagnosticCenter_H);
    markAsRequired(diagnosticCenter_OS_H);
    markAsRequired(diagnosticCenter_OS);
    markAsRequired(diagnosticCenter_H_OS);
    // Outpatient Service
    markAsRequired(outpatientService);
    markAsRequired(outpatientService_H);
    markAsRequired(outpatientService_DC_H);
    markAsRequired(outpatientService_DC);
    markAsRequired(outpatientService_H_DC);

    
    // Rearrange cascading fields
    moveAfter(hospital_S, hospital);
    moveAfter(hospital_PD, hospital);
    moveAfter(hospital_PD_S, hospital);
    moveAfter(hospital_DC, hospital);
    moveAfter(hospital_DC_OS, hospital);
    moveAfter(hospital_OS, hospital);
    moveAfter(hospital_OS_DC, hospital);
    
    moveAfter(specialization_H, specialization);
    moveAfter(specialization_H_PD, specialization);
    moveAfter(specialization_PD_H, specialization);
    /*
    moveAfter(department_H, department);
    moveAfter(department_H_PD, department);
    moveAfter(department_PD, department);
    moveAfter(department_PD_H, department);
    */
    moveAfter(preferredDoctor_S, preferredDoctor);
    moveAfter(preferredDoctor_S_H, preferredDoctor);
    moveAfter(preferredDoctor_H, preferredDoctor);
    moveAfter(preferredDoctor_H_S, preferredDoctor);

    moveAfter(diagnosticCenter_H, diagnosticCenter);
    moveAfter(diagnosticCenter_H_OS, diagnosticCenter);
    moveAfter(diagnosticCenter_OS, diagnosticCenter);
    moveAfter(diagnosticCenter_OS_H, diagnosticCenter);

    moveAfter(outpatientService_DC, outpatientService);
    moveAfter(outpatientService_DC_H, outpatientService);
    moveAfter(outpatientService_H, outpatientService);
    moveAfter(outpatientService_H_DC, outpatientService);


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
    // Hide Patient field if no dependent GUID is supplied
    // if (!params["dependentid"]) {
    //     $("#msemr_actorpatient").closest("td").hide();
    // }
    // else {
    //     $("#msmer_actorpatient").val(params["dependentid"]).change();
    // }
    // Pre-populate doctor field if passed via query string
    if (params["doctorid"]) {
        $("#mphhi_preferreddoctor").val(params["doctorid"]).change();
		}
		
		// Query Hospital and Associated Hospital if from Find a Doctor Book Button
    $("#mphhi_appointmenttype").change(function () {
        // Pre-populate hospital field if passed via query string (From Find a Doctor Book Button)
        if (params["hid"]) {
            $("#msemr_actorlocation").val(params["hid"]);
            $("#msemr_actorlocation_name").val(params["hname"]);
            $("#msemr_actorlocation_entityname").val("msemr_location");
        }

        // Pre-populate doctor field if passed via query string (From Find a Doctor Book Button)
        if (params["aid"]) {
            $("#mphhi_doctor").val(params["aid"]);
            $("#mphhi_doctor_name").val(params["aname"]);
            $("#mphhi_doctor_entityname").val("mphhi_associatedhospital");
            // $("#mphhi_doctor").change();
        }
    });

    // function queryHospitalAndAssociatedHospital() {
		// 	if (params["hid"]) {
		// 		$("#msemr_actorlocation").val(params["hid"]).change();
		// 		$("#msemr_actorlocation_name").val(params["hname"]);
		// 		$("#msemr_actorlocation_entityname").val("msemr_location");
		// 	}

		// 	// Pre-populate doctor field if passed via query string (From Find a Doctor Book Button)
		// 	if (params["aid"]) {
		// 			$("#mphhi_doctor").val(params["aid"]).change();
		// 			$("#mphhi_doctor_name").val(params["aname"]);
		// 			$("#mphhi_doctor_entityname").val("mphhi_associatedhospital");
		// 	}
    // }
    // ****************************************************************
    // Define validators
    // ****************************************************************

    // Timeslot validator
    var timeslotValidator = document.createElement('span');
    timeslotValidator.style.display = "none";
    timeslotValidator.id = "timeslotValidator";
    timeslotValidator.controltovalidate = "mphhi_timeslot";
    timeslotValidator.errormessage = "<a href='#mphhi_timeslot_label'>Timeslot is a required field.</a>";
    timeslotValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    timeslotValidator.initialvalue = "";
    timeslotValidator.evaluationfunction = function () {
        if ((appointmentType.val() == "205220000" || appointmentType.val() == "205220001")
            && !timeslot.val()) {       // Require E-Consultation Timeslot if Appointment Type is E-Consultation
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

    // Hospital validator
    var hospitalValidator = document.createElement('span');
    hospitalValidator.style.display = "none";
    hospitalValidator.id = "hospitalValidator";
    hospitalValidator.controltovalidate = "msemr_actorlocation";
    hospitalValidator.errormessage = "<a href='#msemr_actorlocation_label'>Hospital is a required field.</a>";
    hospitalValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    hospitalValidator.initialvalue = "";
    hospitalValidator.evaluationfunction = function () {
        if (hospital.val()) {      // Require Hospital; could be accomplished by web form step metadata, but applied here for ease of maintenance
            return true;
        }
        else {
            return false;
        }
    };
    // Add the new validator to the page validators array:
    Page_Validators.push(hospitalValidator);
    // Wire-up the click event handler of the validation summary link
    $("a[href='#msemr_actorlocation_label']").on("click", function () { scrollToAndFocus('msemr_actorlocation_label','msemr_actorlocation'); });

    // Preferred Doctor validator
    var preferredDoctorValidator = document.createElement('span');
    preferredDoctorValidator.style.display = "none";
    preferredDoctorValidator.id = "preferredDoctorValidator";
    preferredDoctorValidator.controltovalidate = "mphhi_preferreddoctor";
    preferredDoctorValidator.errormessage = "<a href='#mphhi_preferreddoctor_label'>Preferred Doctor is a required field.</a>";
    preferredDoctorValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    preferredDoctorValidator.initialvalue = "";
    preferredDoctorValidator.evaluationfunction = function () {
        if ((appointmentType.val() == "205220000" || appointmentType.val() == "205220001")   // Appointment Type is E-Consultation or Face-to-Face
            && !preferredDoctor.val()) {
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
        if (appointmentType.val() == "205220002"   // Appointment Type is Outpatient Service
            && !diagnosticCenter.val()) {
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
        if (appointmentType.val() == "205220002"
            && !outpatientService.val()) {      // Require Outpatient Service if Appointment Type is Outpatient Service
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