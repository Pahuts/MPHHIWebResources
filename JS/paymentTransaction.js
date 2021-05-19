$(document).ready(function() {

	var firstname = $("#mphhi_patientfirstname").val();
	var middlename = $("#mphhi_patientmiddlename").val();
	var lastname = $("#mphhi_patientlastname").val();
	var mobilephone = $("#mphhi_patientmobilephone").val();
	var email = $("#mphhi_patientemail").val();
	var amount = $("#mphhi_amount").val(); //amount field
	var amountDEV = $("#mphhi_amountdev").val(); //amount dev field
	var amountDEV2 = $("#mphhi_amountnumberdev").val(); //amount dev field for whole number
	var paymentid = $("#mphhi_paymentid").val(); 
	//var description = $("#mphhi_descriptionofpayment").val();
	var description = $("#mphhi_descriptionofpayment option:selected").text();
	var paymenttransacGUID = $("#mphhi_paymenttransactionguid").val(); //get guid
	//'"firstName": "' + $("#mphhi_patientfirstname").val() + '",' +

	// var body = '{ "totalAmount": { ' +
	// '  "currency": "PHP",' +
	// ' "value": "' + amountDEV2 + '",' +
	// ' "details": {' +
	// ' "discount": "0.00",' +
	// ' "serviceCharge": "0.00",' +
	// '"shippingFee": "0.00",' +
	// '"tax": "0.00",' +
	// //'"subtotal": "0.00"}' +
	// '"subtotal": "' + amountDEV2 + '"' +
	// '},' +
	// '"buyer": {' +
	// '"firstName": "' + firstname + '",' +
	// '"middleName": "' + middlename + '",' +
	// '"lastName": "' + lastname + '",' +
	// '"contact": {' +
	// '"phone": "' + mobilephone + '",' +
	// '"email": "' + email + '"' +
	// '},' +
	// '"shippingAddress": {' +
	// '"line1": "28th floor 88 Corporate Center",' +
	// '"line2": "Valero corner Sedeno Streets Salcedo Village",' +
	// '"city": "Makati City",' +
	// '"state": "Metro Manila",' +
	// '"zipCode": "1227",' +
	// '"countryCode": "PH"' +
	// '},' +
	// '"billingAddress": {' +
	// '"line1": "28th floor 88 Corporate Center",' +
	// '"line2": "Valero corner Sedeno Streets Salcedo Village",' +
	// '"city": "Makati City",' +
	// '"state": "Metro Manila",' +
	// '"zipCode": "1227",' +
	// '"countryCode": "PH"' +
	// '}' +
	// //'"ipAddress": "125.60.148.241"'+
	// '},' +
	// '"items": [' +
	// '{"name": "' + description + '",' +
	// '"code": "CVG-096732",' +
	// '"description": "' + description + '",' +
	// '"quantity": "1",' +
	// '"amount": {' +
	// '"value": "150.00",' +
	// '"details": {' +
	// '"discount": "0.00",' +
	// //'"subtotal": "150.00"' +
	// '"subtotal": "' + amountDEV2 + '"' +
	// '}' +
	// '},' +
	// '"totalAmount": {' +
	// '"value": "' + amountDEV2 + '",' +
	// '"details": {' +
	// '"discount": "0.00",' +
	// '"subtotal": "' + amountDEV2 + '"' +
	// '}' +
	// '}' +
	// //'},' +
	// '}' +
	// '],' +
	// '"redirectUrl": {' +
	// '"success": "https://mphhi-dev-us.powerappsportals.com/payment_success_page/",' + 
	// //'"failure": "http://www.askthemaya.com/failure?id=6319921",' + 
	// '"failure": "https://mphhi-dev-us.powerappsportals.com/payment_failed_page/",' + 
	// //'"cancel": "http://www.askthemaya.com/cancel?id=6319921"' + 
	// '"cancel": "https://mphhi-dev-us.powerappsportals.com/payment_canceled_page/"' + 
	// '},' +
	// '"requestReferenceNumber": "' + paymentid + '",' +
	// '"metadata": {}' +
	// '}' +
	// '}';

	var body = '{ "totalAmount": { ' +
	'  "currency": "PHP",' +
	' "value": "' + amountDEV2 + '",' +
	'},' +
	'"buyer": {' +
	'"firstName": "' + firstname + '",' +
	'"middleName": "' + middlename + '",' +
	'"lastName": "' + lastname + '",' +
	'"contact": {' +
	'"phone": "' + mobilephone + '",' +
	'"email": "' + email + '"' +
	'},' +
	'},' +
	'"items": [' +
	'{"name": "' + description + '",' +
	'"code": "CVG-096732",' +
	'"description": "' + description + '",' +
	'"amount": {' +
	'"value": "' + amountDEV2 + '",' +
	'"details": {' +
	//'"discount": "100.00",' +
	'"subtotal": "' + amountDEV2 + '"' +
	'}' +
	'},' +
	'"totalAmount": {' +
	'"value": "' + amountDEV2 + '",' +
	'"details": {' +
	'"discount": "0.00",' +
	'"subtotal": "' + amountDEV2 + '"' +
	'}' +
	'}' +
	'}' +
	'],' +
	'"redirectUrl": {' +
	'"success": "https://mphhi-dev-us.powerappsportals.com/success/?id=' + paymenttransacGUID + '",' +
	'"failure": "https://mphhi-dev-us.powerappsportals.com/payment_failed_page/",' +
	'"cancel": "https://mphhi-dev-us.powerappsportals.com/payment_canceled_page/"' +
	'},' +
	'"requestReferenceNumber": "' + paymentid + '",' +
	'"metadata": {}' +
	'}';

	var tn = "sampltxnid001";
	var dragonpayBody = '{' +
			'"txnid":"' + paymentid + '",' +
			'"Amount": "' + amountDEV2 + '",' +
			'"Currency": "PHP",' +
			'"Description": "' + description + '",' +
			'"Email": "' + email + '"' +
			'}';

	$("#apiButton").click(function(){
			var paymentChannel = $("#mphhi_paymentchannel").val();
			//GUID OF Paymaya: 3a148ce7-0598-eb11-b1ac-000d3a4d7f27
			//GUID Of Dragonpay: 3f609b07-0698-eb11-b1ac-000d3a4d7f27
			if (paymentChannel == '3a148ce7-0598-eb11-b1ac-000d3a4d7f27')
			{
					paymaya(body);
			}
			else if (paymentChannel == '3f609b07-0698-eb11-b1ac-000d3a4d7f27')
			{
					dragonpay(dragonpayBody);
			}
	});
}); 

