// Odata for EPrescriptions
var prescriptions = [];
var prescriptionsURL = "~/_odata/Prescriptions";
$.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    datatype: "json",
    url: prescriptionsURL,
    beforeSend: function(XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader("Accept", "application/json");
    },
    async: false,
    success: function(data, textStatus, xhr) {
      prescriptions = prescriptions.concat(data.value);
      prescriptionsURL = data["odata.nextLink"];
    }
});

// Populated Timeslot Date lookup based on Preferred Date
// GET ODATA RESULT BEFORE EXECUTING
$("#mphhi_outpatientservice").change( 
  function() {
      var selectedPrescription = {};
      selectedPrescription = prescriptions.find(
          function(prescriptionsObject) {
            // return (dateObject.mphhi_date.match("^" + preferredDate) && dateObject.mphhi_doctor.Id == $("#mphhi_preferreddoctor").val());
            return ($("#mphhi_outpatientservice").val() == prescriptionsObject.mphhi_outpatientservicesid);
          }
      );
      if (selectedPrescription) {
          // $("#mphhi_timeslotdate").val(selectedOutPatientService.mphhi_timeslotdateid).change();
          if(selectedPrescription.mphhi_prepaymentrequired == true){
            
          } else {

          }
      }
      else {
          // $("#mphhi_timeslotdate").val("").change();
          console.log("FAILED");
      }
  }
);


// OData query for medications - Medications Entity
    var medications = [];
    var medicationURL = "~/_odata/Medication";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        url: medicationURL,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        async: false,
        success: function(data, textStatus, xhr) {
          medications = medications.concat(data.value);
          medicationURL = data["odata.nextLink"];
        }
    });

  // Populated Timeslot Date lookup based on Preferred Date
  // GET ODATA RESULT BEFORE EXECUTING
  $("#mphhi_outpatientservice").change( 
      function() {
          var selectedMedication = {};
          selectedMedication = medications.find(
              function(medicationObject) {
                // return (dateObject.mphhi_date.match("^" + preferredDate) && dateObject.mphhi_doctor.Id == $("#mphhi_preferreddoctor").val());
                return ($("#mphhi_outpatientservice").val() == medicationObject.mphhi_outpatientservicesid);
              }
          );
          if (selectedMedication) {
              // $("#mphhi_timeslotdate").val(selectedOutPatientService.mphhi_timeslotdateid).change();
              if(selectedMedication.mphhi_prepaymentrequired == true){
                
              } else {

              }
          }
          else {
              // $("#mphhi_timeslotdate").val("").change();
              console.log("FAILED");
          }
      }
  );
