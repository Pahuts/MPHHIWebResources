function restrictPrevious(fieldName, message) {
        var startDate = Xrm.Page.getAttribute(fieldName).getValue();
        var todayDate = new Date();
        var date = Xrm.Page.getAttribute(fieldName);
        todayDate.setHours(0,0,0);
        if ((date != null) && (startDate < todayDate))
            {
               Xrm.Page.getControl(fieldName).setNotification(message);
            }
            else
            {
               Xrm.Page.getControl(fieldName).clearNotification();
            }
}

function restrictEndDateLessthenStartDate() 
{
    var startDate = Xrm.Page.getAttribute('ndph_startdate').getValue();
    var endDate = Xrm.Page.getAttribute('ndph_enddate').getValue();
 if(endDate != null){
    if (endDate <= startDate)
        {
           Xrm.Page.getControl('ndph_enddate').setNotification("End date cannot be earlier than start date");
        }
        else
        {
           Xrm.Page.getControl('ndph_enddate').clearNotification();
        }
}
}