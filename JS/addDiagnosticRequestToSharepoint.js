function callGeneratePDFAction(formContext) {
    formContext.ui.setFormNotification("Documents are being uploaded to sharepoint",  "INFO", "1");
    var aptID = Xrm.Page.data.entity.getId();
    Xrm.WebApi.online.retrieveMultipleRecords("mphhi_diagnosticrequest", "?$select=mphhi_contactguid,mphhi_contactname,mphhi_diagnosticrequestcode,mphhi_diagnosticrequestguid,mphhi_diagnosticrequestid&$filter=_mphhi_appointment_value eq "+aptID+"").then(
        function success(results) {
            for (var i = 0; i < results.entities.length; i++) {
                var mphhi_contactguid = results.entities[i]["mphhi_contactguid"];
                var mphhi_contactname = results.entities[i]["mphhi_contactname"];
                var mphhi_diagnosticrequestcode = results.entities[i]["mphhi_diagnosticrequestcode"];
                var mphhi_diagnosticrequestguid = results.entities[i]["mphhi_diagnosticrequestguid"];
                var mphhi_diagnosticrequestid = results.entities[i]["mphhi_diagnosticrequestid"];
              console.log("DIAGNOSTIC PRESCRIPTION GUID: " + mphhi_diagnosticrequestguid);
              // run the action
              var fileName = "Diagnostic Request-" + mphhi_diagnosticrequestcode + ".pdf" ;
              var noteSubject = "Diagnostic Request:" + mphhi_diagnosticrequestcode +" Document Uploaded to sharepoint";
              console.log("Filename: " + fileName);
              console.log("Note Subject:" + noteSubject);
              customAction(formContext, aptID, fileName, noteSubject, mphhi_diagnosticrequestguid);
          }
  
      },
      function(error) {
          Xrm.Utility.alertDialog(error.message);
      }
    );
  }
  
  function customAction(formContext, aptID, fileName, noteSubject, mphhi_diagnosticrequestguid) {
    console.log("DIAGNOSTIC PRESCRIPTION GUID: " + mphhi_diagnosticrequestguid);
    console.log("Appointment GUID: " + aptID);
    console.log("Filename: " + fileName);
    console.log("Subject: " + noteSubject);
    var parameters = {};
    parameters.NoteSubject = noteSubject;
    parameters.FileName = fileName;
    parameters.AptTypeCode = 10272;
    parameters.AptTemplateId = "";
    parameters.AptRecordId = aptID;
    parameters.OtherTypeCode = 10732; //diagnostic request object type code
    parameters.OtherTemplateId = "5a1a7143-40a6-eb11-b1ac-000d3a19e898"; 
    parameters.OtherRecordId = mphhi_diagnosticrequestguid;
    
    var mphhi_AppointmentEMRCreatePDFTemplateCustomActionRequest = {
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
                operationName: "mphhi_AppointmentEMRCreatePDFTemplateCustomAction"
            };
        }
    };
    
    Xrm.WebApi.online.execute(mphhi_AppointmentEMRCreatePDFTemplateCustomActionRequest).then(
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