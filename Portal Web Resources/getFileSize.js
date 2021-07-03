$('#filer').bind('change', function() {
  //this.files[0].size gets the size of your file.
  //alert(this.files[0].size); // returns the file size in bytes
  let fileSizeInBytes = this.files[0].size;
  let fileSizeInMB = fileSizeInBytes / 1048576; // generates the file size into MB
  if(fileSizeInMB > 5000) {
    
  }
});