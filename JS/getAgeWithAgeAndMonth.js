function getAge(executionContext) {
  var formContext = executionContext.getFormContext();
  var dateOfBirth = formContext.getAttribute("mphhi_dateofbirth").getValue();
  var ageToday = formContext.getAttribute("mphhi_dateofbirth").getValue();
  var ageInDays = formContext.getAttribute("mphhi_dateofbirth").getValue();
  var ageInMonths = formContext.getAttribute("mphhi_dateofbirth").getValue();
  if(dateOfBirth) {
    var dateString = dateOfBirth.toLocaleDateString();
    var dob = dateString.split("/"); 
    var yearDob = parseInt(dob[2]);
    var monthDob = parseInt(dob[0]);
    var dateDob = parseInt(dob[1]);

    var now = new Date().toLocaleDateString();
    var today = now.split("/");
  
    var yearNow = parseInt(today[2]);
    var monthNow = parseInt(today[0]);
    var dateNow = parseInt(today[1]);
  
    // alert(yearNow +" " + monthNow + " " + dateNow);
  
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";
  
    if (yearDob <= yearNow) {
      yearAge = yearNow - yearDob;
      // Calculate age of patient
      if (monthNow >= monthDob)
        var monthAge = monthNow - monthDob;
      else {
        yearAge--;
        var monthAge = 12 + monthNow -monthDob;
      }
    
      if (dateNow >= dateDob)
        var dateAge = dateNow - dateDob;
      else {
        monthAge--;
        var dateAge = 31 + dateNow - dateDob;
    
        if (monthAge < 0) {
          monthAge = 11;
          yearAge--;
        }
      }
    
      age = {
          years: yearAge,
          months: monthAge,
          days: dateAge
          };
    
      if ( age.years > 1 ) yearString = " years";
      else yearString = " year";
      if ( age.months> 1 ) monthString = " months";
      else monthString = " month";
      if ( age.days > 1 ) dayString = " days";
      else dayString = " day";
      
      // Set field value
      if(age.years < 0) {
        var ageToday = formContext.getAttribute("mphhi_age").setValue(0);
      } else {
        var ageToday = formContext.getAttribute("mphhi_age").setValue(age.years);
      }
      
      var ageInDays = formContext.getAttribute("mphhi_ageindays").setValue((age.days).toString() + "D");
      var ageInMonths = formContext.getAttribute("mphhi_ageinmonths").setValue((age.months).toString() + "M");
    
      // if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
      //   ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString + " old.";
      // else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
      //   ageString = "Only " + age.days + dayString + " old!";
      // else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
      //   ageString = age.years + yearString + " old. Happy Birthday!!";
      // else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
      //   ageString = age.years + yearString + " and " + age.months + monthString + " old.";
      // else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
      //   ageString = age.months + monthString + " and " + age.days + dayString + " old.";
      // else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
      //   ageString = age.years + yearString + " and " + age.days + dayString + " old.";
      // else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
      //   ageString = age.months + monthString + " old.";
      // else ageString = "Oops! Could not calculate age!";
    
      // return ageString;
      formContext.ui.clearFormNotification("1");
    } else {
      formContext.ui.setFormNotification("Please put a valid birth date.",  "ERROR", "1");
    }
  }

}



// alert(getAge('9/20/1998'));

