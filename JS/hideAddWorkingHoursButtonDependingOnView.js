function hideAddWorkingHoursButton(selectedCtrl) {       
  var urlParams = new URLSearchParams(Xrm.Page.getUrl());
  var viewId = urlParams.get("viewid").replace("{","").replace("}","");
  console.log("viewId: " + viewId);
    /*
    viewId: 61273827-328E-E011-95AE-00155D9CFA03
    */   
    
    if (viewId != 'B0CA9D10-977A-EB11-A812-000D3A8BEA6F') {
        return false;
    }
    else
        return true;
}

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

function hideNewAppointmentButton(selectedCtrl) {       
  var urlParams = new URLSearchParams(Xrm.Page.getUrl());
  var viewId = urlParams.get("viewid").replace("{","").replace("}","");
  console.log("viewId: " + viewId);
    /*
    viewId: 61273827-328E-E011-95AE-00155D9CFA03
    */   
    
    if (viewId == '21353D06-062F-4889-B4C2-C3DB40489871') {
        return false;
    }
    else
        return true;
}

function hideCreateWorkHourButton(selectedCtrl) {       
  var urlParams = new URLSearchParams(Xrm.Page.getUrl());
  var viewId = urlParams.get("viewid").replace("{","").replace("}","");
  console.log("viewId: " + viewId);
    /*
    viewId: 61273827-328E-E011-95AE-00155D9CFA03
    */   
    
    if (viewId != '21353D06-062F-4889-B4C2-C3DB40489871') {
        return false;
    }
    else
        return true;
}

// another function that works the same like the above 
function getURLViewID() {
  var urlParams = new URLSearchParams(window.location.href); // get the current url params
  var getTheParamYouWant = urlParams.get("viewid"); // view id is the example parameter
  console.log(getTheParamYouWant); // see results in console
}

// get View ID using url
function testButton(selectedCtrl) {          
  var urlParams = new URLSearchParams(Xrm.Page.getUrl());
  var viewId = urlParams.get("viewid").replace("{","").replace("}","")
  alert("viewId: " + viewId)
}




// hide button based on form name

// function HideButtonBasedOnForm() {
//   var formDetails = Xrm.Page.ui.formSelector.getCurrentItem;
//   var formLabel = formDetails.getLabel();
  
//   if (formLabel != 'Active Students - 2015') {
//   return false;
//   }
//   else
//   return true;
//   }
  

