function ageInMonths(executionContext) {
  var formContext = executionContext.getFormContext();   
  var ageinDays = formContext.getAttribute("mphhi_ageindays").getValue();
  var ageInDaysToNumber = parseInt(ageinDays);

  var ageInMonthsCalculation = ageInDaysToNumber / 30;
  var ageInMonthsNoDecimal = Math.trunc(ageInMonthsCalculation)
  var ageInMonthsToString = ageInMonthsNoDecimal.toString();
  var ageInMonthsValue = formContext.getAttribute("mphhi_ageinmonths").setValue(ageInMonthsToString + "M");
}