function restrictFutureDate(fieldName, message) {
    var startDate = Xrm.Page.getAttribute(fieldName).getValue();
    var todayDate = new Date();
    var date = Xrm.Page.getAttribute(fieldName);
    todayDate.setHours(0,0,0);
    if ((date != null) && (startDate > todayDate))
    	{
           Xrm.Page.getControl(fieldName).setNotification(message);
        }
        else
        {
           Xrm.Page.getControl(fieldName).clearNotification();
        }
    }

function restrictPreviousDate(fieldName,message)
{
    var startDate = Xrm.Page.getAttribute(fieldName).getValue();
    var todayDate = new Date();
    var date = Xrm.Page.getAttribute(fieldName);
    todayDate.setHours(0,0,0);
    if (date != null)//interviewdate
        {
        if (startDate < todayDate)
           {
            Xrm.Page.getControl(fieldName).setNotification(message);
           }
        else
  	      	{
   		     Xrm.Page.getControl(fieldName).clearNotification();
        	}
       }
}

function restrictStartandEndDate(fieldName1, fieldName2) 
{
    var startDate = Xrm.Page.getAttribute(fieldName1).getValue();
    var endDate = Xrm.Page.getAttribute(fieldName2).getValue();
    if (startDate != null) 
    {
        if (endDate != null) 
        {
            if (startDate >= endDate)
            {
                Xrm.Page.getControl(fieldName2).setNotification("End Date should not be the same or less than the Start Date");
            }
            else
            {
                Xrm.Page.getControl(fieldName2).clearNotification();
            }
        }
        else
        {
            Xrm.Page.getControl(fieldName2).clearNotification();
        }
    }
    else
    {
        Xrm.Page.getControl(fieldName1).clearNotification();
    }
}

function restrictFutureYear('ndph_yearestablishedtext')
{
    var year = Xrm.Page.getAttribute('ndph_yearestablishedtext').getValue();
    var Date = new Date();
    var YearNow = Date.getFullYear();
    if (year > YearNow)
        {
            Xrm.Page.getControl('ndph_yearestablishedtext').setNotification("Please enter previous year");
        } 
    else
  	    {
   		    Xrm.Page.getControl('ndph_yearestablishedtext').clearNotification();
        }
}
     
