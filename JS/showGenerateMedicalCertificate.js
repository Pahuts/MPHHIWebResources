function showMedicalCertificate(formContext){
  var medicalCertificateRequested = formContext.getAttribute("mphhi_medicalcertificaterequested").getValue();
    if(medicalCertificateRequested != true){
      return false;
    }
    else {
      return true;
    }
 }