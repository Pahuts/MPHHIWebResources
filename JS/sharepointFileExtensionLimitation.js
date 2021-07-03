  // Limit file types for sharepoint upload
  $("input[name='file']").attr("id","filer");// add id to the file button
  function fileValidation() {
  var fileInput = document.getElementById('filer');
  var filePath = fileInput.value;
  // Allowing file type   // /(\.doc|\.docx|\.xlsx|\.pdf|\.jpg|\.png|\.rtf|\.wps|\.wks|\.wpd)$/i;
  var allowedExtensions = /(\.doc|\.docx|\.xlsx|\.pdf|\.jpg|\.png)$/i;
  if (!allowedExtensions.exec(filePath)) {
      alert('Invalid file type');
      fileInput.value = '';
      return false;
    }
  }

$("#filer").change(fileValidation);
// end of file type limitation script