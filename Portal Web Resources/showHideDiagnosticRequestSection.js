function hideDRSection(executionContext) {
  let formContext = executionContext.getFormContext();
  let createDRChecked = formContext.getAttribute("mphhi_creatediagnosticrequest").getValue();
  let drValidityDate = formContext.getAttribute("mphhi_diagnosticrequestvaliditydate").getValue();

  if(drValidityDate) {
    Xrm.Page.ui.tabs.get("Plan").sections.get("DiagnosticRequest").setVisible(true); // show section
  } else {
    Xrm.Page.ui.tabs.get("Plan").sections.get("DiagnosticRequest").setVisible(false); // hide section
  }
}