function dragonpay (details) {
	const endpoint = 'https://prod-02.westus.logic.azure.com:443/workflows/d6a2801312064f02813f1cbe8233f171/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BRaPCE4B4kNVJpkUr7ANxj9motsZiiFR0dkc4jfpoWw'
	fetch(endpoint, {
			"method": "POST",
			"dataType": "json",
			"headers": new Headers({
					"Content-Type": "application/json"
			}),
			body: details
	}).then(response => response.json())
			.then(json => {
					console.log(json);
					var checkoutId = json.RefNo;
					window.location.href = json.Url;
			})
			.catch(function (err) {
					console.log(err);
			})
}

function paymaya (details) {
	const endpoint = 'https://prod-44.westus.logic.azure.com:443/workflows/2bd43b5efff84f1bbaca965964ed295d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UqCiZkFtfb4mIEN0g6qbpclzb60vZ7Pzmvo2esskfuE'
	fetch(endpoint, {
			"method": "POST",
			"dataType": "json",
			"headers": new Headers({
					"Content-Type": "application/json"
			}),
			body: details
	}).then(response => response.json())
			.then(json => {
					console.log(json);
					var checkoutId = json.checkoutId;
					window.location.href = json.redirectUrl;
			})
			.catch(function (err) {
					console.log(err);
			})
			
}
