$(document).ready(function() {

	// get payment status from url
	// Get the query string from the URL
	var queryString = window.location.search;
	queryString = queryString.substring(1);

	// Parse the query string and assign parameters to "params" object
	var queries = queryString.split("&");
	var params = {};
	var query;
	for (var i = 0; i < queries.length; ++i) {
			query = queries[i].split("=");
			params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
	}

	var paymentID = params["id"];
	console.log("Payment ID: " + paymentID);


	var firstname = $("#mphhi_patientfirstname").val();
	var middlename = $("#mphhi_patientmiddlename").val();
	var lastname = $("#mphhi_patientlastname").val();
	var mobilephone = $("#mphhi_patientmobilephone").val();
	var email = $("#mphhi_patientemail").val();
	var amount = $("#mphhi_amount").val(); //amount field
	var amountDEV = $("#mphhi_amountdev").val(); //amount dev field
	var paymentid = $("#mphhi_paymentid").val();
	//var description = $("#mphhi_descriptionofpayment").val();
	var description = $("#mphhi_descriptionofpayment option:selected").text();
	
	//'"firstName": "' + $("#mphhi_patientfirstname").val() + '",' +

	var body = '{ "totalAmount": { ' +
	'  "currency": "PHP",' +
	' "value": "' + amountDEV + '",' +
	' "details": {' +
	' "discount": "0.00",' +
	' "serviceCharge": "0.00",' +
	'"shippingFee": "0.00",' +
	'"tax": "0.00",' +
	'"subtotal": "0.00"}' +
	'},' +
	'"buyer": {' +
	'"firstName": "' + firstname + '",' +
	'"middleName": "' + middlename + '",' +
	'"lastName": "' + lastname + '",' +
	'"contact": {' +
	'"phone": "' + mobilephone + '",' +
	'"email": "' + email + '"' +
	'},' +
	'"shippingAddress": {' +
	'"line1": "28th floor 88 Corporate Center",' +
	'"line2": "Valero corner Sedeno Streets Salcedo Village",' +
	'"city": "Makati City",' +
	'"state": "Metro Manila",' +
	'"zipCode": "1227",' +
	'"countryCode": "PH"' +
	'},' +
	'"billingAddress": {' +
	'"line1": "28th floor 88 Corporate Center",' +
	'"line2": "Valero corner Sedeno Streets Salcedo Village",' +
	'"city": "Makati City",' +
	'"state": "Metro Manila",' +
	'"zipCode": "1227",' +
	'"countryCode": "PH"' +
	'}' +
	//'"ipAddress": "125.60.148.241"'+
	'},' +
	'"items": [' +
	'{"name": "' + description + '",' +
	'"code": "CVG-096732",' +
	'"description": "' + description + '",' +
	'"quantity": "1",' +
	'"amount": {' +
	'"value": "150.00",' +
	'"details": {' +
	'"discount": "0.00",' +
	'"subtotal": "150.00"' +
	'}' +
	'},' +
	'"totalAmount": {' +
	'"value": "' + amountDEV + '",' +
	'"details": {' +
	'"discount": "0.00",' +
	'"subtotal": "' + amountDEV + '"' +
	'}' +
	'}' +
	'},' +
	// '{' +
	// '"name": "Booking Fee",' +
	// '"code": "CVR-096RE2",' +
	// '"description": "Booking and miscellaneous fee",' +
	// '"quantity": "1",' +
	// '"amount": {' +
	// '"value": "0.00"' +
	// '},' +
	// '"totalAmount": {' +
	// '"value": "0.00"' +
	// '}' +
	// '}' +
	'],' +
	'"redirectUrl": {' +
	'"success": "https://mphhi-dev-us.powerappsportals.com/payment_success_page/?id='+ +'&paymentstatus=935000000",' +
	//'"failure": "http://www.askthemaya.com/failure?id=6319921",' +
	'"failure": "https://mphhi-dev-us.powerappsportals.com/payment_failed_page/",' +
	//'"cancel": "http://www.askthemaya.com/cancel?id=6319921"' +
	'"cancel": "https://mphhi-dev-us.powerappsportals.com/payment_canceled_page/"' +
	'},' +
	'"requestReferenceNumber": "' + paymentid + '",' +
	'"metadata": {}' +
	'}';

	//var tn = "sampltxnid001";
	var dragonpayBody = '{' +
			//'"txnid":"' + tn + '",' +
			'"txnid":"' + paymentid + '",' +
			'"Amount": "' + amountDEV + '",' +
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

	// //hide dev fields
	// $("#mphhi_patientfirstname").parent().parent().hide(); 
	// $("#mphhi_patientmiddlename").parent().parent().hide();
	// $("#mphhi_patientlastname").parent().parent().hide();
	// $("#mphhi_patientemail").parent().parent().hide();
	// $("#mphhi_patientmobilephone").parent().parent().hide();
	// $("#mphhi_amountdev").parent().parent().hide();
	
	// //disable fields to make them as 'read only'

	//     //payment channel lookup
	// $("#mphhi_paymentchannel").prop('disabled', true);
	// $("#mphhi_paymentchannel_name").parent().find('.input-group-btn').hide();
	// $("#mphhi_paymentchannel_name").parent().css({"width":"100%"});
	// $("#mphhi_paymentchannel_name").css({"cursor": "not-allowed"});
	//     //date and time
	// $("#mphhi_paymentdateandtime_datepicker_description").parent().find('.form-control').prop('disabled', true);
	// $("#mphhi_paymentdateandtime").parent().find('.input-group-addon').hide();
	// $("#mphhi_paymentdateandtime_datepicker_description").parent().css({"width":"100%"});
	//     //amount
	// $("#mphhi_amount").prop('disabled', true);
	//     //transaction id
	// $("#mphhi_paymentid").prop('disabled', true);
	//     //payment reference
	// $("#mphhi_paymentreference").prop('disabled', true);
	//     //description of payment
	// $("#mphhi_descriptionofpayment").prop('disabled', true);
}); 

function dragonpay (details) {
	const endpoint = 'https://prod-02.westus.logic.azure.com:443/workflows/d6a2801312064f02813f1cbe8233f171/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BRaPCE4B4kNVJpkUr7ANxj9motsZiiFR0dkc4jfpoWw'
	// const subscriptionkey   ='349fd306896149f587fb3a883f4ae4ee'; 
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
	// const subscriptionkey   ='349fd306896149f587fb3a883f4ae4ee'; 
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
