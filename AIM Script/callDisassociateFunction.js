function confirmDisassociation(selectedIds,selectedControl) {
  var confirmStrings = {
    title: "ALERT",
    subtitle: "Are you sure you want to diassociate the selected items?",
    text: "NOTE: This will remove the relationship of the participant with the opportunity."
  }
  Xrm.Navigation.openConfirmDialog(confirmStrings).then(
      function (success) {
          if (success.confirmed) {
            updateOpportunityField(selectedIds,selectedControl);
          }
      }
  );
}
    

function updateOpportunityField(selectedIds,selectedControl) { // delete Opportunity value inside Participant
    if (selectedIds != null && selectedIds != "") {
        var strIds = selectedIds.toString();
        var arrIds = strIds.split(",");
        for (var i = 0; i < arrIds.length; i++) {          
          console.log(arrIds[i]);
          // remove Opportunity value in participant
          var req = new XMLHttpRequest();
          req.open("DELETE", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/ndph_participants("+arrIds[i]+")/ndph_Opportunity/$ref", true); // Look for the correct entity definition to successfully remove the lookup value
          req.setRequestHeader("Accept", "application/json");
          req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          req.setRequestHeader("OData-MaxVersion", "4.0");
          req.setRequestHeader("OData-Version", "4.0");
          req.onreadystatechange = function() { 
              if (this.readyState === 4) {
                  req.onreadystatechange = null;
                  if (this.status === 204 || this.status === 1223) {
                      //Success - No Return Data - Do Something
                      console.log("success");
                  } else {
                      console.log(this.statusText);
                  }
              }
          };
          req.send();
        }       
    }
    else {
        alert("No records selected!");
    }
    selectedControl.refresh();
}

