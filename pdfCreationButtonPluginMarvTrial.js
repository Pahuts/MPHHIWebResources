var parameters = {};
parameters.TemplateId = "e3946988-247c-eb11-a812-002248173aec";
parameters.RecordId = "";
parameters.TypeCode = 10281;
​
var ndph_PDFCustomActionRequest = {
    TemplateId: parameters.TemplateId,
    RecordId: parameters.RecordId,
    TypeCode: parameters.TypeCode,
​
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
​
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