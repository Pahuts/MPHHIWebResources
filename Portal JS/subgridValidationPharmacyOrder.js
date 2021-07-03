// Apply Client Side Validation on FieldName
if (window.jQuery) {
    (function ($) {
       $(document).ready(function () {
        $("#mphhi_validationfield").parent().parent().hide();
        var rowCount = 0;
        rowCount = $("#medicine_subgrid tbody").children().length;  
        console.log(rowCount);
           $("#mphhi_validationfield").parent().parent().parent().hide();
          if (typeof (Page_Validators) == 'undefined') return;
          // Create new validator
          var newValidator = document.createElement('span');
          newValidator.style.display = "none";
          newValidator.id = "FieldNameValidator";
          newValidator.controltovalidate = "mphhi_validationfield";
          newValidator.errormessage = "At least one Medication entry is required.</a>";
          newValidator.validationGroup = ""; // Set this if you have set ValidationGroup on the form
          newValidator.initialvalue = "";
          newValidator.evaluationfunction = function () {
            var rowCount = 0;
            rowCount = $("#medicine_subgrid tbody").children().length;    
            var FieldName = $("#mphhi_validationfield").val();       
        if (rowCount == 0 || rowCount == null)                
              return false;  // return false mean apply validation            
         else 
              return true;   // return true mean successful         
          };
          // Add the new validator to the page validators array:
          Page_Validators.push(newValidator);
          // Wire-up the click event handler of the validation summary link
          $("a[href='#mphhi_validationfield_label']").on("click", function () { scrollToAndFocus('mphhi_validationfield_label','mphhi_validationfield'); });
       });
    }(window.jQuery));
 }