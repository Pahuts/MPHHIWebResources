// fetch all applications 
// this is under construction
// ______________________________¶¶¶¶¶¶
// _____________________________¶¶¶¶¶¶¶¶¶
// ____________________________¶¶¶¶¶¶¶¶¶¶
// ____________________________¶¶¶¶¶¶¶¶¶¶¶
// ____________________________¶¶¶¶¶¶¶¶¶¶
// _____________________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// ____________________¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// ___________________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶__________¶¶¶¶
// __________________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_______¶¶¶¶¶¶
// _________________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶______¶¶¶¶¶
// ________________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_____¶¶¶
// ________________¶¶¶¶_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶___¶¶¶
// _______________¶¶¶¶__¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶_¶¶¶
// _______________¶¶¶___¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// ______________¶¶¶____¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// ______________¶¶_____¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// ____________¶¶¶¶_____¶¶¶¶¶¶¶¶¶¶¶¶¶
// ___________¶¶¶¶_____¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// ___________¶¶_¶___¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// ___________¶_____¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// _________________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// __________________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// _____________¶¶¶¶¶_¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// __________¶¶¶_______¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// _________¶__________¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶
// _________¶_________¶¶¶¶¶¶¶¶____¶¶¶¶¶¶¶¶
// __________¶________¶¶¶¶¶¶¶______¶¶¶¶¶¶¶¶
// ___________¶______¶¶¶¶¶¶¶_________¶¶¶¶¶¶
// ____________¶____¶¶¶¶¶¶¶__________¶¶¶¶¶¶
// _____________¶__¶¶¶¶¶¶¶__________¶¶¶¶¶¶
// _______________¶¶¶¶¶¶¶___________¶¶¶¶¶
// ______________¶¶¶¶¶¶¶_¶¶¶_______¶¶¶¶¶¶
// ______________¶¶¶¶¶¶_____¶______¶¶¶¶¶
// _____________¶¶¶¶¶¶______¶______¶¶¶¶¶
// _____________¶¶¶¶¶_______¶_____¶¶¶¶¶¶
// ____________¶¶¶¶¶_______¶¶_____¶¶¶¶¶¶
// ___________¶¶¶¶¶¶______¶¶______¶¶¶¶¶¶
// ___________¶¶¶¶¶¶______¶_______¶¶¶¶¶¶¶¶
// ____________¶¶¶¶______¶____________¶¶¶¶¶¶
// ______¶¶¶¶¶¶_¶¶¶_¶¶¶¶¶
// ¶¶¶¶¶¶_______¶¶¶                                                                                                                                                                                                                                                                                                                                       
// {% fetchxml applications_active %}
// <fetch version="1.0" mapping="logical">
//     <entity name="msemr_applicationsemr">
//         <attribute name="ndph_programid" />
//         <attribute name="ndph_name" />
//         <attribute name="ndph_description" />
//         <attribute name="ndph_programtype" />
//         <attribute name="ndph_school" />
//         <attribute name="ndph_displayorder" />
//         <attribute name="statecode" />
//         <order attribute="ndph_displayorder" descending="true" />
//         <filter>
//             <condition attribute="ndph_programtype" operator="eq" value="649840000" />
//             <condition attribute="statecode" operator="eq" value="0" />
//         </filter>
//     </entity>
// </fetch>
// {% endfetchxml %}
// edit unknown error message
// var errorMessage = "Note: A participant cannot be added more than once.";
// $('.text-danger').html('<span class="fa fa-exclamation-triangle" aria-hidden="true"></span>&nbsp'+errorMessage);
// hide lookup buttons
$("#mphhi_appointment_name").parent().find('.input-group-btn').hide(); 
$("#mphhi_patient_name").parent().find('.input-group-btn').hide();  
// adjust column width
$("#mphhi_appointment").parent().parent().attr("colspan","2");
$("#mphhi_appointment").parent().css("width","100%");
$("#mphhi_patient").parent().parent().attr("colspan","2");
$("#mphhi_patient").parent().css("width","100%");
//$("input[type='button'][value='Submit']").hide();
// start of query code
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

// autopopulate appointment emr lookup field using queried values
document.getElementById("mphhi_appointment").value = params["id"];
document.getElementById("mphhi_appointment_name").value = params["apt"];
document.getElementById("mphhi_appointment_entityname").value = "msemr_appointmentemr";
// autopopulate patient lookup field using queried values
document.getElementById("mphhi_patient").value = params["ptid"];
document.getElementById("mphhi_patient_name").value = params["ptn"];
document.getElementById("mphhi_patient_entityname").value = "contact";

document.getElementById("mphhi_visitid").value = params["v_id"];

// $("#mphhi_appointment").val(params["id"]);
// $("#mphhi_appointment_name").val(params["apt"]);
// $("#mphhi_appointment_entityname").val("msemr_appointmentemr");


// disable fields
// $("#ndph_opportunity").parent().find('.input-group-btn').hide();
// border radius to round
// $("#ndph_opportunity_name").css("border-bottom-right-radius","5px");
// $("#ndph_opportunity_name").css("border-top-right-radius","5px");
// adjust colspan of fields
// $("#ndph_opportunity").parent().parent().attr("colspan","3");
// $("#ndph_opportunity").parent().css("width","100%");