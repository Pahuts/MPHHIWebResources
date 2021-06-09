function hideDisburseButtonFromOtherViews(selectedCtrl) {
  var urlParams = new URLSearchParams(Xrm.Page.getUrl());
  var viewId = urlParams.get("viewid").replace("{","").replace("}","");
  console.log("viewId: " + viewId);
    /*
    viewId: 61273827-328E-E011-95AE-00155D9CFA03
    */   
    
    if (viewId != 'D406A965-BEB8-EB11-8236-00224823369C') {
        return false;
    }
    else
        return true;
}
  