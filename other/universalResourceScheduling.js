var parameters = {};
var workorder = {};
workorder.msdyn_workorderid = "ADE6F413-0063-EA11-A811-000D3A5A1CAC"; //Delete if creating new record 
workorder["@odata.type"] = "Microsoft.Dynamics.CRM.msdyn_workorder";
parameters.WorkOrder = workorder;
parameters.RealTimeMode = true;
parameters.Duration = 30;
parameters.IgnoreDuration = true;
parameters.IgnoreTravelTime = true;
parameters.AllowOverlapping = true;
parameters.Radius = 0;
parameters.StartTime = new Date("3/10/2020").toISOString();
parameters.EndTime = new Date("3/10/2020").toISOString();
var resources1 = {};
resources1.systemuserid = "3BD2ADED-20B2-E911-A98E-000D3A374B53"; //Delete if creating new record 
resources1["@odata.type"] = "Microsoft.Dynamics.CRM.systemuser";
parameters.Resources = [resources1];

var req = new XMLHttpRequest();
req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/msdyn_RetrieveResourceAvailability", true);
req.setRequestHeader("OData-MaxVersion", "4.0");
req.setRequestHeader("OData-Version", "4.0");
req.setRequestHeader("Accept", "application/json");
req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
req.onreadystatechange = function() {
    if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (this.status === 200) {
            var results = JSON.parse(this.response);
            alert("response: "+this.response)
        } else {
            alert(this.status);
        }
    }
};
req.send(JSON.stringify(parameters));