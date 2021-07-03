$(document).ready(function(){

    $(document).ready(function(){
      // calculate Age from Birth Date
      function calculateAge() {
        var bDate = $("#birthdate_datepicker_description").val();
        if(bDate){
          var bSplit = bDate.split("/"); // split values
          var birthMonth = parseInt(bSplit[0]);
          var birthDay = parseInt(bSplit[1]);
          var birthYear = parseInt(bSplit[2]);
          // get date today
          var dateToday = new Date();
          // get month
          var month = dateToday.getMonth();
          // get day
          var day = dateToday.getDate();
          // get year
          var year = dateToday.getFullYear();
        
          // parse date to int
          var monthInt = parseInt(month);
          var dayInt = parseInt(day);
          var yearInt = parseInt(year);
          if(birthYear <= yearInt) {
            $("#mphhi_ageportalwholenumber").parent().parent().parent().show();
            if(monthInt < birthMonth && dayInt < birthDay) {
              var getAge = yearInt - birthYear - 1;
              $("#mphhi_ageportalwholenumber").val(getAge);
            } else if (monthInt == birthMonth && dayInt < birthDay){
              var getAge = yearInt - birthYear - 1;
              $("#mphhi_ageportalwholenumber").val(getAge);
            } else if (monthInt == birthMonth && birthDay >= dayInt){
              var getAge = yearInt - birthYear;
              $("#mphhi_ageportalwholenumber").val(getAge);
            }else {
              var getAge = yearInt - birthYear;
              $("#mphhi_ageportalwholenumber").val(getAge);
            }
          }
          $("#mphhi_ageportalwholenumber").parent().parent().parent().hide(); // hide age field
          // disable age field
          // if(isNaN($("#mphhi_ageportal").val())) {
          //   $("#mphhi_ageportal").parent().parent().parent().hide();
          // } else {
          //   $("#mphhi_ageportal").parent().parent().parent().show();
          // }
        }

      }
      $("#mphhi_ageportalwholenumber").parent().parent().parent().hide(); // hide age field
      $("#birthdate_datepicker_description").change(calculateAge);
      // $("#birthdate").closest("div.control").on("dp.change", function() {alert("helo");}); // call date picker change event
      $("#birthdate").closest("div.control").on("dp.change", calculateAge);
      // end of age calculation
        //Insert CSS
        //$("input#governmentid").closest("td").css("padding-top", "20px");
        
        $('#mphhi_fromportal_1').prop('checked', true); //check 'yes' in From Portal field
    
        //Hide Dev Fields
            $("#mphhi_fromportal").parent().parent().hide();
            //$("#mphhi_password").parent().parent().hide();
            $("#adx_identity_newpassword").parent().parent().hide();
            
    
        //Custom Validation
        $('#mphhi_maritalstatus').change(function () 
        {
            if (($("#mphhi_maritalstatus").val() != '') || ($("#mphhi_maritalstatus").val() != null))
            {
                if (($("#mphhi_maritalstatus").val() == 205220001 ) || ($("#mphhi_maritalstatus").val() == 205220006)) 
                {
                    //show
                    $("#spousesname").closest("td").show();
                }
                else
                {
                    //hide
                    $("#spousesname").closest("td").hide(); q
                    //clear
                    $("#spousesname").val("");
                }
            }
            else
            {
                //hide
                $("#spousesname").closest("td").hide();
                //clear
                $("#spousesname").val("");
            }
        });
        //hide
        $("#spousesname").closest("td").hide();
    
        //START password on keyup 
        $('#mphhi_password').after('<div style="margin-top: 7px;" id="CheckPasswordStrength1"></div>');
        $('#CheckPasswordStrength1').after('<div style="" id="CheckPasswordStrength2"></div>');
        $('#CheckPasswordStrength2').after('<div style="" id="CheckPasswordStrength3"></div>');
        $('#CheckPasswordStrength3').after('<div style="" id="CheckPasswordStrength4"></div>');
        
        // $("#mphhi_password").on('keyup', function()
        // {
        //     var password = $("#mphhi_password").val();
        //     if ((password != null) || (password != ""))
        //     {
        //         //NEGATIVE
        //         // if (password.length < 7){
        //         //     $("#CheckPasswordStrength1").html("Password value should be greater than 7").css("color","red");
        //         // }
        //         // if (!passwordValue.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) // If password DOES NOT contain both lower and uppercase characters 
        //         // {
        //         //     $("#CheckPasswordStrength2").html("Password value should have both lowercase and uppercase characters").css("color","red");
        //         // }
        //         // if (!passwordValue.match(/([0-9])/))  // If password DOES NOT have 1 number
        //         // {
        //         //     $("#CheckPasswordStrength3").html("Password value should have 1 number").css("color","red");
        //         // }
        //         // if (!passwordValue.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) // If password DOES NOT have one special character 
        //         // {
        //         //     $("#CheckPasswordStrength4").html("Password value should have 1 special character").css("color","red");
        //         // }
        //         //NEGATIVE
    
        //         //POSITIVE
        //         // if (passwordValue.length >= 7) 
        //         // {
        //         //     $("#CheckPasswordStrength1").html("").css("display","none");
        //         // }
        //         // // If password contains both lower and uppercase characters 
        //         // if (passwordValue.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
        //         // {
        //         //     $("#CheckPasswordStrength2").html("").css("display","none"); 
        //         // } 
        //         // // If it has numbers and characters 
        //         // if (passwordValue.match(/([a-zA-Z])/) && passwordValue.match(/([0-9])/))
        //         // {
        //         //     $("#CheckPasswordStrength3").html("").css("display","none"); 
        //         // } 
        //         // If it has one special character  
        //         // if (passwordValue.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) 
        //         // {
        //         //     $("#CheckPasswordStrength4").html("").css("display","none");
        //         // }
        //         // //POSITIVE
        //         // else
        //         // {
        //         //     //$("#CheckPasswordStrength1").html("Password matched").css("color","green");
        //         //     //$("#CheckPasswordStrength1").html("").css("display","none");
        //         // }
        //     }
        //     else
        //     {
    
        //     }
        // });
    
        $("#mphhi_password").on('keyup', function() //Check if Password is greater than 7
        {
            var password = $("#mphhi_password").val();
            if ((password != null) || (password != ""))
            {
                if (password.length < 7){
                    $("#CheckPasswordStrength1").html("Password should be greater than 7").css("color","red");
                    $("#CheckPasswordStrength1").css("display","block");
                }
                else if (password.length >= 7) 
                {
                    $("#CheckPasswordStrength1").html("").css("display","none");
                }
                else
                {
                    $("#CheckPasswordStrength1").html("Password should be greater than 7").css("color","red");
                    $("#CheckPasswordStrength1").css("display","block");
                }
            }
        });
        $("#mphhi_password").on('keyup', function() // If password DOES NOT contain both lower and uppercase characters 
        {
            var password = $("#mphhi_password").val();
            if ((password != null) || (password != ""))
            {
                if (!password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
                    $("#CheckPasswordStrength2").html("Password should have both lowercase and uppercase characters").css("color","red");
                    $("#CheckPasswordStrength2").css("display","block");
                }
                else if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
                {
                    $("#CheckPasswordStrength2").html("").css("display","none");
                }
                else
                {
                    $("#CheckPasswordStrength2").html("Password should have both lowercase and uppercase characters").css("color","red");
                    $("#CheckPasswordStrength2").css("display","block");
                }
            }
        });
        
        $("#mphhi_password").on('keyup', function() // If password DOES NOT have 1 number
        {
            var password = $("#mphhi_password").val();
            if ((password != null) || (password != ""))
            {
                if (!password.match(/([0-9])/)){
                    $("#CheckPasswordStrength3").html("Password should have 1 number").css("color","red");
                    $("#CheckPasswordStrength3").css("display","block");
                }
                else if (password.match(/([0-9])/))
                {
                    $("#CheckPasswordStrength3").html("").css("display","none");
                }
                else
                {
                    $("#CheckPasswordStrength3").html("Password should have 1 number").css("color","red");
                    $("#CheckPasswordStrength3").css("display","block");
                }
            }
        });
    
        $("#mphhi_password").on('keyup', function() // If password DOES NOT have one special character 
        {
            var password = $("#mphhi_password").val();
            if ((password != null) || (password != ""))
            {
                if (!password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                    $("#CheckPasswordStrength4").html("Password should have 1 special character").css("color","red");
                    $("#CheckPasswordStrength4").css("display","block");
                }
                else if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))
                {
                    $("#CheckPasswordStrength4").html("").css("display","none");
                }
                else
                {
                    $("#CheckPasswordStrength4").html("Password should have 1 special character").css("color","red");
                    $("#CheckPasswordStrength4").css("display","block");
                }
            }
        });
        //END password on keyup 
    
        //START confirm password on keyup 
        $('#mphhi_confirmpassword').after('<div style="margin-top: 7px;" id="CheckPasswordMatch"></div>');
        
        $("#mphhi_confirmpassword").on('keyup', function()
        {
            var password = $("#mphhi_password").val();
            var confirmPassword = $("#mphhi_confirmpassword").val();
            if ((password != null) && (confirmPassword != null))
            {
                if (password != confirmPassword){
                    $("#CheckPasswordMatch").html("Password does not match").css("color","red");
                }
                else
                {
                    $("#CheckPasswordMatch").html("Password matched").css("color","green");
                }
            }
            else
            {
    
            }
        });
        $("#mphhi_password").on('keyup', function()
        {
            var password = $("#mphhi_password").val();
            var confirmPassword = $("#mphhi_confirmpassword").val();
            if ((password != null) && (confirmPassword != null))
            {
                if (password != confirmPassword){
                    $("#CheckPasswordMatch").html("Password does not match").css("color","red");
                }
                else
                {
                    $("#CheckPasswordMatch").html("Password matched").css("color","green");
                }
            }
            else
            {
    
            }
        });
        //END confirm password on keyup 
    
        //START mobile number validation
        $('#mobilephone').after('<div style="margin-top: 7px;" id="CheckCountryCode"></div>');
        //$("div:contains('Format: 63xxxxxxxxxx (639171234567)')").after('<div style="margin-top: 7px;" id="CheckCountryCode"></div>');
        // $('#CheckCountryCode').after('<div style="margin-top: 7px;" id="CheckIfNotNumber"></div>');
        // $('#CheckIfNotNumber').after('<div style="margin-top: 7px;" id="CheckIfNotNumber2"></div>');
        $('#CheckCountryCode').after('<div style="" id="CheckLength"></div>');
        $('#CheckLength').after('<div style="" id="CheckLengthBelow"></div>');
        $("#mobilephone").on('keyup', function() // If password DOES NOT have one special character 
        {
            var mobilenumber = $("#mobilephone").val();
            var first2 = mobilenumber.substr(0, 2);
        
            if ((mobilenumber != null) || (mobilenumber != ""))
            {
                if (first2 != 63) {
                    $("#CheckCountryCode").html("Mobile number should start with the value 63").css("color","red");
                    $("#CheckCountryCode").css("display","block");
                }
                else if (first2 == 63) {
                    $("#CheckCountryCode").html("").css("display","none");
                }
                else
                {
                    $("#CheckCountryCode").html("Mobile number should start with 63").css("color","red");
                    $("#CheckCountryCode").css("display","block");
                }
            }
        });
    
        // $("#mobilephone").on('keyup', function() // If mobile phone contains letters
        // {
        //     var mobilenumber = $("#mobilephone").val();
        //     if ((mobilenumber != null) || (mobilenumber != ""))
        //     {
        //         //if (mobilenumber.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
        //         if (mobilenumber.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
        //         {
        //             $("#CheckIfNotNumber").html("Mobile number should not contain letters").css("color","red");
        //             $("#CheckIfNotNumber").css("display","block");
        //         }
        //         else if (!mobilenumber.match(/([A-Z])/))
        //         {
        //             $("#CheckIfNotNumber").html("").css("display","none");
        //         }
        //         else
        //         {
        //             $("#CheckIfNotNumber").html("Mobile number should not contain letters").css("color","red");
        //             $("#CheckIfNotNumber").css("display","block");
        //         }
        //     }
        // });
    
        $('#mobilephone').on('keyup', function () { // prevent letters and special character input
            var c = this.selectionStart,
                r = /[^0-9]/gi,
                v = $(this).val();
            if (r.test(v)) {
                $(this).val(v.replace(r, ''));
                c--;
            }
            this.setSelectionRange(c, c);
        });
    
        // $("#mobilephone").on('keyup', function() // If mobile phone contains special characters
        // {
        //     var mobilenumber = $("#mobilephone").val();
        //     if ((mobilenumber != null) || (mobilenumber != ""))
        //     {
        //         if (mobilenumber.match(/([!,%,&,@,#,$,^,*,?,_,~])/))
        //         {
        //             $("#CheckIfNotNumber2").html("Mobile number should not contain special characters").css("color","red");
        //             $("#CheckIfNotNumber2").css("display","block");
        //         }
        //         else if (!mobilenumber.match(/([!,%,&,@,#,$,^,*,?,_,~])/))
        //         {
        //             $("#CheckIfNotNumber2").html("").css("display","none");
        //         }
        //         else
        //         {
        //             $("#CheckIfNotNumber2").html("Mobile number should not contain special characters").css("color","red");
        //             $("#CheckIfNotNumber2").css("display","block");
        //         }
        //     }
        // });
    
        $("#mobilephone").on('keyup', function() // If mobile phone exceeds 12 characters
        {
            var mobilenumber = $("#mobilephone").val();
            if ((mobilenumber != null) || (mobilenumber != ""))
            {
                if (mobilenumber.length > 12) {
                    $("#CheckLength").html("Mobile number should not exceed 12 numbers").css("color","red");
                    $("#CheckLength").css("display","block");
                }
                else if (mobilenumber.length < 12) {
                    $("#CheckLength").html("Mobile number should consist of 12 numbers").css("color","red");
                    $("#CheckLength").css("display","block");
                }
                else if (mobilenumber.length == 12) {
                    $("#CheckLength").html("").css("display","none");
                }
                // else
                // {
                //     $("#CheckLength").html("Mobile number should not exceed 12 numbers").css("color","red");
                //     $("#CheckLength").css("display","block");
                // }
            }
        });

        // $("#mobilephone").on('keyup', function() // If mobile phone is below 12 characters
        // {
        //     var mobilenumber = $("#mobilephone").val();
        //     if ((mobilenumber != null) || (mobilenumber != ""))
        //     {
        //         if (mobilenumber.length < 12) {
        //             $("#CheckLengthBelow").html("Mobile number should consist of 12 numbers").css("color","red");
        //             $("#CheckLengthBelow").css("display","block");
        //         }
        //         else if (mobilenumber.length == 12) {
        //             $("#CheckLengthBelow").html("").css("display","none");
        //         }
        //         else
        //         {
        //             $("#CheckLengthBelow").html("Mobile number should consist of 12 numbers").css("color","red");
        //             $("#CheckLengthBelow").css("display","block");
        //         }
        //     }
        // });
        //END mobile number validation
        
        //START name fields auto capitalization of first letter
        $('#lastname').on('keydown', function(event) {
            if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
               var $t = $(this);
               event.preventDefault();
               var char = String.fromCharCode(event.keyCode);
               $t.val(char + $t.val().slice(this.selectionEnd));
               this.setSelectionRange(1,1);
            }
        });
        $('#firstname').on('keydown', function(event) {
            if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
               var $t = $(this);
               event.preventDefault();
               var char = String.fromCharCode(event.keyCode);
               $t.val(char + $t.val().slice(this.selectionEnd));
               this.setSelectionRange(1,1);
            }
        });
        $('#middlename').on('keydown', function(event) {
            if (this.selectionStart == 0 && event.keyCode >= 65 && event.keyCode <= 90 && !(event.shiftKey) && !(event.ctrlKey) && !(event.metaKey) && !(event.altKey)) {
               var $t = $(this);
               event.preventDefault();
               var char = String.fromCharCode(event.keyCode);
               $t.val(char + $t.val().slice(this.selectionEnd));
               this.setSelectionRange(1,1);
            }
        });
        //END name fields auto capitalization of first letter
    
        //START of Field Validations
            //start birthday validation
            if (typeof (Page_Validators) == 'undefined') return;
            // Date of birth validator: disallow future date
            var dateOfBirthValidator = document.createElement('span');
            dateOfBirthValidator.style.display = "none";
            dateOfBirthValidator.id = "birthdateValidator";
            dateOfBirthValidator.controltovalidate = "birthdate";
            dateOfBirthValidator.errormessage = "<a href='#birthdate'>Birthday cannot be set to a future date.</a>";
            dateOfBirthValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
            dateOfBirthValidator.initialvalue = "";
            dateOfBirthValidator.evaluationfunction = function () {
                var currentDate = new Date();
                var dateOfBirth = $("#birthdate").val();
                if (dateOfBirth) {
                    dateOfBirth = new Date(dateOfBirth);      // Convert to Date object if filled in
                }
                if ((dateOfBirth == "") || (dateOfBirth < currentDate)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            // Password: strong password
            var passwordValidator = document.createElement('span');
            passwordValidator.style.display = "none";
            passwordValidator.id = "mphhi_passwordValidator";
            passwordValidator.controltovalidate = "mphhi_password";
            passwordValidator.errormessage = "<a href='#mphhi_password'>Password should be strong.</a>";
            passwordValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
            passwordValidator.initialvalue = "";
            passwordValidator.evaluationfunction = function () {
                var passwordValue = $("#mphhi_password").val();
                var strength = 0  
                if (passwordValue.length < 7) {  
                    passwordValidator.errormessage = "<a href='#mphhi_password'>Password value should be greater than 7.</a>";
                    return false;
                }  
                if (passwordValue.length >= 7) 
                {
                    strength = strength + 1;  
                }
                // If password contains both lower and uppercase characters, increase strength value.  
                if (passwordValue.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
                {
                    strength = strength + 1;  
                } 
                    // If password DOES NOT contain both lower and uppercase characters  
                    if (!passwordValue.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
                    {
                        passwordValidator.errormessage = "<a href='#mphhi_password'>Password value should have both lowercase and uppercase characters.</a>";
                        return false;
                    } 
                // If it has numbers and characters, increase strength value.  
                if (passwordValue.match(/([a-zA-Z])/) && passwordValue.match(/([0-9])/))
                {
                    strength = strength + 1;  
                } 
                    // If it DOES NOT have 1 number
                    if (!passwordValue.match(/([0-9])/))
                    {
                        passwordValidator.errormessage = "<a href='#mphhi_password'>Password value should have atleast 1 number.</a>";
                        return false;
                    } 
                // If it has one special character, increase strength value.  
                if (passwordValue.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) 
                {
                    strength = strength + 1;  
                }
                    // If it DOES NOT have one special character 
                    if (!passwordValue.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) 
                    {
                        passwordValidator.errormessage = "<a href='#mphhi_password'>Password value should have atleast 1 special character.</a>";
                        return false;
                    }
                // if (strength < 4) {  
                //     passwordValidator.errormessage = "<a href='#mphhi_password'>Password value should have atleast 7 Characters with 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Character.</a>";
                //     return false; 
                // } 
                else if (strength >= 4) {  
                    return true;
                } 
                else 
                {
                    return false;
                }
            };
            // Confirm Password Validation
            var confirmPasswordValidator = document.createElement('span');
            confirmPasswordValidator.style.display = "none";
            confirmPasswordValidator.id = "mphhi_confirmpasswordValidator";
            confirmPasswordValidator.controltovalidate = "mphhi_confirmpassword";
            confirmPasswordValidator.errormessage = "<a href='#mphhi_confirmpassword'>Password and Confirm Password field does not match.</a>";
            confirmPasswordValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
            confirmPasswordValidator.initialvalue = "";
            confirmPasswordValidator.evaluationfunction = function () {
                var passwordValue = $("#mphhi_password").val();
                var confirmPasswordValue = $("#mphhi_confirmpassword").val();
                if (passwordValue != confirmPasswordValue)
                {
                    return false;
                }
                else
                {
                    return true;
                }
        
            };

            // Mobile Number Validation for country code
            var mobileNumbercountrycodeValidator = document.createElement('span');
            mobileNumbercountrycodeValidator.style.display = "none";
            mobileNumbercountrycodeValidator.id = "mobilephoneValidator";
            mobileNumbercountrycodeValidator.controltovalidate = "mobilephone";
            mobileNumbercountrycodeValidator.errormessage = "<a href='#mobilephone'>Mobile number should start with 63</a>";
            mobileNumbercountrycodeValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
            mobileNumbercountrycodeValidator.initialvalue = "";
            mobileNumbercountrycodeValidator.evaluationfunction = function () {
                var mobilenumber = $("#mobilephone").val();
                var first2 = mobilenumber.substr(0, 2);
            
                if ((mobilenumber != null) || (mobilenumber != ""))
                {
                    if (first2 != 63) {
                        return false;
                    }
                    else if (first2 == 63) {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
        
            };

            // Mobile Number Validation for length
            var mobileNumberLengthValidator = document.createElement('span');
            mobileNumberLengthValidator.style.display = "none";
            mobileNumberLengthValidator.id = "mobilephoneValidator";
            mobileNumberLengthValidator.controltovalidate = "mobilephone";
            mobileNumberLengthValidator.errormessage = "<a href='#mobilephone'>Mobile number should not exceed 12 characters</a>";
            mobileNumberLengthValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
            mobileNumberLengthValidator.initialvalue = "";
            mobileNumberLengthValidator.evaluationfunction = function () {
                var mobilenumber = $("#mobilephone").val();
            
                if ((mobilenumber != null) || (mobilenumber != ""))
                {
                    if (mobilenumber.length > 12) {
                        return false;
                    }
                    else if (mobilenumber.length <= 12) {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            };

            // Mobile Number Validation for length
            var mobileNumberLengthBelowValidator = document.createElement('span');
            mobileNumberLengthBelowValidator.style.display = "none";
            mobileNumberLengthBelowValidator.id = "mobilephoneValidator";
            mobileNumberLengthBelowValidator.controltovalidate = "mobilephone";
            mobileNumberLengthBelowValidator.errormessage = "<a href='#mobilephone'>Mobile number should consist of 12 characters</a>";
            mobileNumberLengthBelowValidator.validationGroup = "";        // Set this if you have set ValidationGroup on the form
            mobileNumberLengthBelowValidator.initialvalue = "";
            mobileNumberLengthBelowValidator.evaluationfunction = function () {
                var mobilenumber = $("#mobilephone").val();
            
                if ((mobilenumber != null) || (mobilenumber != ""))
                {
                    if (mobilenumber.length < 12) {
                        return false;
                    }
                    else if (mobilenumber.length == 12) {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            };
    
            // Add the new validator to the page validators array:
            Page_Validators.push(dateOfBirthValidator);
            Page_Validators.push(passwordValidator);
            Page_Validators.push(confirmPasswordValidator);
            Page_Validators.push(mobileNumbercountrycodeValidator);
            Page_Validators.push(mobileNumberLengthValidator);
            Page_Validators.push(mobileNumberLengthBelowValidator);
            
            
            // Wire-up the click event handler of the validation summary link
            $("a[href='#birthdate']").on("click", function () { scrollToAndFocus('birthdate'); });
            $("a[href='#mphhi_password']").on("click", function () { scrollToAndFocus('mphhi_password'); });
            $("a[href='#mphhi_confirmpassword']").on("click", function () { scrollToAndFocus('mphhi_confirmpassword'); });
            $("a[href='#mobilephone']").on("click", function () { scrollToAndFocus('mobilephone'); });
        //END of Field Validations
    
        // Start of Region Autopopulation
            //===========================================================================================================================================================================
        // OData query for region - Autopopulate Region
        var region = [];
        var statesServicesURL = "~/_odata/States";
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: statesServicesURL,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            async: false,
            success: function(data, textStatus, xhr) {
              region = region.concat(data.value);
              statesServicesURL = data["odata.nextLink"];
            }
        });
    
      //  Autopopulate region field
      // GET ODATA RESULT BEFORE EXECUTING
      $("#mphhi_address1stateprovince").change( 
          function() {
              var selectedState = {};
              selectedState = region.find(
                  function(regionObject) {
                    // return (dateObject.mphhi_date.match("^" + preferredDate) && dateObject.mphhi_doctor.Id == $("#mphhi_preferreddoctor").val());
                    return ($("#mphhi_address1stateprovince").val() == regionObject.mphhi_stateid);
                  }
              );
              if (selectedState) {
                // autopopulate Region field
                console.log(selectedState.mphhi_region);
                console.log(selectedState.mphhi_region["Id"]); // get id of region
                console.log(selectedState.mphhi_region["Name"]); // get name of region
                $("#mphhi_region").val(selectedState.mphhi_region["Id"]); // id of region
                $("#mphhi_region_name").val(selectedState.mphhi_region["Name"]); // name of region
                $("#mphhi_region_entityname").val("mphhi_region"); // entityname of region
              }
              else {
                // $("#mphhi_timeslotdate").val("").change();
                // clear region lookup
                $("#mphhi_region").val(""); // id of region
                $("#mphhi_region_name").val(""); // name of region
                $("#mphhi_region_entityname").val(""); // entityname of region
                // clear city lookup
                $("#mphhi_address1city").val(""); // id of region
                $("#mphhi_address1city_name").val(""); // name of region
                $("#mphhi_address1city_entityname").val(""); // entityname of region
                // clear barangay
                $("#mphhi_address1barangay").val(""); // id of region
                $("#mphhi_address1barangay_name").val(""); // name of region
                $("#mphhi_address1barangay_entityname").val(""); // entityname of region
              }
          }
      );
      // End of Autopopulate Function
      // disable region lookup
      $("#mphhi_region_name").parent().find('.input-group-btn').hide(); 
      // =======================================================================================================================================================================
      // autopopulate country
      if($("#mphhi_address1countryregion_name" == null) || $("#mphhi_address1countryregion_name" == "")) {
        $("#mphhi_address1countryregion_name").attr("value","Philippines");
        $("#mphhi_address1countryregion").attr("value","fbd569a5-30b1-eb11-8236-000d3a54b303");
        $("#mphhi_address1countryregion_entityname").attr("value","mphhi_country");
      }
    
    
      //CSS Scripts
      $('div[data-name="{9748ec98-3746-40cc-83bf-d15c7363166f}"]').css('padding', '10px');
    
      $("#mphhi_corporateuser_label").hide(); //hide corporate user field label
      $('fieldset[aria-label="Account Type"]').find('legend[class="section-title"]').append('<div class="description below" style="color: #666;">Please select the type of user account you want to register</div>');
    
      //append div to insert NO radio button
      $("#mphhi_corporateuser").append('<div class="radioCustom" style="width: 45%; float: left; padding: 10px 20px; margin-left:2.5%;" id="corporateuser_no_div"></div>'); 
      $("#mphhi_corporateuser_0").appendTo('#corporateuser_no_div'); //No button
      $('label[for="mphhi_corporateuser_0"]').appendTo('#corporateuser_no_div'); //No label
      $('label[for="mphhi_corporateuser_0"]').html('Personal User Account'); // relabel No
      $('label[for="mphhi_corporateuser_0"]').append('<div class="description below" style="color: #666;">(Register account for personal use)</div>');
    
      //append div to insert NO radio button  
      $("#mphhi_corporateuser").append('<div class="radioCustom" style="width: 45%; float: right; padding: 10px 20px; margin-right:2.5%;" id="corporateuser_yes_div"></div>'); 
      $("#mphhi_corporateuser_1").appendTo('#corporateuser_yes_div'); //Yes button
      $('label[for="mphhi_corporateuser_1"]').appendTo('#corporateuser_yes_div'); //Yes label
      $('label[for="mphhi_corporateuser_1"]').html('Corporate User Account'); // relabel Yes
      $('label[for="mphhi_corporateuser_1"]').append('<div class="description below" style="color: #666;">(Register account for corporate use)</div>');
    });

//   // i agree to the telemed conditions
  $("#mphhi_iagreetothetelemedconditions_label").closest("td").show();
  $("#mphhi_iagreetothetelemedconditions_label").html("I agree with the conditions on the <a href='/privacy-policy' target='_blank'>Telemed Data Privacy Policy</a>.");

    // Enable/disable Submit button based on whether agreement has been accepted
    $("#mphhi_iagreetothetelemedconditions").change(
        function() {
            if ($("#mphhi_iagreetothetelemedconditions").prop("checked")) {
                $("#InsertButton").prop("disabled", false);
            }
            else {
                $("#InsertButton").prop("disabled", true);
            }
        }
    );
    $("#mphhi_iagreetothetelemedconditions").change();

    //add cancel button
    $('#InsertButton').after('<button id="cancel" type="cancel" style="float:right;margin-right: 10px;" class="submit-btn btn btn-default form-action-container-left" form="localAccountForm"><a style="color: #5BBA47!important; text-decoration: none;" class="button-link" href="https://mphhi-dev-us.powerappsportals.com/">Cancel</a></button>');
    
    //birthday validation
    var d = new Date();

    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = ((''+month).length<2 ? '0' : '') + month + '/' +
        ((''+day).length<2 ? '0' : '') + day + '/' + 
        d.getFullYear();

    $("#birthdate").siblings(".datetimepicker").data("DateTimePicker").maxDate(output);
});