$(document).ready(function () {

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
  // hide visit id for companion
  if(params["id"] == null) {
    $("#mphhi_visitidfromappointment").parent().parent().parent().hide();
    $("#mphhi_visittype_1").prop("disabled",false); // disable visit type option patient
    $("#mphhi_visittype_0").prop("disabled",false); // disable visit type option companion
    $('#mphhi_doyouhaveacompanion').parent().parent().hide(); // hide do you have a companion
    $('#mphhi_visittype').val(205220001);
  } else {
    $("#mphhi_visittype").prop("disabled",true); 
    $("#mphhi_visittype_1").prop("disabled",true); // disable visit type option patient
    $("#mphhi_visittype_0").prop("disabled",true); // disable visit type option companion
  }

  // update fields
  $("#mphhi_visitidfromappointment").val(params["id"]); // update visit id
  $("#mphhi_relatedappointment").val(params["apt"]);
  //$("#mphhi_relatedappointment_name").val(params["name"]);
  $("#mphhi_relatedappointment_entityname").val("msemr_appointmentemr");

  // hide fields
  $("#mphhi_relatedappointment").parent().parent().parent().hide();

  // disable fields
  $('#mphhi_visitidfromappointment').attr('readonly', true);

  //$("#mphhi_visitidfromappointment").prop("disabled",true); // disable visit id field

  // Relabel "Visit Type?" options
  $("label[for='mphhi_visittype_0']").html('I am a Patient');
  $("label[for='mphhi_visittype_1']").html('I am a Companion');

  // Reposition Yes and No Radio Buttons
  $("label[for='mphhi_doyouhaveacompanion_1']").insertBefore($("#mphhi_doyouhaveacompanion_0")); // Patient
  $("#mphhi_doyouhaveacompanion_1").insertBefore("label[for='mphhi_doyouhaveacompanion_1']"); // Companion
  
  // $("label[for='mphhi_traveltoplaceswithin14days_1']").insertBefore($("#mphhi_traveltoplaceswithin14days_0")); // Traveled to places within 14 days
  // $("#mphhi_traveltoplaceswithin14days_1").insertBefore("label[for='mphhi_traveltoplaceswithin14days_1']");  // Traveled to places within 14 days
  
  // $("label[for='mphhi_closecontactwithcovid19within14days_1']").insertBefore($("#mphhi_closecontactwithcovid19within14days_0")); // Close contact with suspect, probable or confirmed Covid-19 case within past 14 days? 
  // $("#mphhi_closecontactwithcovid19within14days_1").insertBefore("label[for='mphhi_closecontactwithcovid19within14days_1']"); // Close contact with suspect, probable or confirmed Covid-19 case within past 14 days? 

  $("label[for='mphhi_covid19testhistory_1']").insertBefore($("#mphhi_covid19testhistory_0")); // Have you been tested for Covid-19?
  $("#mphhi_covid19testhistory_1").insertBefore("label[for='mphhi_covid19testhistory_1']"); // Have you been tested for Covid-19?

  // $("label[for='mphhi_covid19testresult_1']").insertBefore($("#mphhi_covid19testresult_0")); // Result
  // $("#mphhi_covid19testresult_1").insertBefore("label[for='mphhi_covid19testresult_1']"); // Result

  // $("label[for='mphhi_14daysquarantinecompleted_1']").insertBefore($("#mphhi_14daysquarantinecompleted_0")); // 14 days quarantine
  // $("#mphhi_14daysquarantinecompleted_1").insertBefore("label[for='mphhi_14daysquarantinecompleted_1']"); // 14 days quarantine

  // $("label[for='mphhi_subsequentnegativertpcrresult_1']").insertBefore($("#mphhi_subsequentnegativertpcrresult_0")); // Subsequent RT-PCR
  // $("#mphhi_subsequentnegativertpcrresult_1").insertBefore("label[for='mphhi_subsequentnegativertpcrresult_1']"); // Subsequent RT-PCR

  // Add class to checkboxes:
  $('#mphhi_cough').addClass("symptom_checkbox");
  $('#mphhi_colds').addClass("symptom_checkbox");
  $('#mphhi_headache').addClass("symptom_checkbox");
  $('#mphhi_shortnessofbreath').addClass("symptom_checkbox");
  $('#mphhi_throatpain').addClass("symptom_checkbox");
  $('#mphhi_bodypainsormusclepains').addClass("symptom_checkbox");
  $('#mphhi_weakness').addClass("symptom_checkbox");
  $('#mphhi_lackofsmellortaste').addClass("symptom_checkbox");
  $('#mphhi_feverwith38degreescelsiusorhigher').addClass("symptom_checkbox");
  $('#mphhi_diarrheawithorwithoutvomiting').addClass("symptom_checkbox");
  $('#mphhi_noneoftheabove').addClass("none_checkbox");

  // Reposition checkboxes:
  // $("label[for='mphhi_cough']").append('&nbsp;'); // add space after label
  // $('#mphhi_cough').insertAfter("label[for='mphhi_cough']"); // reposition checkbox after label

  // $("label[for='mphhi_colds']").append('&nbsp;'); // add space after label
  // $('#mphhi_colds').insertAfter("label[for='mphhi_colds']"); // reposition checkbox after label

  // $("label[for='mphhi_headache']").append('&nbsp;'); // add space after label
  // $('#mphhi_headache').insertAfter("label[for='mphhi_headache']"); // reposition checkbox after label

  // $("label[for='mphhi_shortnessofbreath']").append('&nbsp;'); // add space after label
  // $('#mphhi_shortnessofbreath').insertAfter("label[for='mphhi_shortnessofbreath']"); // reposition checkbox after label

  // $("label[for='mphhi_throatpain']").append('&nbsp;'); // add space after label
  // $('#mphhi_throatpain').insertAfter("label[for='mphhi_throatpain']"); // reposition checkbox after label

  // $("label[for='mphhi_bodypainsormusclepains']").append('&nbsp;'); // add space after label
  // $('#mphhi_bodypainsormusclepains').insertAfter("label[for='mphhi_bodypainsormusclepains']"); // reposition checkbox after label

  // $("label[for='mphhi_weakness']").append('&nbsp;'); // add space after label
  // $('#mphhi_weakness').insertAfter("label[for='mphhi_weakness']"); // reposition checkbox after label

  // $("label[for='mphhi_lackofsmellortaste']").append('&nbsp;'); // add space after label
  // $('#mphhi_lackofsmellortaste').insertAfter("label[for='mphhi_lackofsmellortaste']"); // reposition checkbox after label

  // $("label[for='mphhi_feverwith38degreescelsiusorhigher']").append('&nbsp;'); // add space after label
  // $('#mphhi_feverwith38degreescelsiusorhigher').insertAfter("label[for='mphhi_feverwith38degreescelsiusorhigher']"); // reposition checkbox after label

  // $("label[for='mphhi_diarrheawithorwithoutvomiting']").append('&nbsp;'); // add space after label
  // $('#mphhi_diarrheawithorwithoutvomiting').insertAfter("label[for='mphhi_diarrheawithorwithoutvomiting']"); // reposition checkbox after label
  
  // $("label[for='mphhi_noneoftheabove']").append('&nbsp;'); // add space after label
  // $('#mphhi_noneoftheabove').insertAfter("label[for='mphhi_noneoftheabove']"); // reposition checkbox after label

  // // append description
  // $("#mphhi_doyouhaveacompanion").append("<br><p class='p-description'>*A new health declaration form page will be opened. <br>*Companion/s should not be below 18 years old.</p>");

  // // Reposition Radio Button Labels
  // $("#mphhi_traveltoplaceswithin14days_label").insertBefore($("#mphhi_traveltoplaceswithin14days_1")).addClass("info-radio");
  // $("#mphhi_closecontactwithcovid19within14days_label").insertBefore($("#mphhi_closecontactwithcovid19within14days_1")).addClass("info-radio");
  // $("#mphhi_covid19testhistory_label").insertBefore($("#mphhi_covid19testhistory_1")).addClass("info-radio");
  // $("#mphhi_covid19testresult_label").insertBefore($("#mphhi_covid19testresult_1")).addClass("info-radio");
  // $("#mphhi_14daysquarantinecompleted_label").insertBefore($("#mphhi_14daysquarantinecompleted_1")).addClass("info-radio");
  // $("#mphhi_subsequentnegativertpcrresult_label").insertBefore($("#mphhi_subsequentnegativertpcrresult_1")).addClass("info-radio");



  // Open new tab if Yes I have companion is ticked
  $("#mphhi_doyouhaveacompanion_1").change(
      function() {
        if($('#mphhi_doyouhaveacompanion_1')) { 
            window.open(`/health-declaration-form/?apt=${params['apt']}`, '_blank'); 
          }
      }
  );

  // Enable/disable Submit button based on whether agreement has been accepted
  $("#mphhi_iagreewiththeprovisions").change(
    function() {
        if ($("#mphhi_iagreewiththeprovisions").prop("checked") && $('.symptom_checkbox:checked').length > 0) { // check if patient agrees and one checkbox is ticked
            $("#InsertButton").prop("disabled", false);
            $("#mphhi_visitidfromappointment").val(params["id"]); // update visit id
        } else if ($("#mphhi_iagreewiththeprovisions").prop("checked") && $("#mphhi_noneoftheabove").prop("checked")) {  // check if none of the above is checked
            $("#InsertButton").prop("disabled", false);
            $("#mphhi_visitidfromappointment").val(params["id"]); // update visit id
        }
        else {
            $("#InsertButton").prop("disabled", true);
        }
    }
  );
  $("#mphhi_iagreewiththeprovisions").change();
// Enable/disable Submit button based on whether agreement has been accepted and 1 symptom is checked
  $(".symptom_checkbox").change(
    function() {
      $("#mphhi_noneoftheabove").prop("checked", false); // remove check from none of the above if checked
      if ($("#mphhi_iagreewiththeprovisions").prop("checked") && $('.symptom_checkbox:checked').length > 0) { // check if patient agrees and one checkbox is ticked
        $("#InsertButton").prop("disabled", false);
        $("#mphhi_visitidfromappointment").val(params["id"]); // update visit id
      }
      else if ($("#mphhi_iagreewiththeprovisions").prop("checked") && $("#mphhi_noneoftheabove").prop("checked")) {  // check if none of the above is checked
        $("#InsertButton").prop("disabled", false);
        $("#mphhi_visitidfromappointment").val(params["id"]); // update visit id
      }
      else {
          $("#InsertButton").prop("disabled", true);
      }
    }
  );

  // Enable/disable Submit button based on whether agreement has been accepted and 1 symptom is checked
  $(".none_checkbox").change(
    function() {
      if ($("#mphhi_iagreewiththeprovisions").prop("checked") && $('.symptom_checkbox:checked').length > 0) { // check if patient agrees and one checkbox is ticked
        $("#InsertButton").prop("disabled", false);
        $("#mphhi_visitidfromappointment").val(params["id"]); // update visit id
    }
    else if ($("#mphhi_iagreewiththeprovisions").prop("checked") && $("#mphhi_noneoftheabove").prop("checked")) { // check if none of the above is checked
        $("#InsertButton").prop("disabled", false);
        $("#mphhi_visitidfromappointment").val(params["id"]); // update visit id
    }
    else {
        $("#InsertButton").prop("disabled", true);
    }
  }
  );
  // hide visit id if is does not have a value assigned

  // Add class to field sets
  $("fieldset[aria-label='Do you have any of the following symptoms within the past 14 days?']").addClass("adjust-margin");
  $("fieldset[aria-label='Section']").addClass("adjust-margin");
  $("fieldset[aria-label='Covid Section']").addClass("adjust-margin");


  // Show/Hide Covid test type
  $("#mphhi_covid19testhistory").change(
    function() {
      if($("#mphhi_covid19testhistory_1").prop("checked")) {
        $("#mphhi_covid19testtype").parent().parent().parent().show();
        $("#mphhi_datetested_datepicker_description").parent().parent().parent().show();
        $("#mphhi_covid19testresult").parent().parent().parent().show();
        $("#mphhi_14daysquarantinecompleted").parent().parent().parent().show();
        $("#mphhi_subsequentnegativertpcrresult").parent().parent().parent().show();
      }else {
        $("#mphhi_covid19testtype").parent().parent().parent().hide();
        $("#mphhi_datetested_datepicker_description").parent().parent().parent().hide();
        $("#mphhi_covid19testresult").parent().parent().parent().hide();
        $("#mphhi_14daysquarantinecompleted").parent().parent().parent().hide();
        $("#mphhi_subsequentnegativertpcrresult").parent().parent().parent().hide();
      }
    }
  );

  // adjust colspan of fields
  $("#mphhi_datetested_datepicker_description").parent().parent().attr("colspan","2");
  $("#mphhi_datetested_datepicker_description").parent().css("width","100%");

  // hide fields
  $("#mphhi_covid19testtype").parent().parent().parent().hide();
  $("#mphhi_datetested_datepicker_description").parent().parent().parent().hide();
  $("#mphhi_covid19testresult").parent().parent().parent().hide();
  $("#mphhi_14daysquarantinecompleted").parent().parent().parent().hide();
  $("#mphhi_subsequentnegativertpcrresult").parent().parent().parent().hide();
  
  // edit Symptoms Checkboxes
  $("table[data-name='Symptoms']").addClass("symptoms-checklist");
  $("table[data-name='Symptoms'] tbody").addClass("symptoms-table");
  $(".symptoms-table .checkbox-cell").addClass("symptoms-cell");
  // add/remove class to none of the above
  $(".symptoms-checklist td[colspan='2']").removeClass('symptoms-checkbox');
  $(".symptoms-checklist td[colspan='2']").addClass('nonecheckbox');
  
  // function to add individual classes
  var allCheckboxes = document.getElementsByClassName('symptoms-cell');
  function appendIndividualClasses() {
    for(var i=0; i < allCheckboxes.length; i++){
      $(allCheckboxes[i]).addClass("symbox-" + i);
   }
  }
  // add Classes to checkboxes
  appendIndividualClasses();

  // check if symptom td is ticked
  function checkBoxOnClick(event) {
    if (event.target.type !== 'checkbox') {
      $(this).toggleClass("blue-cell");
      $(".symptoms-checklist .nonecheckbox").removeClass('blue-cell');
      $(':checkbox', this).trigger('click');
      console.log('Nag add ng blue background');
    }
  }
  // event onClick
  $('.symptoms-checklist td').click(checkBoxOnClick);

  // cough checkbox
  $("#mphhi_cough").change(
    function() {
      if($("#mphhi_cough").prop("checked")){
        $(".symbox-0").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-0").removeClass("blue-cell");
      }
    }
  );
  // cough checkbox
  $("#mphhi_cough").change(
    function() {
      if($("#mphhi_cough").prop("checked")){
        $(".symbox-0").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-0").removeClass("blue-cell");
      }
    }
  );
  // cough checkbox
  $("#mphhi_cough").change(
    function() {
      if($("#mphhi_cough").prop("checked")){
        $(".symbox-0").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-0").removeClass("blue-cell");
      }
    }
  );
  // colds checkbox
  $("#mphhi_colds").change(
    function() {
      if($("#mphhi_colds").prop("checked")){
        $(".symbox-1").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-1").removeClass("blue-cell");
      }
    }
  );
  // headache checkbox
  $("#mphhi_headache").change(
    function() {
      if($("#mphhi_headache").prop("checked")){
        $(".symbox-2").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-2").removeClass("blue-cell");
      }
    }
  );
  // shortness of breath checkbox
  $("#mphhi_shortnessofbreath").change(
    function() {
      if($("#mphhi_shortnessofbreath").prop("checked")){
        $(".symbox-3").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-3").removeClass("blue-cell");
      }
    }
  );
  // throat pain checkbox
  $("#mphhi_throatpain").change(
    function() {
      if($("#mphhi_throatpain").prop("checked")){
        $(".symbox-4").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-4").removeClass("blue-cell");
      }
    }
  );
  // body pains or muscle pains checkbox
  $("#mphhi_bodypainsormusclepains").change(
    function() {
      if($("#mphhi_bodypainsormusclepains").prop("checked")){
        $(".symbox-5").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-5").removeClass("blue-cell");
      }
    }
  );
  // weakness checkbox
  $("#mphhi_weakness").change(
    function() {
      if($("#mphhi_weakness").prop("checked")){
        $(".symbox-6").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-6").removeClass("blue-cell");
      }
    }
  );
  // lack of smell/taste checkbox
  $("#mphhi_lackofsmellortaste").change(
    function() {
      if($("#mphhi_lackofsmellortaste").prop("checked")){
        $(".symbox-7").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-7").removeClass("blue-cell");
      }
    }
  );
  // fever checkbox
  $("#mphhi_feverwith38degreescelsiusorhigher").change(
    function() {
      if($("#mphhi_feverwith38degreescelsiusorhigher").prop("checked")){
        $(".symbox-8").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-8").removeClass("blue-cell");
      }
    }
  );
  // diarrhea checkbox
  $("#mphhi_diarrheawithorwithoutvomiting").change(
    function() {
      if($("#mphhi_diarrheawithorwithoutvomiting").prop("checked")){
        $(".symbox-9").addClass("blue-cell");
        $(".symbox-10").removeClass("blue-cell");
        
      } else {
        $(".symbox-9").removeClass("blue-cell");
      }
    }
  );
  // none of the above checkbox
  $("#mphhi_noneoftheabove").change(
    function() {
      if($("#mphhi_noneoftheabove").prop("checked")){
        $(".symbox-10").addClass("blue-cell");
        $(".symbox-0").removeClass("blue-cell");
        $(".symbox-1").removeClass("blue-cell");
        $(".symbox-2").removeClass("blue-cell");
        $(".symbox-3").removeClass("blue-cell");
        $(".symbox-4").removeClass("blue-cell");
        $(".symbox-5").removeClass("blue-cell");
        $(".symbox-6").removeClass("blue-cell");
        $(".symbox-7").removeClass("blue-cell");
        $(".symbox-8").removeClass("blue-cell");
        $(".symbox-9").removeClass("blue-cell");
      } else {
        $(".symbox-10").removeClass("blue-cell");
      }
    }
  );
  // Check if none of the above checkbox is checked
  $("#mphhi_noneoftheabove").change(
      function() {
      if($("#mphhi_noneoftheabove").prop("checked")) {
        $(".symptom_checkbox").prop("checked", false);
      }
    }
  );

  // Append Span
  $("fieldset[aria-label='Section']").append("<br> <span class='symptoms-header'> Symptoms Checklist </span>");
  // adjust terms and conditions
  $(".symptoms-checklist").append("<br><br><br><br>");

});

