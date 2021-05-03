function getDaysOfTheWeek() {
  // https://hcntt.crm.dynamics.com/api/data/v9.1/recurrencerules?$select=daysofweekmask&$filter=_objectid_value eq 94756597-237b-eb11-a812-000d3a8bea6f -- this is just a test on how to get the object id value through api
  var req = new XMLHttpRequest();
  var objectid = "d4de8788-c67b-eb11-a812-000d3a8bea6f" // this is where you put the recurring appointment's record id;
  req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/recurrencerules?$select=daysofweekmask&$filter=_objectid_value eq " + objectid, true);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
  req.onreadystatechange = function() {
      if (this.readyState === 4) {
          req.onreadystatechange = null;
          if (this.status === 200) {
              var result = JSON.parse(this.response);
              var _createdby_value = result["_createdby_value"];
              var _createdby_value_formatted = result["_createdby_value@OData.Community.Display.V1.FormattedValue"];
              var _createdby_value_lookuplogicalname = result["_createdby_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
              var createdon = result["createdon"];
              var _createdonbehalfby_value = result["_createdonbehalfby_value"];
              var _createdonbehalfby_value_formatted = result["_createdonbehalfby_value@OData.Community.Display.V1.FormattedValue"];
              var _createdonbehalfby_value_lookuplogicalname = result["_createdonbehalfby_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
              var dayofmonth = result["dayofmonth"];
              var dayofmonth_formatted = result["dayofmonth@OData.Community.Display.V1.FormattedValue"];
              var daysofweekmask = result["daysofweekmask"];
              var daysofweekmask_formatted = result["daysofweekmask@OData.Community.Display.V1.FormattedValue"];
              var duration = result["duration"];
              var duration_formatted = result["duration@OData.Community.Display.V1.FormattedValue"];
              var effectiveenddate = result["effectiveenddate"];
              var effectivestartdate = result["effectivestartdate"];
              var endtime = result["endtime"];
              var firstdayofweek = result["firstdayofweek"];
              var firstdayofweek_formatted = result["firstdayofweek@OData.Community.Display.V1.FormattedValue"];
              var instance = result["instance"];
              var instance_formatted = result["instance@OData.Community.Display.V1.FormattedValue"];
              var interval = result["interval"];
              var interval_formatted = result["interval@OData.Community.Display.V1.FormattedValue"];
              var isnthmonthly = result["isnthmonthly"];
              var isnthmonthly_formatted = result["isnthmonthly@OData.Community.Display.V1.FormattedValue"];
              var isnthyearly = result["isnthyearly"];
              var isnthyearly_formatted = result["isnthyearly@OData.Community.Display.V1.FormattedValue"];
              var isregenerate = result["isregenerate"];
              var isregenerate_formatted = result["isregenerate@OData.Community.Display.V1.FormattedValue"];
              var isweekdaypattern = result["isweekdaypattern"];
              var isweekdaypattern_formatted = result["isweekdaypattern@OData.Community.Display.V1.FormattedValue"];
              var _modifiedby_value = result["_modifiedby_value"];
              var _modifiedby_value_formatted = result["_modifiedby_value@OData.Community.Display.V1.FormattedValue"];
              var _modifiedby_value_lookuplogicalname = result["_modifiedby_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
              var modifiedon = result["modifiedon"];
              var _modifiedonbehalfby_value = result["_modifiedonbehalfby_value"];
              var _modifiedonbehalfby_value_formatted = result["_modifiedonbehalfby_value@OData.Community.Display.V1.FormattedValue"];
              var _modifiedonbehalfby_value_lookuplogicalname = result["_modifiedonbehalfby_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
              var monthofyear = result["monthofyear"];
              var monthofyear_formatted = result["monthofyear@OData.Community.Display.V1.FormattedValue"];
              var _objectid_value = result["_objectid_value"];
              var _objectid_value_formatted = result["_objectid_value@OData.Community.Display.V1.FormattedValue"];
              var _objectid_value_lookuplogicalname = result["_objectid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
              var occurrences = result["occurrences"];
              var occurrences_formatted = result["occurrences@OData.Community.Display.V1.FormattedValue"];
              var _ownerid_value = result["_ownerid_value"];
              var _ownerid_value_formatted = result["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
              var _ownerid_value_lookuplogicalname = result["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
              var _owningbusinessunit_value = result["_owningbusinessunit_value"];
              var _owningbusinessunit_value_formatted = result["_owningbusinessunit_value@OData.Community.Display.V1.FormattedValue"];
              var _owningbusinessunit_value_lookuplogicalname = result["_owningbusinessunit_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
              var _owningteam_value = result["_owningteam_value"];
              var _owningteam_value_formatted = result["_owningteam_value@OData.Community.Display.V1.FormattedValue"];
              var _owningteam_value_lookuplogicalname = result["_owningteam_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
              var _owninguser_value = result["_owninguser_value"];
              var _owninguser_value_formatted = result["_owninguser_value@OData.Community.Display.V1.FormattedValue"];
              var _owninguser_value_lookuplogicalname = result["_owninguser_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
              var patternenddate = result["patternenddate"];
              var patternendtype = result["patternendtype"];
              var patternendtype_formatted = result["patternendtype@OData.Community.Display.V1.FormattedValue"];
              var patternstartdate = result["patternstartdate"];
              var recurrencepatterntype = result["recurrencepatterntype"];
              var recurrencepatterntype_formatted = result["recurrencepatterntype@OData.Community.Display.V1.FormattedValue"];
              var ruleid = result["ruleid"];
              var starttime = result["starttime"];
              var versionnumber = result["versionnumber"];
              
              // start of alerts
              alert(starttime)
              alert("Duration of appointments: " + duration);
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
  
  
              //if (starttime.test(/.T..:..:.../)) {      // Test if valid format
              var hourOnlyField = parseInt(starttime.split("T")[1].split(":")[0]);
              // } else {
              alert("hello nasa else");
              // }            
              var durationInt = parseInt(duration);
              alert("duration: " + durationInt);
  
              alert("THIS IS THE HOUR ONLY FIELD: " + hourOnlyField);
          } else {
              Xrm.Utility.alertDialog(this.statusText);
          }
      }
  };
  req.send();

}
