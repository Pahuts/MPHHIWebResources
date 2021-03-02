function showHideSection(executionContext){
  var formContext = executionContext.getFormContext();
  var appointmentType = formContext.getAttribute("mphhi_appointmenttype").getValue();

  if (appointmentType != "" || appointmentType != null) {
    if (appointmentType == 205220002) {
      formContext.ui.tabs.get("tb_general").sections.get("tb_general_section_6").setVisible(true);
    } else {
      formContext.ui.tabs.get("tb_general").sections.get("tb_general_section_6").setVisible(false);
    }
  }
}
