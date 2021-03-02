function allNumeric(executionContext) {    
	var formContext = executionContext.getFormContext();    
	var tinNumber = formContext.getAttribute("mphhi_tin").getValue();
	var regex = /^[0-9-+()]*$/;

	if (tinNumber  != "" || tinNumber != null) {
		if (!tinNumber.match(regex)) {
			formContext.ui.setFormNotification("Please enter only numbers for the TIN",  "ERROR", "1");
			executionContext.getEventArgs().preventDefault();
			} else if (tinNumber.length < 12) {
				formContext.ui.setFormNotification("TIN should be 12 numbers",  "ERROR", "2");
				executionContext.getEventArgs().preventDefault();
				}	else {
						formContext.ui.clearFormNotification("1");
						formContext.ui.clearFormNotification("2");
						formContext.ui.clearFormNotification("3");
					}
	}
	else {        
		formContext.ui.clearFormNotification("1");
		formContext.ui.clearFormNotification("2");
		formContext.ui.clearFormNotification("3");
	}

	if (tinNumber  != "" || tinNumber != null) {
		var parts = tinNumber.match(/.{1,3}/g);
		var new_value = parts.join("-");
		formContext.getAttribute("mphhi_tin").setValue(new_value);
	}
}
