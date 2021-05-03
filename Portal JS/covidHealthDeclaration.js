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
  } else {
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
  // $("label[for='mphhi_doyouhaveacompanion_1']").insertBefore($("#mphhi_doyouhaveacompanion_0")); // Patient
  // $("#mphhi_doyouhaveacompanion_1").insertBefore("label[for='mphhi_doyouhaveacompanion_1']"); // Companion
  
  // $("label[for='mphhi_traveltoplaceswithin14days_1']").insertBefore($("#mphhi_traveltoplaceswithin14days_0")); // Traveled to places within 14 days
  // $("#mphhi_traveltoplaceswithin14days_1").insertBefore("label[for='mphhi_traveltoplaceswithin14days_1']");  // Traveled to places within 14 days
  
  // $("label[for='mphhi_closecontactwithcovid19within14days_1']").insertBefore($("#mphhi_closecontactwithcovid19within14days_0")); // Close contact with suspect, probable or confirmed Covid-19 case within past 14 days? 
  // $("#mphhi_closecontactwithcovid19within14days_1").insertBefore("label[for='mphhi_closecontactwithcovid19within14days_1']"); // Close contact with suspect, probable or confirmed Covid-19 case within past 14 days? 

  // $("label[for='mphhi_covid19testhistory_1']").insertBefore($("#mphhi_covid19testhistory_0")); // Have you been tested for Covid-19?
  // $("#mphhi_covid19testhistory_1").insertBefore("label[for='mphhi_covid19testhistory_1']"); // Have you been tested for Covid-19?

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

  // Check if none of the above checkbox is checked
  $("#mphhi_noneoftheabove").change(
      function() {
      if($("#mphhi_noneoftheabove".prop("checked",true))) {
        $(".symptom_checkbox").prop("checked", false);
      }
    }
  );
  // Enable/disable Submit button based on whether agreement has been accepted
  $("#mphhi_iagreewiththeprovisions").change(
    function() {
        if ($("#mphhi_iagreewiththeprovisions").prop("checked") && $('.symptom_checkbox:checked').length > 0) { // check if patient agrees and one checkbox is ticked
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
      if ($("#mphhi_iagreewiththeprovisions").prop("checked") && $('.symptom_checkbox:checked').length > 0) { // check if patient agrees and one checkbox is ticked
        $("#InsertButton").prop("disabled", false);
        $("#mphhi_visitidfromappointment").val(params["id"]); // update visit id
    }
    else {
        $("#InsertButton").prop("disabled", true);
    }
    }
  );
  // hide visit id if is does not have a value assigned
});

