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
              var virtual = assHocObject.mphhi_econsultation;
              var f2f = assHocObject.mphhi_facetoface;
              console.log(virtual, f2f);
              console.log(assHocObject.mphhi_hospital);
              asHospArray.push(assHocObject.mphhi_hospital["Name"]);
              specArray.push(assHocObject.mphhi_primaryspecialization["Name"])
            }
            // return (docID == assHocObject.mphhi_doctor["Id"]); // check guid
          }
        );
      }
      getAssociatedHospitals(); // initiate function
      for(let aH of asHospArray) { // get each 
         $("#assocHosp").append("<i class='fas fa-clinic-medical' style='color: #0f4b90;'></i> " +aH + "<br>");
      }
      for(let spec of specArray) { // get each 
        $("#special").append("<i class='fas fa-stethoscope' style='color: #0f4b90;'></i> " +spec + "<br>");
     }
  // End of Associated Hospitals Odata Query
  // =============================================================================

  
  // Create Odata Script (HMOS)
  //============================================================================
  // OData query for Associated Hospitals - Get all values and then edit html css
  var assHocHMOS = [];
  var assHocHMOSServicesURL = "~/_odata/HMOs";
  $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      url: assHocHMOSServicesURL,
      beforeSend: function(XMLHttpRequest) {
          XMLHttpRequest.setRequestHeader("Accept", "application/json");
      },
      async: false,
      success: function(data, textStatus, xhr) {
        assHocHMOS = assHocHMOS.concat(data.value);
        assHocHMOSServicesURL = data["odata.nextLink"];
      }
  });
  // GET ODATA RESULT BEFORE EXECUTING
   var asHospArray = [];
   var hmoArray = [];
      function getHMOs() {
        var doctorHMOS = {};
        doctorHMOS = assHocHMOS.find(
          function(assHMOObject) {
            // check current guid to the list of odata
            if(docID == assHMOObject.mphhi_systemuser["Id"]) {
              console.log(assHMOObject.mphhi_name);
              // asHospArray.push(assHMOObject.mphhi_hospital["Name"]);
              hmoArray.push(assHMOObject.mphhi_name);
              console.log(hmoArray);
              for(let hmo of hmoArray) { // get each 
                $("#hmos").append("<i class='fas fa-heartbeat' style='color: #0f4b90;'></i> " +hmo + "<br>");
             }
            }
            // return (docID == assHocObject.mphhi_doctor["Id"]); // check guid
          }
        );
      }
      getHMOs(); // initiate function
      // for(let aH of asHospArray) { // get each 
      //    $("#assocHosp").append("<i class='fas fa-clinic-medical' style='color: #5BBA47;'></i> " +aH + "<br>");
      // }

     
// End of Associated HMOS Odata Query
// =============================================================================


});