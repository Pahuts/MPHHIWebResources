$(document).ready(function() {
  // hide lookup buttons
  $("#mphhi_patient_name").parent().find('.input-group-btn').hide();  
  $("#mphhi_appointment_name").parent().find('.input-group-btn').hide();  
  // disable fields
  $("#mphhi_visitid").prop('disabled', true);
  // adjust column width
  $("#mphhi_appointment").parent().parent().attr("colspan","2");
  $("#mphhi_appointment").parent().css("width","100%");
  $("#mphhi_patient").parent().parent().attr("colspan","2");
  $("#mphhi_patient").parent().css("width","100%");
  //$("input[type='button'][value='Submit']").hide();
  // start of query code
  // Get the query string from the URL
  // var queryString = window.location.search;
  // queryString = queryString.substring(1);

  // Parse the query string and assign parameters to "params" object
  // var queries = queryString.split("&");
  // var params = {};
  // var query;
  // for (var i = 0; i < queries.length; ++i) {
  //     query = queries[i].split("=");
  //     params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
  // }

  // autopopulate appointment emr lookup field using queried values
  // document.getElementById("mphhi_appointment").value = params["id"];
  // document.getElementById("mphhi_appointment_name").value = params["apt"];
  // document.getElementById("mphhi_appointment_entityname").value = "msemr_appointmentemr";
  // autopopulate patient lookup field using queried values
  // document.getElementById("mphhi_patient").value = params["ptid"];
  // document.getElementById("mphhi_patient_name").value = params["ptn"];
  // document.getElementById("mphhi_patient_entityname").value = "contact";
  // autopopulate visit id
  document.getElementById("mphhi_visitid").value = params["v_id"];

  
}); 