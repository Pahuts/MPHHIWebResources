function HideSubscriptionSubGridAddNewButton() {  

   var entityType =Xrm.Page.data.entity.getEntityName();  //Entity which you want to hide the button of subgrid

   if (entityType == "subscription") {  

       return false;

   }

   else {

       return true;

   }

}