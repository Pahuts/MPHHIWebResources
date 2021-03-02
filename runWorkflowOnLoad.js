function runWorkflowOnLoad(executionContext)
{
	var formContext = executionContext.getFormContext(); // get formContext
	var checkOpp = formContext.getAttribute("ndph_opportunitycode").getValue();
	if (checkOpp != null)
	{
		var opptyID = formContext.data.entity.getId();
		console.log(opptyID);
		// use formContext instead of Xrm.Page	
		if (opptyID != null || opptyID != "")
		{
			var contactLookup = formContext.getAttribute("parentcontactid").getValue()[0]; 
			var contactName = contactLookup.name;
			console.log(contactLookup);
			console.log(contactName);
		}
	
			if (contactName != null || contactName != "") 
			{
				var parameters = {};
				parameters.EntityId = opptyID;
				
				var req = new XMLHttpRequest();
				req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/workflows(90D7443B-DFE5-4B30-B86E-44C7BFF816A9)/Microsoft.Dynamics.CRM.ExecuteWorkflow", true);
				req.setRequestHeader("OData-MaxVersion", "4.0");
				req.setRequestHeader("OData-Version", "4.0");
				req.setRequestHeader("Accept", "application/json");
				req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				req.onreadystatechange = function() {
						if (this.readyState === 4) {
								req.onreadystatechange = null;
								if (this.status === 200) {
										var results = JSON.parse(this.response);
								} else {
										//Xrm.Utility.alertDialog(this.statusText);
								}
						}
				};
				req.send(JSON.stringify(parameters));
				console.log("Running workflow");
			} else 
			{
					console.log("Contact contains no data.");
			}
	} else
	{
		console.log("There is no data yet.");
	}
}