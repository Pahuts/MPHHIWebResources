$(document).ready(function () {
    // INITIALIZE FORM
    $("td.lookup div.input-group").width("100%");   // Expand all lookup fields
  
    $("[data-name='hidden2']").closest("fieldset").hide();  // Hide dev section
  
    // Reposition From Previous appointment radio button
    $("label[for='mphhi_frompreviousappointment_1']").insertBefore($("#mphhi_frompreviousappointment_0"));
    $("#mphhi_frompreviousappointment_1").insertBefore("label[for='mphhi_frompreviousappointment_1']");
  
    // Adjust Quick View form colspan
    $("#PreviousAppointmentQV").closest("td").attr("colspan","2");
  
    $("a.add-folder.btn.btn-info.action").hide(); // Hide SharePoint "New Folder" button
  
    $("#mphhi_previousappointment").closest("td").hide(); // Hide previous appointment field
  
    // Show or hide Previous Appointment field based on "Do you have previous prescription/s or attachment/s from previous appointment?" field
    $("#mphhi_frompreviousappointment").change(
        function() {
            if($("#mphhi_frompreviousappointment_0").prop("checked")) {
                $("#mphhi_previousappointment").parent().parent().parent().hide(); // Hide previous appointment field
            } else if($("#mphhi_frompreviousappointment_1").prop("checked")) {
                $("#mphhi_previousappointment").parent().parent().parent().show(); // Show previous appointment field
                $("#mphhi_previousappointment").closest(".control").prev(".info").addClass("required");
            }
        }
    );
    
    // Adjust lookup colspan
    $("#mphhi_previousappointment").closest("td").attr("colspan","2");
  
  
    // Odata for Outpatient Service
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
  var outPatientService = $("#mphhi_outpatientservice").val();
  if(outPatientService) {
    // $("#mphhi_outpatientservice").change( 
    //   function() {
          var selectedOutPatientService = {};
          selectedOutPatientService = prePayment.find(
              function(prePaymentObject) {
                return ($("#mphhi_outpatientservice").val() == prePaymentObject.mphhi_outpatientservicesid);
              }
          );
          if (selectedOutPatientService) {
              console.log("Prepayment Value: " + selectedOutPatientService.mphhi_prepaymentrequired);
              if(selectedOutPatientService.mphhi_prepaymentrequired == true){
                $("#mphhi_paymentmethod").children('option:eq(3)').hide();
              } else {
                $("#mphhi_paymentmethod").children('option:eq(3)').show();
              }
          }
          else {
              // $("#mphhi_timeslotdate").val("").change();
              console.log("No outpatient service selected.");
          }
       
    // );
  }
  
  // $("#mphhi_outpatientservice").change();
  // =======================================================================================================================================================================
  $("#mphhi_outpatientservice").parent().parent().parent().hide();
  });