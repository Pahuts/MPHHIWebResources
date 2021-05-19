function callGeneratePDFAction(formContext) {
  formContext.ui.setFormNotification("Documents are being uploaded to sharepoint",  "INFO", "1");
  var aptID = Xrm.Page.data.entity.getId();
  var aptIDSlice = aptID.slice(1,-1);
  console.log("Appointment GUID: " + aptIDSlice);


  Xrm.WebApi.online.retrieveMultipleRecords("mphhi_eprescription", "?$select=_mphhi_appointment_value,mphhi_eprescriptioncode,mphhi_eprescriptionguid,mphhi_eprescriptionid,mphhi_subject&$filter=_mphhi_appointment_value eq "+aptIDSlice+"").then(
    function success(results) {
        for (var i = 0; i < results.entities.length; i++) {
          var _mphhi_appointment_value = results.entities[i]["_mphhi_appointment_value"];
          var _mphhi_appointment_value_formatted = results.entities[i]["_mphhi_appointment_value@OData.Community.Display.V1.FormattedValue"];
          var _mphhi_appointment_value_lookuplogicalname = results.entities[i]["_mphhi_appointment_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
          var mphhi_eprescriptioncode = results.entities[i]["mphhi_eprescriptioncode"];
          var mphhi_eprescriptionguid = results.entities[i]["mphhi_eprescriptionguid"];
          var mphhi_eprescriptionid = results.entities[i]["mphhi_eprescriptionid"];
          var mphhi_subject = results.entities[i]["mphhi_subject"];
          console.log("Prescription ID: " + mphhi_eprescriptionid);
          // run the action
          var fileName = "E-Prescription-" + mphhi_eprescriptioncode + ".pdf" ;
          var noteSubject = "E-Prescription:" + mphhi_eprescriptioncode +" Document Uploaded to sharepoint";
          console.log("Filename: " + fileName);
          console.log("Note Subject:" + noteSubject);
          customAction(formContext, aptIDSlice, fileName, noteSubject, mphhi_eprescriptionid);
        }
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
    }
);
} 

function customAction(formContext,aptIDSlice, fileName, noteSubject, mphhi_eprescriptionid) {
  console.log("Custom Action===============================================================================================================");
  console.log("E-PRESCRIPTION GUID: " + mphhi_eprescriptionid);
  console.log("Appointment GUID: " + aptIDSlice);
  console.log("Filename: " + fileName);
  console.log("Subject: " + noteSubject);
  // var apptID = aptID.slice(1, -1);

  var parameters = {};
  parameters.NoteSubject = noteSubject;
  parameters.FileName = fileName;
  parameters.AptTypeCode = 10272;
  parameters.AptTemplateId = "";
  parameters.AptRecordId = aptIDSlice;
  parameters.OtherTypeCode = 10828;
  parameters.OtherTemplateId = "e092fbe2-52b8-eb11-8236-00224823369c";
  parameters.OtherRecordId = mphhi_eprescriptionid;
  
  var mphhi_CustomActionCallRxPDFGeneratorRequest = {
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
              operationName: "mphhi_CustomActionCallRxPDFGenerator"
          };
      }
  };
  
  Xrm.WebApi.online.execute(mphhi_CustomActionCallRxPDFGeneratorRequest).then(
      function success(result) {
          if (result.ok) {
              //Success - No Return Data - Do Something
          }
      },
      function(error) {
          Xrm.Utility.alertDialog(error.message);
      }
  );

  console.log("Action executed.");
  console.log("End Action===============================================================================================================");
}