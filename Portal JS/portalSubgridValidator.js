$(document).ready(function() {
    $(".section[data-name='hidden']").closest("fieldset").hide();

    if (typeof (Page_Validators) == 'undefined') return;
    // Validator definition
    // Require at least one educational background
    var educationalBackgroundValidator = document.createElement('span');
    educationalBackgroundValidator.style.display = "none";
    educationalBackgroundValidator.id = "EducationalBackgroundValidator";          
    educationalBackgroundValidator.errormessage = "At least one Educational Background entry is required.";            
    educationalBackgroundValidator.evaluationfunction = function () {
        var rowCount = 0;
        rowCount = $("#EducationalBackgroundSubgrid table tbody tr").length;
        if (rowCount <=0) {
            return false;
        }
        else {
            return true;
        }
    };            
    
    Page_Validators.push(educationalBackgroundValidator);
});