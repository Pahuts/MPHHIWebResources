function getCurrentPrescriptionValues(primaryControl) {
    var prescriptionID = primaryControl.data.entity.getId();
    var slicePresc = prescriptionID.slice(1,-1);
    console.log("Prescription GUID: " + prescriptionID);
    var patient  = primaryControl.getAttribute("mphhi_patient").getValue();
    var appointment  = primaryControl.getAttribute("mphhi_appointment").getValue();
    var doctor  = primaryControl.getAttribute("mphhi_doctor").getValue();
    var hospital  = primaryControl.getAttribute("mphhi_hospital").getValue();
    var remarks  = primaryControl.getAttribute("mphhi_remarks").getValue();
    var urgency  = primaryControl.getAttribute("mphhi_urgency").getValue();
  
  
  
    var entityFormOptions = {};
    entityFormOptions["entityName"] = "mphhi_eprescription";
    entityFormOptions["formId"] = "2B6D2D26-6A6B-EB11-A812-000D3A9B16E8";
    // prepopulate fields on form open
    var formParameters = {};
    formParameters["mphhi_remarks"] = remarks;
    formParameters["mphhi_urgency"] = urgency;
    formParameters["mphhi_previousprescriptionguid"] = slicePresc;
    formParameters["mphhi_patient"] = patient[0].id;
    formParameters["mphhi_patientname"] = patient[0].name;
    formParameters["mphhi_appointment"] = appointment[0].id;
    formParameters["mphhi_appointmentname"] = appointment[0].name;
    formParameters["mphhi_doctor"] = doctor[0].id;
    formParameters["mphhi_doctorname"] = doctor[0].name;
    formParameters["mphhi_hospital"] = hospital[0].id;
    formParameters["mphhi_hospitalname"] = hospital[0].name;
  
    Xrm.Navigation.openForm(entityFormOptions, formParameters).then(
      function (success) {
          console.log(success);
      },
      function (error) {
          console.log(error);
      });
  }
  