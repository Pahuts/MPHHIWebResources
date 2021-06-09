function generateMedicalCertificate(formContext) {
  var patientInstruction = formContext.getAttribute("msemr_patientinstruction").getValue();
  var medicalCertificateRemarks = formContext.getAttribute("mphhi_medicalcertificateremarks").getValue();
  var remarksForPatient = formContext.getAttribute("mphhi_remarksforpatient").getValue();

  if(!patientInstruction || !medicalCertificateRemarks || !remarksForPatient) {
      formContext.ui.setFormNotification("Please add information on the following fields: Medical Certificate Remarks, Recommendation/Instruction to patient, and Remarks for Patient",  "INFO", "1");
  } else {
    formContext.ui.clearFormNotification("1");
    formContext.ui.setFormNotification("Medical Certificate is now being generated. Please refresh the page after a few seconds.",  "INFO", "2");

    var aptID = Xrm.Page.data.entity.getId(); // get appointment guid
    var fileName = "Medical Certificate.pdf" ;
    var noteSubject = "Medical Certificate Document Uploaded to sharepoint";
    console.log("Appointment GUID: " + aptID);
    console.log("Filename: " + fileName);
    console.log("Subject: " + noteSubject);
    var parameters = {};
    parameters.NoteSubject = noteSubject;
    parameters.FileName = fileName;
    parameters.AptTypeCode = 10272;
    parameters.AptTemplateId = "ddb25c2e-d7ae-eb11-8236-000d3a1a7111";
    parameters.AptRecordId = aptID;
  
    var mphhi_CustomActionGenerateMedicalCertificateRequest = {
        NoteSubject: parameters.NoteSubject,
        FileName: parameters.FileName,
        AptTypeCode: parameters.AptTypeCode,
        AptTemplateId: parameters.AptTemplateId,
        AptRecordId: parameters.AptRecordId,
    
        getMetadata: function() {
            return {
                boundParameter: null,
                parameterTypes: {
                    "NoteSubject": {
                        "typeName": "Edm.String",
                        "structuralProperty": 1
                    },
                    "FileName": {
                        "typeName": "Edm.String",
                        "structuralProperty": 1
                    },
                    "AptTypeCode": {
                        "typeName": "Edm.Int32",
                        "structuralProperty": 1
                    },
                    "AptTemplateId": {
                        "typeName": "Edm.String",
                        "structuralProperty": 1
                    },
                    "AptRecordId": {
                        "typeName": "Edm.String",
                        "structuralProperty": 1
                    }
                },
                operationType: 0,
                operationName: "mphhi_CustomActionGenerateMedicalCertificate"
            };
        }
    };
    
    Xrm.WebApi.online.execute(mphhi_CustomActionGenerateMedicalCertificateRequest).then(
        function success(result) {
            if (result.ok) {
                //Success - No Return Data - Do Something
            }
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
    console.log("EXECUTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEED!!!!!!!!!!!!!!!!!!!");
  }
  Xrm.Utility.showProgressIndicator("Processing...");
  setTimeout("Xrm.Utility.closeProgressIndicator()", 10000);
  formContext.ui.clearFormNotification("2");
}