function restrictFuture(fieldName, message) {
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