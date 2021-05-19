function showProgressIndicator() {
  Xrm.Utility.showProgressIndicator("Loading...");
  setTimeout("Xrm.Utility.closeProgressIndicator()", 5000);
}