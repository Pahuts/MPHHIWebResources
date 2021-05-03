function getCurrentPrescriptionValues(primaryControl) {
  var a = primaryControl.getFormContext();
  var currentPrescriptionGUID = primaryControl.data.entity.getId();
  var getRelatedAppointmentGUID = primaryControl.getAttribute("mphhi_appointment").getValue()[0].id;
  var getPatientGUID = primaryControl.getAttribute("mphhi_patient").getValue()[0].id;
  var getDoctorGUID = primaryControl.getAttribute("mphhi_doctor").getValue()[0].id;
  var getHospitalGUID = primaryControl.getAttribute("mphhi_hospital").getValue()[0].id;
  var sliceAppointment = getRelatedAppointmentGUID.slice(1, -1);
  var slicePatient = getPatientGUID.slice(1,-1);
  var sliceDoctor = getDoctorGUID.slice(1,-1);
  var sliceHospital = getHospitalGUID.slice(1,-1);
  
  console.log("Appt GUID: " + sliceAppointment);
  console.log("Patient GUID: " + slicePatient);
  console.log("Doctor GUID: " + sliceDoctor);
  console.log("Hospital GUID: " + sliceHospital);

  openPrescription(primaryControl,sliceAppointment,slicePatient,sliceDoctor,sliceHospital);
}

function openPrescription(primaryControl,sliceAppointment,slicePatient,sliceDoctor,sliceHospital) {

  var patient  = primaryControl.getAttribute("mphhi_patient").getValue();

  var entityFormOptions = {};
  entityFormOptions["entityName"] = "mphhi_eprescription";
  entityFormOptions["formId"] = "2B6D2D26-6A6B-EB11-A812-000D3A9B16E8";

  // var formParameters = {};
  //   // formParameters["appointmentid"] = primaryControl.getAttribute("mphhi_appointment").getValue()[0].id;
  //   // formParameters["appointmentname"] = primaryControl.getAttribute("mphhi_appointment").getValue()[0].name;
  //   formParameters["mphhi_patient_id"] = "{B50563AA-8A8C-EB11-A812-000D3A4E8E86}";
  //   formParameters["mphhi_patient_name"] = "Luis Doe";
  //   // formParameters["doctorid"] = primaryControl.getAttribute("mphhi_doctor").getValue()[0].id;
  //   // formParameters["doctorname"] = primaryControl.getAttribute("mphhi_doctor").getValue()[0].name;
  //   // formParameters["hospitalid"] = primaryControl.getAttribute("mphhi_hospital").getValue()[0].id;
  //   // formParameters["hospitalname"] = primaryControl.getAttribute("mphhi_hospital").getValue()[0].name;
  
  // Open the form.
  Xrm.Navigation.openForm({
    entityName: "mphhi_eprescription",
        createFromEntity: {
          entityType: "contact",
          id: patient[0].id,
          name: patient[0].name,
        }
      });
}

function prepopulateFields(primaryControl,sliceAppointment,slicePatient,sliceDoctor,sliceHospital) {

  var entity = {};
  entity["mphhi_Appointment@odata.bind"] = "/msemr_appointmentemrs("+sliceAppointment+")";
  entity["mphhi_Doctor@odata.bind"] = "/systemusers("+slicePatient+")";
  entity["mphhi_Patient@odata.bind"] = "/contacts("+sliceDoctor+")";
  entity["mphhi_Hospital@odata.bind"] = "/msemr_locations("+sliceHospital+")";
  
  var req = new XMLHttpRequest();
  req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/mphhi_eprescriptions", true);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.onreadystatechange = function() {
      if (this.readyState === 4) {
          req.onreadystatechange = null;
          if (this.status === 204) {
              var uri = this.getResponseHeader("OData-EntityId");
              var regExp = /\(([^)]+)\)/;
              var matches = regExp.exec(uri);
              var newEntityId = matches[1];
          } else {
              Xrm.Utility.alertDialog(this.statusText);
          }
      }
  };
  req.send(JSON.stringify(entity));
  console.log("EXECUTED!");

}