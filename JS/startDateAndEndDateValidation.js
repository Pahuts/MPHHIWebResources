function checkStartDate(executionContext) // not needed for organization entity
{
  var formContext = executionContext.getFormContext();
  var startDate = formContext.getAttribute('mphhi_contractstartdate').getValue();
  var endDate = formContext.getAttribute('mphhi_contractenddate').getValue();

  var todayDate = new Date(); 
  todayDate.setHours(0,0,0);

 if (!startDate) 
 {
    if (startDate < todayDate)
    {
      formContext.ui.setFormNotification("Start Date cannot be past dates.",  "ERROR", "1");
      //executionContext.getEventArgs().preventDefault();
      
    }

    else if (startDate >= todayDate)
    {
      formContext.ui.clearFormNotification("1");
    }
  }
}

function checkEndDate(executionContext)
{
  var formContext = executionContext.getFormContext();
  var startDate = formContext.getAttribute('mphhi_contractstartdate').getValue();
  var endDate = formContext.getAttribute('mphhi_contractenddate').getValue();
  if (startDate) 
  {
    if (endDate < startDate)
    {
      formContext.ui.setFormNotification("End Date cannot be less than the start date.",  "ERROR", "2");
      //executionContext.getEventArgs().preventDefault();
    }

    else if (endDate >=   )
    {
      formContext.ui.clearFormNotification("2");
    }
  }

}

