$(document).ready(function () {
  var appointmentType = $("#mphhi_appointmenttype").val(); // 205220000 - E-Consultation 205220001 - F2F

  if(appointmentType == 205220000 || appointmentType == 205220001) {
    $("#mphhi_diagnosticcenter_name").parent().parent().parent().hide();
    $("#mphhi_outpatientservice_name").parent().parent().parent().hide();
  }
});