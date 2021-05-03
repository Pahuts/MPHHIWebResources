$(document).ready(function() {

    // jquery css for new fields
        // added new fields jan 19 2021
    $("#ndph_statetextonly").parent().parent().attr("colspan","2");
    $("#ndph_statetextonly").parent().css("width","100%");
    $("#ndph_citytextonly").parent().parent().attr("colspan","2");
    $("#ndph_citytextonly").parent().css("width","100%");
    $("#ndph_statebusinesstextonly").parent().parent().attr("colspan","2");
    $("#ndph_statebusinesstextonly").parent().css("width","100%");
    $("#ndph_citybusinesstextonly").parent().parent().attr("colspan","2");
    $("#ndph_citybusinesstextonly").parent().css("width","100%");
    // end of new fields
    $("#address1_postalcode").parent().parent().attr("colspan","2");
    $("#address1_postalcode").parent().css("width","100%");
    $("#ndph_mequestion14").parent().parent().attr("colspan","2");
    $("#ndph_mequestion14").parent().css("width","100%");

    // Disable new address text fields -- January 19 2021
    $("#ndph_statetextonly").prop('disabled', true);
    $("#ndph_citytextonly").prop('disabled', true);
    $("#ndph_statebusinesstextonly").prop('disabled', true);
    $("#ndph_citybusinesstextonly").prop('disabled', true);

    // Disable additional fields
    $("#ndph_company").prop("disabled", true);
    $("#ndph_industry").prop("disabled", true);
    $("#ndph_joblevel").prop("disabled", true);
    $("#jobtitle").prop("disabled", true);
    $("#ndph_jobfunction").prop("disabled",true);
    $("#ndph_jobfunctionother").prop("disabled",true);
    $("#ndph_industryname1").prop("disabled",true);

    // Modified On: October 23, 2020
    // Dev: Jillah Gabog
    $("#ndph_totalyearsofworkexperienceyears").prop("disabled",true);
    $("#ndph_totalyearsofworkexperiencemonths").prop("disabled",true);
    $("#ndph_highesteducationalattainment").prop("disabled",true);
    $("#ndph_degreeprogramname").prop("disabled",true);
    $("#ndph_nameofschoollastattended").prop("disabled",true);
    $("#ndph_yearcompleted").prop("disabled",true);

    // ################################################################
    // FUNCTION DECLARATIONS
    // ################################################################

    // Update School based on Program; execute only after OData query returns "programs" variable
    function updateSchool() {
        var school = $("#ndph_school");
        var schoolName = $("#ndph_school_name");
        var schoolEntity = $("#ndph_school_entityname");
        var programID = $("#ndph_program");

        // Get current program based on degreeProgram
        var currentProgram = {};
        if (programID.val()) {
            // Search in "programs" array for corresponding program element
            currentProgram = programs.find(
                function(program) {
                    return program.ndph_programid == programID.val();
                }
            );
            // Set School
            school.val(currentProgram.ndph_school.Id);
            schoolName.val(currentProgram.ndph_school.Name);
            schoolEntity.val("ndph_school");
        }
        else {      // Triggers if a program has no school assigned or if corresponding program field is empty
            school.val("");
            schoolName.val("");
            schoolEntity.val("");
        }
    }

    // Job function script
    function jobFunction()
    {
        if($("#ndph_jobfunction").val() == "649840015"){
            $("#ndph_jobfunctionother").parent().parent().show();
        } else {
            $("#ndph_jobfunctionother").parent().parent().hide();
        }
    }

    // Hide and show industry other
    function showAndHideIndustryOther()
    {
        if($("#ndph_industry").val() == "20438f98-603f-ea11-a813-000d3a851ff7"){
            $("#ndph_industryname1").parent().parent().show();
        } else {
            $("#ndph_industryname1").parent().parent().hide();
        }
    }

    // Hide/show Home State (Other) based on "Others" checkbox
    function toggleStateOtherHome() {
        var checkedStateOtherHome = $("#ndph_addressnotshownonthelist");
        var stateHome = $("#ndph_state");
        var stateHomeName = $("#ndph_state_name");
        var stateHomeEntity = $("#ndph_state_entityname");
        var stateHomeField = stateHome.parent().parent().parent();
        var stateOtherHome = $("#address1_stateorprovince");
        var stateOtherHomeField = stateOtherHome.parent().parent();

        if (checkedStateOtherHome.prop("checked")) {
            stateHomeField.hide();
            stateOtherHomeField.show();
        }
        else {
            stateOtherHomeField.hide();
            stateHomeField.show();
        }
    }

    // Hide/show Home City (Other) based on "Others" checkbox
    function toggleCityOtherHome() {
        var checkedCityOtherHome = $("#ndph_addressnotshownonlist_city");
        var cityHome = $("#ndph_city");
        var cityHomeName = $("#ndph_city_name");
        var cityHomeEntity = $("#ndph_city_entityname");
        var cityHomeField = cityHome.parent().parent().parent();
        var cityOtherHome = $("#address1_city");
        var cityOtherHomeField = cityOtherHome.parent().parent();

        if (checkedCityOtherHome.prop("checked")) {
            cityHomeField.hide();
            cityOtherHomeField.show();
        }
        else {
            cityOtherHomeField.hide();
            cityHomeField.show();
        }
    }

     // Toggle Business State based on whether Business Country has a value
     function toggleStateBusiness() {
        var checkedStateOtherBusiness = $("#ndph_addressnotshownonthelistbusiness");
        var stateBusiness = $("#ndph_mequestion12");
        var stateBusinessName = $("#ndph_mequestion12_name");
        var stateBusinessEntity = $("#ndph_mequestion12_entityname");
        var stateBusinessField = stateBusiness.parent().parent().parent();
        var stateOtherBusiness = $("#ndph_statebusinessothers");
        var stateOtherBusinessField = stateOtherBusiness.parent().parent();

        if (checkedStateOtherBusiness.prop("checked")) {
            stateBusinessField.hide();
            stateOtherBusinessField.show();
        }
        else {
            stateOtherBusinessField.hide();
            stateBusiness.show();
        }
    }
    // Toggle Business City based on whether Business State has a value
    function toggleCityBusiness() {
        var checkedCityOtherBusiness = $("#ndph_addressnotshownonlist_citybusiness");
        var cityBusiness = $("#ndph_mequestion13");
        var cityBusinessName = $("#ndph_mequestion13_name");
        var cityBusinessEntity = $("#ndph_mequestion13_entityname");
        var cityBusinessField = cityBusiness.parent().parent().parent();
        var cityOtherBusiness = $("#ndph_citybusinessothers");
        var cityOtherBusinessField = cityOtherBusiness.parent().parent();

        if (checkedCityOtherBusiness.prop("checked")) {
            cityBusinessField.hide();
            cityOtherBusinessField.show();
        }
        else {
            cityOtherBusinessField.hide();
            cityBusiness.show();
        }
    }

    // ################################################################
    // INITIALIZE FORM
    // ################################################################

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

    // Query program information from OData
    var programs = [];
    var currentURL = "/_odata/Programs";
    while(currentURL) {
        $.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            url: currentURL,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            success: function(data, textStatus, XHR) {
                programs = programs.concat(data.value);
                currentURL = data["odata.nextLink"];
            }
        });
    }

    // Prepopulate Program fields
    if (!$("#ndph_program").val()) {
        if (params["id"]) {
            var prepopulatedProgram = programs.find(     // Returns an object
                function(program) {
                    // Search in "programs" array for element matching GUID on program lookup
                    return program.ndph_programid == params["id"];
                }
            );
        
            // Populate Program lookup
            $("#ndph_program").val(prepopulatedProgram.ndph_programid);
            $("#ndph_program_name").val(prepopulatedProgram.ndph_name);
            $("#ndph_program_entityname").val("ndph_program");
        }
    }

    // Hide metadata fields
    $(".section[data-name='hidden']").closest("fieldset").hide();

    // Append program guide
    $('.page-copy').append("<div id='instructions' class='instructions'></div>");
    $("#instructions")
        .addClass('instruction')
        .attr('id', 'instruction')
        .append('<p>Fill out the application form below and one of our Recruitment Officers will get in touch with you to guide you throughout the application process. Should you wish to contact us directly, email us at <a href="mailto: admissions@aim.edu" id="admissionsEmail">admissions@aim.edu</a>.</p>')
        .append('<p>Please be reminded that all information you submit in this Form will be recorded in AIM’s database and will be accessed only by authorized AIM personnel.</p>')
        .append('<p><a href="/application-guide/" target="_blank">Click here to read the step-by-step guide to this online graduate degree application process.</a></p>')
        .append('<p><i>* - Required fields.</i></p>');
    $("#guide-link").attr("onclick", "return !window.open(this.href, undefined, 'width=800,height=600')");

    // Append update applicant info instruction
    $('<div>')
    .addClass('updateApplicantInfo')
    .attr('id', 'updateApplicantInfo')
    .append('<p>To update this section, go to My Profile > <a href = "/profile/">Basic Information</a>.</p>')
    .insertBefore('[data-name="personal_information_1"]');

    // Append update home address instruction
    $('<div>')
    .addClass('updateHomeAddressInstruction')
    .attr('id', 'updateHomeAddressInstruction')
    .append('<p>To update this section, go to My Profile > <a href = "/profile/address/">Addresses</a>.</p>')
    .insertBefore('[data-name="home_address"]');

     // Append update business address instruction
     $('<div>')
     .addClass('updateBusinessAddressInstruction')
     .attr('id', 'updateBusinessAddressInstruction')
     .append('<p>To update this section, go to My Profile > <a href = "/profile/address/">Addresses</a>.</p>')
     .insertBefore('[data-name="business_address_header"]');

    // Append update dietary info instruction
    $('<div>')
    .addClass('updateDietaryInfo')
    .attr('id', 'updateDietaryInfo')
    .append('<p>To update this section, go to My Profile > <a href = "/profile/">Basic Information</a>.</p>')
    .insertBefore('[data-name="dietary_information_section"]');


    // Adjust total work experience
    $("[data-name='total_work_experience_section']").prev().css({  "color" : "black", "text-transform" : "capitalize", "font-size" : "15px", "font-weight" : "500", "font-family" : "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif", "margin-left" : "17px" });

    // Disable applicant info fields
    $("#firstname").prop('disabled', true);
    $("#middlename").prop('disabled', true);
    $("#lastname").prop('disabled', true);
    $("#ndph_suffix").prop('disabled', true);
    $("#emailaddress1").prop('disabled', true);
    $("#ndph_countrycodemobilenew").prop('disabled', true);
    $("#ndph_countrycodemobilenew_name").parent().find('.input-group-btn').hide();
    $("#mobilephone").prop('disabled', true);
    $("#ndph_dateofbirth_datepicker_description").parent().find('.form-control').prop('disabled', true);
    $("#ndph_dateofbirth").parent().find('.input-group-addon').hide();
    $("#ndph_sex").prop('disabled', true);
    $("#ndph_countryofbirth").prop('disabled', true);
    $("#ndph_citizenship").prop('disabled', true);
    // Disable home address fields
    $("#address1_line1").prop('disabled', true);
    $("#ndph_country").prop('disabled', true);
    $("#ndph_country_name").parent().find('.input-group-btn').hide();
    $("#address1_postalcode").prop('disabled', true); 
    $("#ndph_state").prop('disabled', true);
    $("#ndph_state_name").parent().find('.input-group-btn').hide(); 
    $("#address1_stateorprovince").prop('disabled', true); 
    $("#ndph_addressnotshownonthelist").prop('disabled', true);
    $("#address1_city").prop('disabled', true);  
    $("#ndph_city").prop('disabled', true);
    $("#ndph_city_name").parent().find('.input-group-btn').hide(); 
    $("#ndph_addressnotshownonlist_city").prop('disabled', true);
    // Disable business address fields
    $("#ndph_businessaddressishomeaddress").prop('disabled', true);
    $("#ndph_street1business").prop('disabled', true);
    $("#ndph_mequestion11").prop('disabled', true);
    $("#ndph_mequestion11_name").parent().find('.input-group-btn').hide();  
    $("#ndph_mequestion12").prop('disabled', true);
    $("#ndph_mequestion12_name").parent().find('.input-group-btn').hide(); 
    $("#ndph_mequestion13").prop('disabled', true);
    $("#ndph_mequestion13_name").parent().find('.input-group-btn').hide();  
    $("#ndph_mequestion14").prop('disabled', true);
    $("#ndph_statebusinessothers").prop('disabled', true);
    $("#ndph_citybusinessothers").prop('disabled', true);
    $("#ndph_addressnotshownonthelistbusiness").prop('disabled', true);
    $("#ndph_addressnotshownonlist_citybusiness").prop('disabled', true);

    // Set School
    updateSchool();

    // Add class to adjust top padding on mobile field
    $("input#mobilephone.text.form-control").closest("td").css("padding-top", "26px");
    // Change button design
    $("#NextButton").addClass("important classicbutton");

    // Resize State/City fields
    $("#ndph_country").parent().parent().parent().attr("colspan","2");          // Home Address
    $("#ndph_country").parent().css("width","100%");
    $("#ndph_state").parent().parent().parent().attr("colspan","2");
    $("#ndph_state").parent().css("width","100%");
    $("#address1_stateorprovince").parent().parent().attr("colspan","2");
    $("#ndph_city").parent().parent().parent().attr("colspan","2");
    $("#ndph_city").parent().css("width","100%");
    $("#address1_city").parent().parent().attr("colspan","2");
    
    $("#ndph_mequestion11").parent().parent().parent().attr("colspan","2");     // Business Address
    $("#ndph_mequestion11").parent().css("width","100%");
    $("#ndph_mequestion12").parent().parent().parent().attr("colspan","2");
    $("#ndph_mequestion12").parent().css("width","100%");
    $("#ndph_statebusinessothers").parent().parent().attr("colspan","2");
    $("#ndph_mequestion13").parent().parent().parent().attr("colspan","2");
    $("#ndph_mequestion13").parent().css("width","100%");
    $("#ndph_citybusinessothers").parent().parent().attr("colspan","2");

    //CSS for border-radius of lookup fields
    //Date of Birth
    $("#ndph_dateofbirth_datepicker_description").css("border-bottom-right-radius","5px");
    $("#ndph_dateofbirth_datepicker_description").css("border-top-right-radius","5px");
    //Country Code for mobile
    $("#ndph_countrycodemobilenew_name").css("border-bottom-right-radius","5px");
    $("#ndph_countrycodemobilenew_name").css("border-top-right-radius","5px");

    //Home Address
    //country
    $("#ndph_country_name").css("border-bottom-right-radius","5px");
    $("#ndph_country_name").css("border-top-right-radius","5px");
    //State
    $("#ndph_state_name").css("border-bottom-right-radius","5px");
    $("#ndph_state_name").css("border-top-right-radius","5px");
    //City
    $("#ndph_city_name").css("border-bottom-right-radius","5px");
    $("#ndph_city_name").css("border-top-right-radius","5px");

    //Business Address
    //country Business
    $("#ndph_mequestion11_name").css("border-bottom-right-radius","5px");
    $("#ndph_mequestion11_name").css("border-top-right-radius","5px");
    //State Business
    $("#ndph_mequestion12_name").css("border-bottom-right-radius","5px");
    $("#ndph_mequestion12_name").css("border-top-right-radius","5px");
    //City Business
    $("#ndph_mequestion13_name").css("border-bottom-right-radius","5px");
    $("#ndph_mequestion13_name").css("border-top-right-radius","5px");
    
    // Validator definition
    if (typeof (Page_Validators) == 'undefined') return;
    
    // Company name validator: 
    var companyNameValidator = document.createElement('span');
    companyNameValidator.style.display = "none";
    companyNameValidator.id = "ndph_company_validator";
    companyNameValidator.controltovalidate = "ndph_company";
    companyNameValidator.errormessage = "<a href='#ndph_company'>Company Name is a required field.</a>";
    companyNameValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
    companyNameValidator.initialvalue = "";
    companyNameValidator.evaluationfunction = function () 
    {
        var companyName = $("#ndph_company").val();
        if (companyName == null || companyName == "") 
        {
            return false;
        } 
        else 
        {
            return true;
        }
    };
    
    // Position title validator: 
    var positionTitleValidator = document.createElement('span');
    positionTitleValidator.style.display = "none";
    positionTitleValidator.id = "jobtitle_validator";
    positionTitleValidator.controltovalidate = "jobtitle";
    positionTitleValidator.errormessage = "<a href='#jobtitle'>Position Title is a required field.</a>";
    positionTitleValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
    positionTitleValidator.initialvalue = "";
    positionTitleValidator.evaluationfunction = function () 
    {
        var positionTitle = $("#jobtitle").val();
        if (positionTitle == null || positionTitle == "") 
        {
            return false;
        } 
        else 
        {
            return true;
        }
    };
    
    // Job level validator: 
    var jobLevelValidator = document.createElement('span');
    jobLevelValidator.style.display = "none";
    jobLevelValidator.id = "ndph_joblevel_validator";
    jobLevelValidator.controltovalidate = "ndph_joblevel";
    jobLevelValidator.errormessage = "<a href='#ndph_joblevel'>Job Level is a required field.</a>";
    jobLevelValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
    jobLevelValidator.initialvalue = "";
    jobLevelValidator.evaluationfunction = function () 
    {
        var jobLevel = $("#ndph_joblevel").val();
        if (jobLevel == null || jobLevel == "") 
        {
            return false;
        } 
        else 
        {
            return true;
        }
    };
    
    // Job Function validator: 
    var jobFunctionValidator = document.createElement('span');
    jobFunctionValidator.style.display = "none";
    jobFunctionValidator.id = "ndph_jobfunction_validator";
    jobFunctionValidator.controltovalidate = "ndph_jobfunction";
    jobFunctionValidator.errormessage = "<a href='#ndph_jobfunction'>Job Function is a required field.</a>";
    jobFunctionValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
    jobFunctionValidator.initialvalue = "";
    jobFunctionValidator.evaluationfunction = function () 
    {
        var jobFunction = $("#ndph_jobfunction").val();
        if (jobFunction == null || jobFunction == "") 
        {
            return false;
        } 
        else 
        {
            return true;
        }
    };

    // Job Function (Other) validator: 
    var jobFunctionOtherValidator = document.createElement('span');
    jobFunctionOtherValidator.style.display = "none";
    jobFunctionOtherValidator.id = "ndph_jobfunctionother_validator";
    jobFunctionOtherValidator.controltovalidate = "ndph_jobfunctionother";
    jobFunctionOtherValidator.errormessage = "<a href='#ndph_jobfunctionother'>Job Function (Other) is a required field.</a>";
    jobFunctionOtherValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
    jobFunctionOtherValidator.initialvalue = "";
    jobFunctionOtherValidator.evaluationfunction = function () 
    {
        var jobFunction = $("#ndph_jobfunction").val();
        var jobFunctionOther = $("#ndph_jobfunctionother").val();
        if ((jobFunction != null) && (jobFunction == 649840015))
        {
            if (jobFunctionOther == null || jobFunctionOther == "")
            {
                return false;
            } 
            else 
            {
                return true;
            }
        } 
        else 
        {
            return true;
        }
    };
    
    // Industry Validator
    var industryValidator = document.createElement('span');
    industryValidator.style.display = "none";
    industryValidator.id = "ndph_industry_validator";
    industryValidator.controltovalidate = "ndph_industry";
    industryValidator.errormessage = "<a href='#ndph_industry'>Industry is a required field.";
    industryValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    industryValidator.initialvalue = "";
    industryValidator.evaluationfunction = function () 
    {
        var industry = $("#ndph_industry").val();
        if (industry == null || industry == "") 
        {
            return false;
        } 
        else 
        {
            return true;
        }
    };

    // Industry (Other) validator: 
    var industryOtherValidator = document.createElement('span');
    industryOtherValidator.style.display = "none";
    industryOtherValidator.id = "ndph_industryname1_validator";
    industryOtherValidator.controltovalidate = "ndph_industryname1";
    industryOtherValidator.errormessage = "<a href='#ndph_industryname1'>Industry (Other) is a required field.</a>";
    industryOtherValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
    industryOtherValidator.initialvalue = "";
    industryOtherValidator.evaluationfunction = function () 
    {
        var industry = $("#ndph_industry").val();
        var industryOther = $("#ndph_industryname1").val();
        if (industry != null && industry == "20438f98-603f-ea11-a813-000d3a851ff7") 
        {
            if (industryOther == null || industryOther == "")
            {
                return false;
            } 
            else 
            {
                return true;
            }
        } 
        else 
        {
            return true;
        }
    };
    
    // Total Work Experience (YEARS) Validator
    var TWEyearsValidator = document.createElement('span');
    TWEyearsValidator.style.display = "none";
    TWEyearsValidator.id = "ndph_totalyearsofworkexperienceyears_validator";
    TWEyearsValidator.controltovalidate = "ndph_totalyearsofworkexperienceyears";
    TWEyearsValidator.errormessage = "<a href='#ndph_totalyearsofworkexperienceyears'>Total Work Experience: Years is a required field.";
    TWEyearsValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    TWEyearsValidator.initialvalue = "";
    TWEyearsValidator.evaluationfunction = function () 
    {
        var TWEyears = $("#ndph_totalyearsofworkexperienceyears").val();
        if (TWEyears == null || TWEyears == "") 
        {
            return false;
        } 
        else 
        {
            return true;
        }
    };
    
    // Total Work Experience (MONTHS) Validator
    var TWEmonthsValidator = document.createElement('span');
    TWEmonthsValidator.style.display = "none";
    TWEmonthsValidator.id = "ndph_totalyearsofworkexperiencemonths_validator";
    TWEmonthsValidator.controltovalidate = "ndph_totalyearsofworkexperiencemonths";
    TWEmonthsValidator.errormessage = "<a href='#ndph_totalyearsofworkexperiencemonths'>Total Work Experience: Months is a required field.";
    TWEmonthsValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
    TWEmonthsValidator.initialvalue = "";
    TWEmonthsValidator.evaluationfunction = function () 
    {
        var TWEmonths = $("#ndph_totalyearsofworkexperiencemonths").val();
        if (TWEmonths == null || TWEmonths == "") 
        {
            return false;
        } 
        else 
        {
            return true;
        }
    };

    // Add the new validators to the page validators array:
    Page_Validators.push(companyNameValidator);
    Page_Validators.push(positionTitleValidator);
    Page_Validators.push(jobLevelValidator);
    Page_Validators.push(jobFunctionValidator);
    Page_Validators.push(jobFunctionOtherValidator);
    Page_Validators.push(industryValidator);
    Page_Validators.push(industryOtherValidator);
    Page_Validators.push(TWEyearsValidator);
    Page_Validators.push(TWEmonthsValidator);
    
    // Add Asterisks for required fields made through validators
    function addAsterisk()
    {
        
        //var companyNameLabel = $("#ndph_company_label");
        var companyNameLabel = $("#MaximumLengthValidatorndph_company");
        //var positionTitleLabel = $("#jobtitle_label");
        var positionTitleLabel = $("#MaximumLengthValidatorjobtitle");
        
        var jobLevelLabel = $("#ndph_joblevel_label");
        var jobFunctionLabel = $("#ndph_jobfunction_label");
        var jobFunctionOtherLabel = $("#ndph_jobfunctionother_label");
        var industryLabel = $("#ndph_industry_label");
        var industryOtherLabel = $("#ndph_industryname1_label");
        //var TWEyearsLabel = $("#ndph_totalyearsofworkexperienceyears_label");
        var TWEyearsLabel = $("#IntegerValidatorndph_totalyearsofworkexperienceyears");
        //var TWEmonthsLabel = $("#ndph_totalyearsofworkexperiencemonths_label");
        var TWEmonthsLabel = $("#IntegerValidatorndph_totalyearsofworkexperiencemonths");

        companyNameLabel.before('<span id="requireCompany" style="color: maroon;">*</span>');
        positionTitleLabel.before('<span id="requirePositionTitle" style="color: maroon;">&nbsp;*</span>');
        jobLevelLabel.after('<span id="requireJobLevel" style="color: maroon;">&nbsp;*</span>');
        jobFunctionLabel.after('<span id="requireJobFunction" style="color: maroon;">&nbsp;*</span>');
        jobFunctionOtherLabel.after('<span id="requireJobFunctionOther" style="color: maroon;">&nbsp;*</span>');
        industryLabel.after('<span id="requireIndustry" style="color: maroon;">&nbsp;*</span>');
        industryOtherLabel.after('<span id="requireIndustryOther" style="color: maroon;">&nbsp;*</span>');
        TWEyearsLabel.before('<span id="requireTWEyears" style="color: maroon;">&nbsp;*</span>');
        TWEmonthsLabel.before('<span id="requireTWEmonths" style="color: maroon;">&nbsp;*</span>');
    }
    
    // Add Asterisk
    addAsterisk();
    
    // Initialize Address (Other) fields
    jobFunction();
    showAndHideIndustryOther();
    toggleStateOtherHome();
    toggleCityOtherHome();
    toggleStateBusiness();
    toggleCityBusiness();

    // Update School field
    $("#ndph_program").change(updateSchool);
    $("#ndph_school").change(updateSchool);


});