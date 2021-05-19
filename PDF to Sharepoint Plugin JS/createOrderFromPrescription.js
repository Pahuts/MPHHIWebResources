function createOrderFromPrescription(primaryControl) {
    var formContext = primaryControl;

    // Define data for Pharmacy Order
    var orderData = {};
    orderData["mphhi_orderstatus"] = 205220000;
    orderData["mphhi_name"] = formContext.getAttribute("mphhi_eprescriptionname").getValue();
    orderData["mphhi_Patient@odata.bind"] = "/contacts(" + formContext.getAttribute("mphhi_patient").getValue()[0].id.slice(1,-1) + ")";
    orderData["mphhi_Appointment@odata.bind"] = "/msemr_appointmentemrs(" + formContext.getAttribute("mphhi_appointment").getValue()[0].id.slice(1,-1) + ")";
    orderData["mphhi_Prescription@odata.bind"] = "/mphhi_eprescriptions(" + formContext.data.entity.getId().slice(1,-1) + ")";

    // Run Web API query to get address fields from patient record
    var patientInfo = {};
    Xrm.WebApi.online.retrieveRecord("contact", formContext.getAttribute("mphhi_patient").getValue()[0].id.slice(1,-1),
    "?$select=address1_line1,address1_line2,_mphhi_address1barangay_value,_mphhi_address1city_value,_mphhi_address1stateprovince_value").then(
        function success(result) {
            patientInfo = result;
        },
        function(error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
    
    // Add address info to orderData object
    // Optimize this
    if (patientInfo._mphhi_address1stateprovince_value) {
        orderData["mphhi_DeliveryStateProvince@odata.bind"] = "/mphhi_states(" + patientInfo._mphhi_address1stateprovince_value + ")";
    }
    if (patientInfo._mphhi_address1city_value) {
        orderData["mphhi_DeliveryCity@odata.bind"] = "/mphhi_cities(" + patientInfo._mphhi_address1city_value + ")";
    }
    if (patientInfo._mphhi_address1barangay_value) {
        orderData["mphhi_DeliveryBarangay@odata.bind"] = "/mphhi_barangays(" + patientInfo._mphhi_address1barangay_value + ")";
    }
    if (patientInfo._mphhi_zipcode) {
        orderData["mphhi_DeliveryZIPCode@odata.bind"] = "/mphhi_zipcodes(" + patientInfo._mphhi_zipcode + ")";
    }
    if (patientInfo.address1_line1) {
        orderData["mphhi_deliverystreet1"] = patientInfo.address1_line1;
    }
    if (patientInfo.address1_line2) {
        orderData["mphhi_deliverystreet2"] = patientInfo.address1_line2;
    }

    // Create Pharmacy Order
    Xrm.WebApi.createRecord("mphhi_pharmacyorder", orderData).then(
        function success(result) {
            var pharmacyOrderID = result.id;     // Store ID of created record

            // Retrieve and Medication records
            Xrm.WebApi.online.retrieveRecord("mphhi_eprescription", formContext.data.entity.getId(),
            "?$select=mphhi_eprescriptionid&$expand=mphhi_mphhi_eprescription_msemr_medication_Prescription($select=mphhi_brandname,mphhi_dosage,mphhi_genericname,mphhi_quantity,mphhi_unit)")
                .then(                 
                function success(results) {

                    // Map attributes and create Medication Order for each retrieved Medication record
                    for (const medication of results.mphhi_mphhi_eprescription_msemr_medication_Prescription) {
                        var currentMedicationData = {};
                        currentMedicationData["mphhi_PharmacyOrder@odata.bind"] = "/mphhi_pharmacyorders(" + pharmacyOrderID +")";

                        // Map name based on whether medicine is branded or not
                        if (medication.mphhi_brandname) {
                            currentMedicationData["mphhi_name"] = medication.mphhi_brandname;
                        }
                        else {
                            currentMedicationData["mphhi_name"] = medication.mphhi_genericname;
                        }

                        currentMedicationData["mphhi_dosage"] = medication.mphhi_dosage + medication.mphhi_unit;
                        currentMedicationData["mphhi_quantity"] = medication.mphhi_quantity;

                        Xrm.WebApi.createRecord("mphhi_medicationorder", currentMedicationData);
                    }
                },
                function(error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
            
            Xrm.Navigation.navigateTo({
                pageType: "entityrecord",
                entityName: "mphhi_pharmacyorder",
                entityId: pharmacyOrderID,
            }).then(
                function success() {
                    formContext.ui.setFormNotification(
                        "Medication records may take a few moments to generate. If this is the case, please refresh the subgrid until all records are visible.", 
                        "INFO", 
                        "medicationRefreshNotif"
                    );
                },
                function error() {
                }
            );

        },
        function (error) {
            console.log(error.message);
        }
    );
}

function confirmOrder(primaryControl) {
    var formContext = primaryControl;

    var confirmStrings = {
        title: "Confirm order?",
        text: "NOTE: This will send an email notification to the customer. Please ensure that order details such as pricing have been updated before confirming."
    }
    Xrm.Navigation.openConfirmDialog(confirmStrings).then(
        function (success) {
            if (success.confirmed) {
                if (formContext.getAttribute("mphhi_paymentoption").getValue() == 205220001) {
                    formContext.getAttribute("mphhi_orderstatus").setValue(205220002);      // If pick-up, skip payment
                }
                else {
                    formContext.getAttribute("mphhi_orderstatus").setValue(205220001);
                }
                formContext.data.entity.save(saveOption);
            }
        }
    );
}

function markAsPaid(primaryControl) {
    var formContext = primaryControl;

    var confirmStrings = {
        title: "Mark as paid?",
        text: "This will update the order status to 'Preparing'."
    }
    Xrm.Navigation.openConfirmDialog(confirmStrings).then(
        function (success) {
            if (success.confirmed) {
                formContext.getAttribute("mphhi_orderstatus").setValue(205220002);
                formContext.data.entity.save(saveOption);
            }
        }
    );
}

function markAsReady(primaryControl) {
    var formContext = primaryControl;

    var confirmStrings = {
        title: "Mark as ready?",
        text: "This will send an email notification to the customer."
    }
    Xrm.Navigation.openConfirmDialog(confirmStrings).then(
        function (success) {
            if (success.confirmed) {
                formContext.getAttribute("mphhi_orderstatus").setValue(205220003);
                formContext.data.entity.save(saveOption);
            }
        }
    );
}

function markAsComplete(primaryControl) {
    var formContext = primaryControl;

    var confirmStrings = {
        title: "Mark as complete?",
        text: "This will close this order and make it read-only."
    }
    Xrm.Navigation.openConfirmDialog(confirmStrings).then(
        function (success) {
            if (success.confirmed) {
                formContext.getAttribute("mphhi_orderstatus").setValue(205220004);
                formContext.data.entity.save(saveOption);
                Xrm.WebApi.updateRecord("mphhi_pharmacyorder", formContext.data.entity.getId(), { statecode: 1 })
            }
        }
    );
}