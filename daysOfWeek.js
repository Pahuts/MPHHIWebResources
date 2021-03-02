function getDaysOfTheWeek() {
  // https://hcntt.crm.dynamics.com/api/data/v9.1/recurrencerules?$select=daysofweekmask&$filter=_objectid_value eq 94756597-237b-eb11-a812-000d3a8bea6f -- this is just a test on how to get the object id value through api
  var req = new XMLHttpRequest();
  var objectid = " " // this is where you put the recurring appointment's record id;
  req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/recurrencerules?$select=daysofweekmask&$filter=_objectid_value eq " + objectid, true);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Prefer", "odata.include-annotations=\"*\",odata.maxpagesize=1");
  req.onreadystatechange = function() {
      if (this.readyState === 4) {
          req.onreadystatechange = null;
          if (this.status === 200) {
              var results = JSON.parse(this.response);
              for (var i = 0; i < results.value.length; i++) {
                var daysofweekmask = results.value[i]["daysofweekmask"]; // Masked weekdays
                var patternendtype = results.value[i]["patternendtype"]; // see alert below for the values explanation
                var occurrences = results.value[i]["occurrences"]; // Number of occurences - this only has values if Pattern End Type is equal to 2.
                var patternstartdate = results.value[i]["patternstartdate"];
                var patternenddate = results.value[i]["patternenddate"]; 
                var recurrencepatterntype = results.value[i]["recurrencepatterntype"];
                alert("Days of the week: " + daysofweekmask);
                  // Days of the week mask values explanation
                  // 1. 62 = Monday, Tuesday, Wednesday, Thursday, Friday (Weekdays)
                  // 2. 65 = Saturday, Sunday (Weekends)
                  // 3. 42 = Monday, Wednesday, Friday (MWF)
                  // 4. 34 = Monday and Friday (MF)
                  // 5. 20 = Tuesday and Thursday (TTh)
                  // eto muna since itetest pa kung gagana
                alert("Pattern End Type (1 = No End Date | 2 = Occurences | 3 = Pattern End Date): " + patternendtype);
                  // Pattern End Type values explanation
                  // 1 = No End Date
                  // 2 = Occurrences
                  // 3 = Pattern End Date
                alert("Number of occurences: " + occurrences); // Number of occurences - this only has values if Pattern End Type is equal to 2.
                alert("Recurrence Start Date: " + patternstartdate); // Start date of the recurrence
                alert("Recurrence End Date: " + patternenddate); // End Date of the Recurrence
                alert("Recurrence Pattern Type (0 = Daily | 1 = Weekly | 2 = Monthly | 3 = Yearly): " + recurrencepatterntype);
                  // Pattern End Type values explanation
                  // 0 = Daily
                  // 1 = Weekly
                  // 2 = Monthly
                  // 3 = Yearly
              }
          } else {
              Xrm.Utility.alertDialog(this.statusText);
          }
      }
  };
  req.send();
}
