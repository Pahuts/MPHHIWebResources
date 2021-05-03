function DownloadDocumentTemplateAsPDF(primaryControl)
{
  // get current appointment emr guid
  var appointmentID = Xrm.Page.data.entity.getId();
  console.log(appointmentID);
	var appTemplateId = "e3946988-247c-eb11-a812-002248173aec";
	console.log("Appointment ID: " +appointmentID);
	console.log("CHOSEN TEMPLATE ID: " + appTemplateId);

	var parameters = {};
	parameters.TemplateId = "e3946988-247c-eb11-a812-002248173aec";
	parameters.RecordId = appointmentID;
	parameters.TypeCode = 10281;
	// {OrgName}/api/data/v8.2/EntityDefinitions?$select=LogicalName,ObjectTypeCode&$filter=ObjectTypeCode%20gt%209999 -- this is how you get the entity/objcet type code of any entity 

	var ndph_PDFCustomActionRequest = {
			TemplateId: parameters.TemplateId,
			RecordId: parameters.RecordId,
			TypeCode: parameters.TypeCode,
	
				getMetadata: function() {
					return {
							boundParameter: null,
							parameterTypes: {
									"TemplateId": {
											"typeName": "Edm.String",
											"structuralProperty": 1
									},
									"RecordId": {
											"typeName": "Edm.String",
											"structuralProperty": 1
									},
									"TypeCode": {
											"typeName": "Edm.Int32",
											"structuralProperty": 1
									}
							},
							operationType: 0,
							operationName: "ndph_PDFCustomAction"
					};
			}
	};
	
	Xrm.WebApi.online.execute(ndph_PDFCustomActionRequest).then(
    function success(result) {
        if (result.ok) {
            //Success - No Return Data - Do Something
        }
    },
			function(error) {
					Xrm.Utility.alertDialog(error.message);
			}
	);
	
  console.log("ACTIVATING PLUGIN")
  // Xrm.Utility.openEntityForm("opportunity", Xrm.Page.data.entity.getId());
  console.log("PLUGIN SHOULD ADD PDF DOCUMENT TO NOTES");
}