var fromDate = new Date();
var toDate = new Date();
var parameters = {};
parameters.Version = "2";
var requirement = {};
requirement.msdyn_resourcerequirementid = "ee681173-6970-eb11-a812-002248163984"; //Delete if creating new record 
requirement["@odata.type"] = "Microsoft.Dynamics.CRM.msdyn_resourcerequirement";
parameters.Requirement = requirement;
parameters.fromDate = new Date("3/3/2021").toISOString();
parameters.toDate = new Date("3/3/2021").toISOString();
// parameters.Duration = 60;
// parameters.Effort = 1;
// // parameters.RealTimeMode = true;
// // parameters.IgnoreDuration = true;
// // parameters.IgnoreTravelTime = true;
// // parameters.AllowOverlapping = true;
// // parameters.Radius = 0;

var settings = {};
settings.systemuserid = "67441b12-d865-eb11-a812-002248163be8"; //Delete if creating new record 
settings["@odata.type"] = "Microsoft.Dynamics.CRM.systemuser";
parameters.Settings = settings;

var req = new XMLHttpRequest();
req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/msdyn_SearchResourceAvailability", true);
req.setRequestHeader("OData-MaxVersion", "4.0");
req.setRequestHeader("OData-Version", "4.0");
req.setRequestHeader("Accept", "application/json");
req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
req.onreadystatechange = function() {
    if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (this.status === 200) {
            var results = JSON.parse(this.response);
            alert(this.response);
        } else {
            Xrm.Utility.alertDialog(this.statusText);
            alert(this.statusText);
        }
    }
};
req.send(JSON.stringify(parameters));