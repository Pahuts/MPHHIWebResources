$(document).ready(function () {

    // ****************************************************************
    // Store input elements as variables
    // ****************************************************************
    // ONGOING hide fields (department and hospital department)
    $("#mphhi_diagnosticcenterdepartment").parent().parent().parent().hide();
    $("#mphhi_department").parent().parent().parent().hide();
    // end of hide fields


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
    var diagnosticCenter = $("#mphhi_diagnosticcenterdepartment");
    var department = $("#mphhi_department");
    var outpatientService = $("#mphhi_outpatientservice");

    // Level 2
    var diagnosticCenter_OS = $("#mphhi_diagnosticcenterdepartmentunderos");
    var department_OS = $("#mphhi_departmentunderoutpatientservice");
    var outpatientService_DC = $("#mphhi_outpatientserviceunderdiagnosticcenter");
    var outpatientService_D = $("#mphhi_outpatientserviceunderdepartment");
    /*
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
    */


    // SCHEDULING FIELDS
    // Preferred Date, Timeslot, and Outpatient Start and End Times
    var preferredDate = $("#mphhi_preferreddate");
    var timeslotDate = $("#mphhi_timeslotdate");
    var timeslot = $("#mphhi_timeslot");
    var outpatientTime = $("#mphhi_outpatientstarttime");

    // REFERENCE DATES
    /*
    var today = $("#mphhi_today");
    var yesterday = $("#mphhi_yesterday");
    var maxAppointmentLead = $("#mphhi_maxappointmentlead");
    */

    // var yesterdayDateArray = yesterday.val().split("T")[0].split("-");      // Need to split components to strip time when converting to Date object
    // var maxAppointmentLeadArray = maxAppointmentLead.val().split("T")[0].split("-");

    // Workaround for calculated fields:
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const yesterday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
    const maxAppointmentLead = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, currentDate.getDate());

    // Create array with all dates up to max lead date; for use in blacklisting dates
    function generatePossibleDates() {
        var possibleDates = [];
        // Iteration variables
        var currentIterationDate = new Date(yesterday.getTime());       // Initialize to yesterday
        var currentIterationDateString = "";
        // Loop
        while (currentIterationDate <= maxAppointmentLead) {
            currentIterationDate.setDate(currentIterationDate.getDate() + 1);
            currentIterationDateString = currentIterationDate.toISOString().split("T")[0].split("-");
            possibleDates = possibleDates.concat(currentIterationDateString[1] + "/" + currentIterationDateString[2] + "/" + currentIterationDateString[0]);
        }
        return possibleDates;
    }
    var possibleDates = generatePossibleDates();


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
        $("#mphhi_preferreddoctor_entityname").val("mphhi_associatedhospital");
        // $("#" + preferredDoctor.attr("id") + "_name").val($("#" + sourceField.attr("id") + "_name").val());
        $("#mphhi_preferreddoctor").val(sourceField.val());
        showPreferredDateAndTimeslot();
    }

    function copyToDepartment(sourceField) {
        $("#" + department.attr("id") + "_entityname").val("mphhi_department");
        // $("#" + department.attr("id") + "_name").val($("#" + sourceField.attr("id") + "_name").val());
        department.val(sourceField.val());
        showOutpatientTime();
    }
    function copyToOutpatientService(sourceField) {
        $("#" + outpatientService.attr("id") + "_entityname").val("mphhi_outpatientservice");
        // $("#" + outpatientService.attr("id") + "_name").val($("#" + sourceField.attr("id") + "_name").val());
        outpatientService.val(sourceField.val());
        showOutpatientTime();
    }
    function copyToDiagnosticCenter(sourceField) {
        $("#" + diagnosticCenter.attr("id") + "_entityname").val("mphhi_diagnosticcenterdepartment");
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
                    break;
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
            console.log(currentDatesURL);

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
        // Return output
        return timeslotDates;
    }

    function queryAssociatedHospital(currentPreferredDoctor) {
        var queriedDoctor = [];

        if (currentPreferredDoctor) {
            var specializationURL = "/_odata/AssociatedHospitals?$filter="
                + "mphhi_associatedhospitalid eq guid'" + currentPreferredDoctor + "'";
    
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

        if ($("#mphhi_preferreddoctor").val()) {
            showField(preferredDate);
            showField(timeslot);
            // Query for available dates
            availableTimeslotDates = queryAvailableTimeslotDates($("#mphhi_preferreddoctor").val(), appointmentType.val());
            // Create new array containing only dates
            var availableDates = [];
            var currentDateArray = [];
            for (const availableTimeslotDate of availableTimeslotDates) {
                currentDateArray = availableTimeslotDate.mphhi_date.split("T")[0].split("-");
                availableDates = availableDates.concat(currentDateArray[1] + "/" + currentDateArray[2] + "/" + currentDateArray[0]);
            }
            // Create blacklisted dates array
            var blacklistedDates = possibleDates.filter(e => !availableDates.includes(e));
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
            timeslot.closest(".input-group").find('.input-group-btn').hide(); 
            // Clear placeholder
            $("#" + timeslot.attr("id") + "_name").prop("placeholder", "");

            if (preferredDate.val() && availableTimeslotDates.length > 0) {     // availableTimeslotDates should already be populated by the time Preferred Date is visible; this is just a failsafe
                // Search for corresponding date
                var currentSelectedDate = preferredDate.val().split("T")[0];
                console.log(currentSelectedDate);
                var currentTimeslotDate = availableTimeslotDates.find(date => date.mphhi_date.startsWith(currentSelectedDate));
                console.log(availableTimeslotDates);
                console.log(currentTimeslotDate);
    
                // Populate Timeslot Date and show Timeslot only if Timeslot Date is found
                if (currentTimeslotDate) {
                    timeslotDate.val(currentTimeslotDate.mphhi_timeslotdateid);      // Get first returned value only
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
            clearField(department);
            $("#" + department.attr("id") + "_name").val("");
            clearField(diagnosticCenter);
            $("#" + diagnosticCenter.attr("id") + "_name").val("");
            clearField(outpatientService);
            $("#" + outpatientService.attr("id") + "_name").val("");
            clearField(outpatientTime);

            switch (appointmentType.val()) {
                case "205220000":
                case "205220001":
                    consultationSection.show();
                    outpatientSection.hide();
                    break;
                case "205220002":
                case "205220003":
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

    function level1ConsultationFieldChange(
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

    function level2ConsultationFieldChange(
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
        level1ConsultationFieldChange(hospital, specialization, preferredDoctor, specialization_H, preferredDoctor_H);
    });
    /*
    // Outpatient
    hospital.change(function() {
        level1ConsultationFieldChange(hospital, diagnosticCenter, outpatientService, diagnosticCenter_H, outpatientService_H);
    });
    */


    
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
        level1ConsultationFieldChange(specialization, hospital, preferredDoctor, hospital_S, preferredDoctor_S);
    });


    // Under Hospital
    // Level 2
    preferredDoctor_H.change(function() {
        level2ConsultationFieldChange(preferredDoctor_H, specialization_H, specialization_PD_H);
        copyToPreferredDoctor(preferredDoctor_H);
        var associatedHospitalQuery = queryAssociatedHospital(preferredDoctor_H.val());
        if (associatedHospitalQuery.length > 0) {
            specialization_PD_H.val(associatedHospitalQuery[0].mphhi_primaryspecialization.Name);       // Autopopulate Level 3 Specialization
        }
    });
    specialization_H.change(function() {
        level2ConsultationFieldChange(specialization_H, preferredDoctor_H, preferredDoctor_S_H);
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
        var associatedHospitalQuery = queryAssociatedHospital(hospital_PD.val());
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
        level2ConsultationFieldChange(hospital_S, preferredDoctor_S, preferredDoctor_H_S);
        copyToHospital(hospital_S);
    });
    preferredDoctor_S.change(function() {
        level2ConsultationFieldChange(preferredDoctor_S, hospital_S, hospital_PD_S);
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
    department.change(function() {
        // Clear Outpatient Service under Department
        clearField(outpatientService_D);

        if (department.val()) {
            // Disable Diagnostic Center
            diagnosticCenter.closest(".input-group").find('.input-group-btn').hide();
            // Replace Level 1 Outpatient Service with Outpatient Service under Department
            hideField(outpatientService);
            showField(outpatientService_D);
        }
        else {
            // Enable Diagnostic Center
            diagnosticCenter.closest(".input-group").find('.input-group-btn').show();
            // Replace Outpatient Service under Department with Level 1 Outpatient Service
            hideField(outpatientService_D);
            showField(outpatientService);
        }
    });

    diagnosticCenter.change(function() {
        // Clear Outpatient Service under Department
        clearField(outpatientService_DC);

        if (diagnosticCenter.val()) {
            // Disable Department
            department.closest(".input-group").find('.input-group-btn').hide();
            // Replace Level 1 Outpatient Service with Outpatient Service under Diagnostic Center
            hideField(outpatientService);
            showField(outpatientService_DC);
        }
        else {
            // Enable Diagnostic Center
            department.closest(".input-group").find('.input-group-btn').show();
            // Replace Outpatient Service under Diagnostic Center with Level 1 Outpatient Service
            hideField(outpatientService_DC);
            showField(outpatientService);
        }
    });

    outpatientService.change(function() {
        // Clear Department under Outpatient Service and Diagnostic Center under Outpatient Service
        clearField(department_OS);
        clearField(diagnosticCenter_OS);

        if (outpatientService.val()) {
            // Hide Level 1 fields, show under Outpatient Service fields
            hideField(department);
            hideField(diagnosticCenter);
            showField(department_OS);
            showField(diagnosticCenter_OS);
        }
        else {
            // Hide under Outpatient Service fields, show Level 1 fields
            hideField(department_OS);
            hideField(diagnosticCenter_OS);
            showField(department);
            showField(diagnosticCenter);
        }
    });

    department_OS.change(function() {
        copyToDepartment(department_OS);
    });

    diagnosticCenter_OS.change(function() {
        copyToDiagnosticCenter(diagnosticCenter_OS);
    });

    outpatientService_D.change(function() {
        copyToOutpatientService(outpatientService_D);
    });

    outpatientService_DC.change(function() {
        copyToOutpatientService(outpatientService_DC);
    });

    /*
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
    */



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
    // Specialization
    markAsRequired(specialization);
    markAsRequired(specialization_H);
    // Preferred Doctor
    markAsRequired(preferredDoctor);
    markAsRequired(preferredDoctor_H);
    markAsRequired(preferredDoctor_S_H);
    markAsRequired(preferredDoctor_S);
    markAsRequired(preferredDoctor_H_S);
    // Department
    markAsRequired(department);
    markAsRequired(department_OS);
    // Diagnostic Center
    markAsRequired(diagnosticCenter);
    markAsRequired(diagnosticCenter_OS);
    // Outpatient Service
    markAsRequired(outpatientService);
    markAsRequired(outpatientService_D);
    markAsRequired(outpatientService_DC);

    
    // Rearrange cascading fields
    moveAfter(hospital_S, hospital);
    moveAfter(hospital_PD, hospital);
    moveAfter(hospital_PD_S, hospital);
    
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

    moveAfter(department_OS, department);
    moveAfter(diagnosticCenter_OS, diagnosticCenter);
    moveAfter(outpatientService_D, outpatientService);
    moveAfter(outpatientService_DC, outpatientService);
    /*
    moveAfter(diagnosticCenter_H, diagnosticCenter);
    moveAfter(diagnosticCenter_H_OS, diagnosticCenter);
    moveAfter(diagnosticCenter_OS, diagnosticCenter);
    moveAfter(diagnosticCenter_OS_H, diagnosticCenter);

    moveAfter(outpatientService_DC, outpatientService);
    moveAfter(outpatientService_DC_H, outpatientService);
    moveAfter(outpatientService_H, outpatientService);
    moveAfter(outpatientService_H_DC, outpatientService);
    */

    // Get the query string from the URL
    var queryString = window.location.search;
    queryString = queryString.substring(1);

    // Parse the query string and assign parameters to "params" object
    var queries = queryString.split("&");
    var params = {};
    var queryArray;
    for (query of queries) {
        queryArray = query.split("=");
        params[decodeURIComponent(queryArray[0])] = decodeURIComponent(queryArray[1]);
    }
    // Hide Patient field if no dependent GUID is supplied
    // if (!params["dependentid"]) {
    //     $("#msemr_actorpatient").closest("td").hide();
    // }
    // else {
    //     $("#msmer_actorpatient").val(params["dependentid"]).change();
    // }
    // Pre-populate doctor field if passed via query string

    // Pre populate doctor
    if (params["aid"]) {
        $("#mphhi_preferreddoctor").val(params["aid"]).change();
    }
    var prepopulatedDoctor = queryAssociatedHospital(params["aid"]);

    // get appointment type from url
    var findADoctorType = params["type"];
    console.log(findADoctorType)

    if (findADoctorType == "virtual") {
        // econsult 
        $("#mphhi_appointmenttype").val(205220000).change();
    } else if(findADoctorType == "clinic") {
        // f2f
        $("#mphhi_appointmenttype").val(205220001).change();
    }
    

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

    /*
    // Hospital validator
    var hospitalValidator = document.createElement('span');
    hospitalValidator.style.display = "none";
    hospitalValidator.id = "hospitalValidator";
    hospitalValidator.controltovalidate = "msemr_actorlocation";
    hospitalValidator.errormessage = "<a href='#msemr_actorlocation_label'>Hospital is a required field.</a>";
    hospitalValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    hospitalValidator.initialvalue = "";
    hospitalValidator.evaluationfunction = function () {
        if ((appointmentType.val() == "205220000" || appointmentType.val() == "205220001")   // Appointment Type is E-Consultation or Face-to-Face
            && !hospital.val() && !hospital_PD.val() && !hospital_S.val() && !hospital_.val() && !hospital_PD.val()) {
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
    */
    
    // Diagnostic Center validator
    var departmentValidator = document.createElement('span');
    departmentValidator.style.display = "none";
    departmentValidator.id = "departmentValidator";
    departmentValidator.controltovalidate = "mphhi_department";
    departmentValidator.errormessage = "<a href='#mphhi_department_label'>Diagnostic Center is a required field.</a>";
    departmentValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    departmentValidator.initialvalue = "";
    departmentValidator.evaluationfunction = function () {
        if (appointmentType.val() == "205220002"   // Appointment Type is Outpatient Service
            && !department.val() && !department_OS.val()) {
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


    // Diagnostic Center validator
    var diagnosticCenterValidator = document.createElement('span');
    diagnosticCenterValidator.style.display = "none";
    diagnosticCenterValidator.id = "diagnosticCenterValidator";
    diagnosticCenterValidator.controltovalidate = "mphhi_diagnosticcenterdepartment";
    diagnosticCenterValidator.errormessage = "<a href='#mphhi_diagnosticcenterdepartment_label'>Diagnostic Center is a required field.</a>";
    diagnosticCenterValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    diagnosticCenterValidator.initialvalue = "";
    diagnosticCenterValidator.evaluationfunction = function () {
        if (appointmentType.val() == "205220002"   // Appointment Type is Outpatient Service
            && !diagnosticCenter.val() && !diagnosticCenter_OS.val()) {
            return false;
        }
        else {
            return true;
        }
    };
    // Add the new validator to the page validators array:
    Page_Validators.push(diagnosticCenterValidator);
    // Wire-up the click event handler of the validation summary link
    $("a[href='#mphhi_diagnosticcenterdepartment_label']").on("click", function () { scrollToAndFocus('mphhi_diagnosticcenterdepartment_label','mphhi_diagnosticcenterdepartment'); });
    
    
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
            && !outpatientService.val() && !outpatientService_D.val() && !outpatientService_DC.val()) {      // Require Outpatient Service if Appointment Type is Outpatient Service
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

$(window).load(function() {
    //alert("previous url is: " + document.referrer);
    // var dependentpage = "https://mphhi-dev-us.powerappsportals.com/my-appointments/dependents-appointments/";
    // if(document.referrer == dependentpage)
    // {
    //     $("#msemr_actorpatient").parent().parent().find('button[title="Clear lookup field"]').click();
    // }
    setTimeout(function(){
        var dependentpage = 'https://mphhi-dev-us.powerappsportals.com/my-appointments/dependents-appointments/';
        if (document.referrer == dependentpage) {
            $("#msemr_actorpatient").parent().parent().find('button[title="Clear lookup field"]').click();
        }
    }, 1000);
});