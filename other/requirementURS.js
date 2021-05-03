var parameters = {};
parameters.Version = "1";
var requirement = {};
requirement.msdyn_resourcerequirementid = "ee681173-6970-eb11-a812-002248163984"; //Delete if creating new record 
requirement["@odata.type"] = "Microsoft.Dynamics.CRM.msdyn_resourcerequirement";
parameters.Requirement = requirement;
var settings = {};
settings.systemuserid = "67441b12-d865-eb11-a812-002248163be8"; //Delete if creating new record 
settings["@odata.type"] = "Microsoft.Dynamics.CRM.systemuser";
parameters.Settings = settings;

var msdyn_SearchResourceAvailabilityRequest = {
    Version: parameters.Version,
    Requirement: parameters.Requirement,
    Settings: parameters.Settings,

    getMetadata: function() {
        return {
            boundParameter: null,
            parameterTypes: {
                "Version": {
                    "typeName": "Edm.String",
                    "structuralProperty": 1
                },
                "Requirement": {
                    "typeName": "mscrm.crmbaseentity",
                    "structuralProperty": 5
                },
                "Settings": {
                    "typeName": "mscrm.crmbaseentity",
                    "structuralProperty": 5
                }
            },
            operationType: 0,
            operationName: "msdyn_SearchResourceAvailability"
        };
    }
};

Xrm.WebApi.online.execute(msdyn_SearchResourceAvailabilityRequest).then(
    function success(result) {
        if (result.ok) {
            var results = JSON.parse(result.responseText);
        }
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
    }
);