function checkStartDate(executionContext)
{
  var formContext = executionContext.getFormContext();
  var startDate = formContext.getAttribute('msemr_starttime').getValue();

  var todayDate = new Date(); 
  todayDate.setHours(0,0,0);
 if (!startDate) {
    formContext.ui.setFormNotification("Please input a start date.",  "ERROR", "1");
    // executionContext.getEventArgs().preventDefault();
  } else if (startDate < todayDate) {
      formContext.ui.setFormNotification("Start Date cannot be past dates.",  "ERROR", "2");
      // executionContext.getEventArgs().preventDefault();
  } else if (startDate >= todayDate) {
      formContext.ui.clearFormNotification("1");
      formContext.ui.clearFormNotification("2");
    }
  }

function checkEndDate(executionContext)
{
  var formContext = executionContext.getFormContext();
  var startDate = formContext.getAttribute('msemr_starttime').getValue();
  var endDate = formContext.getAttribute('msemr_endtime').getValue();
  if (!startDate) 
  {
    if (endDate < startDate)
    {
      formContext.ui.setFormNotification("End Date cannot be less than the start date.",  "ERROR", "3");
      executionContext.getEventArgs().preventDefault();
    }

    else if (endDate >= startDate)
    {
      formContext.ui.clearFormNotification("3");
    }
  }

}

