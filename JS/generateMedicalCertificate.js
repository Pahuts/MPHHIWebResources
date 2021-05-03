function generateMedicalCertificate(formContext) {
    formContext.ui.setFormNotification("Medical Certificate is now being generated. Please refresh the page after a few seconds.",  "INFO", "1");
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
    parameters.AptTemplateId = "aa545171-33a6-eb11-b1ac-000d3a19e898";
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