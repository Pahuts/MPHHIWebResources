function callGeneratePDFAction(formContext) {
    formContext.ui.setFormNotification("Documents are being uploaded to sharepoint",  "INFO", "1");
    var aptID = Xrm.Page.data.entity.getId();
      Xrm.WebApi.online.retrieveMultipleRecords("mphhi_eprescription", "?$select=_mphhi_appointment_value,_mphhi_doctor_value,mphhi_eprescriptioncode,_mphhi_patient_value&$filter=_mphhi_appointment_value eq "+aptID+"&$top=5").then(
        function success(results) {
            console.log("Appointment GUID: " + aptID);
            for (var i = 0; i < results.entities.length; i++) {
                var _mphhi_appointment_value = results.entities[i]["_mphhi_appointment_value"];
                var _mphhi_appointment_value_formatted = results.entities[i]["_mphhi_appointment_value@OData.Community.Display.V1.FormattedValue"];
                var _mphhi_appointment_value_lookuplogicalname = results.entities[i]["_mphhi_appointment_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var mphhi_eprescriptioncode = results.entities[i]["mphhi_eprescriptioncode"];
                var mphhi_eprescriptionid = results.entities[i]["mphhi_eprescriptionid"];
                console.log("Prescription ID" + mphhi_eprescriptionid);
                  // run the action
                var fileName = "E-Prescription-" + mphhi_eprescriptioncode + ".pdf" ;
                var noteSubject = "E-Prescription:" + mphhi_eprescriptioncode +" Document Uploaded to sharepoint";
                console.log("Filename: " + fileName);
                console.log("Note Subject:" + noteSubject);
                customAction(formContext, aptID, fileName, noteSubject, mphhi_eprescriptionid);
                
            }
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
    
  } 
  
  function customAction(formContext, aptID, fileName, noteSubject, mphhi_eprescriptionid) {
    console.log("E-PRESCRIPTION GUID: " + mphhi_eprescriptionid);
    console.log("Appointment GUID: " + aptID);
    console.log("Filename: " + fileName);
    console.log("Subject: " + noteSubject);
    var parameters = {};
    parameters.NoteSubject = noteSubject;
    parameters.FileName = fileName;
    parameters.AptTypeCode = 10272;
    parameters.AptTemplateId = "";
    parameters.AptRecordId = aptID;
    parameters.OtherTypeCode = 10733;
    parameters.OtherTemplateId = "a4010d69-40a6-eb11-b1ac-000d3a19e898"; // old template guid c1fb558f-378d-eb11-a812-000d3a4e8e86
    parameters.OtherRecordId = mphhi_eprescriptionid;
    
      var mphhi_CustomActionCreateEPrescriptionNoteActionRequest = {
        NoteSubject: parameters.NoteSubject,
        FileName: parameters.FileName,
        AptTypeCode: parameters.AptTypeCode,
        AptTemplateId: parameters.AptTemplateId,
        AptRecordId: parameters.AptRecordId,
        OtherTypeCode: parameters.OtherTypeCode,
        OtherTemplateId: parameters.OtherTemplateId,
        OtherRecordId: parameters.OtherRecordId,
  
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
                    },
                    "OtherTypeCode": {
                        "typeName": "Edm.Int32",
                        "structuralProperty": 1
                    },
                    "OtherTemplateId": {
                        "typeName": "Edm.String",
                        "structuralProperty": 1
                    },
                    "OtherRecordId": {
                        "typeName": "Edm.String",
                        "structuralProperty": 1
                    }
                },
                operationType: 0,
                operationName: "mphhi_CustomActionCreateEPrescriptionNoteAction"
            };
        }
    };
  
    Xrm.WebApi.online.execute(mphhi_CustomActionCreateEPrescriptionNoteActionRequest).then(
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