$('a[role="menuitem"][href="/access-denied/"]').hide();
// add active class to nav link
$('a[role="menuitem"][aria-label="Find a Doctor"]').addClass("active-nav");

$(document).ready(function() {
    var docID = $("#mphhi_doctor").attr('value');
  // Create Odata Script
  //============================================================================
  // OData query for Associated Hospitals - Get all values and then edit html css
  var assHoc = [];
  var assHocServicesURL = "~/_odata/AssocHospitals";
  $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      url: assHocServicesURL,
      beforeSend: function(XMLHttpRequest) {
          XMLHttpRequest.setRequestHeader("Accept", "application/json");
      },
      async: false,
      success: function(data, textStatus, xhr) {
        assHoc = assHoc.concat(data.value);
        assHocServicesURL = data["odata.nextLink"];
      }
  });
  // GET ODATA RESULT BEFORE EXECUTING
   var asHospArray = [];
   var specArray = [];
      function getAssociatedHospitals() {
        var doctorAssocHospitals = {};
        doctorAssocHospitals = assHoc.find(
          function(assHocObject) {
            // check current guid to the list of odata
            if(docID == assHocObject.mphhi_doctor["Id"]) {
              console.log(assHocObject.mphhi_hospital);
              asHospArray.push(assHocObject.mphhi_hospital["Name"]);
              specArray.push(assHocObject.mphhi_department["Name"])
            }
            // return (docID == assHocObject.mphhi_doctor["Id"]); // check guid
          }
        );
      }
      getAssociatedHospitals(); // initiate function
      for(let aH of asHospArray) { // get each 
         $("#assocHosp").append("<i class='fa fa-home' style='color: #5BBA47;'></i></i> " +aH + "<br>");
      }
      for(let spec of specArray) { // get each 
        $("#special").append("<i class='fa fa-check-circle-o' style='color: #5BBA47;'></i></i> " +spec + "<br>");
     }
     
// End of Odata Query
// =============================================================================

// Book appointment button


});