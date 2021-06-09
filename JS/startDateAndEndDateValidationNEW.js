function checkStartDate(executionContext) {
  var formContext = executionContext.getFormContext();
  var startDate = formContext.getAttribute('msemr_starttime').getValue();

  var todayDate = new Date();
  // var date = Xrm.Page.getAttribute(fieldName);
  todayDate.setHours(0,0,0);
  if (startDate < todayDate)
      {
         Xrm.Page.getControl('msemr_starttime').setNotification('Start date cannot be past dates.');
      }
      else
      {
         Xrm.Page.getControl('msemr_starttime').clearNotification();
      }
}

function checkEndDate(executionContext) 
{
  var formContext = executionContext.getFormContext();
  var startDate = formContext.getAttribute('msemr_starttime').getValue();
  var endDate = formContext.getAttribute('msemr_endtime').getValue();

  if(endDate != null){
    if (endDate <= startDate)
      {
        Xrm.Page.getControl('msemr_endtime').setNotification("End date cannot be earlier than start date.");
      }
      else
      {
        Xrm.Page.getControl('msemr_starttime').clearNotification();
      }
    }
}