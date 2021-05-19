  //===========================================================================================================================================================================
    // OData query for prepayment - Outpatient Services Entity
    var prePayment = [];
    var outPatientServicesURL = "~/_odata/OutpatientService";
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        url: outPatientServicesURL,
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        async: false,
        success: function(data, textStatus, xhr) {
          prePayment = prePayment.concat(data.value);
          outPatientServicesURL = data["odata.nextLink"];
        }
    });

  // Populated Timeslot Date lookup based on Preferred Date
  // GET ODATA RESULT BEFORE EXECUTING
  $("#mphhi_outpatientservice").change( 
      function() {
          var selectedOutPatientService = {};
          selectedOutPatientService = prePayment.find(
              function(prePaymentObject) {
                // return (dateObject.mphhi_date.match("^" + preferredDate) && dateObject.mphhi_doctor.Id == $("#mphhi_preferreddoctor").val());
                return ($("#mphhi_outpatientservice").val() == prePaymentObject.mphhi_outpatientservicesid);
              }
          );
          if (selectedOutPatientService) {
              // $("#mphhi_timeslotdate").val(selectedOutPatientService.mphhi_timeslotdateid).change();
              if(selectedOutPatientService.mphhi_prepaymentrequired == true){
                
              } else {

              }
          }
          else {
              // $("#mphhi_timeslotdate").val("").change();
              console.log("FAILED");
          }
      }
  );
  // $("#mphhi_outpatientservice").closest("div.control").trigger("dp.change");
  // =======================================================================================================================================================================