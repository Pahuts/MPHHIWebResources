function hideRibbonButtonIfRecordNotYetCreated(primaryControl) {
  var createdOn = primaryControl.getAttribute("mphhi_createdon").getValue();
    /*
    viewId: 61273827-328E-E011-95AE-00155D9CFA03
    */   
    
    if (createdOn) {
        return true;
    }
    else
        return false;
        
}