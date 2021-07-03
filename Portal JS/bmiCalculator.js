function calculateBMI(executionContext) {
  let formContext = executionContext.getFormContext();

  let height = formContext.getAttribute("mphhi_heightinmeters").getValue();
  let weight = formContext.getAttribute("mphhi_weightinkg").getValue();
  let bmiCalculated = formContext.getAttribute("mphhi_bmicalculated").getValue();
  let bmiOptionSet = formContext.getAttribute("mphhi_bmi").getValue();
  let calculateBMI = 0.00;
  if(height && weight) {
    calculateBMI = weight / (height * height);
    bmiCalculated = formContext.getAttribute("mphhi_bmicalculated").setValue(calculateBMI);

    if(calculateBMI >= 25.0) {
      // 205220000 overweight
      bmiOptionSet = formContext.getAttribute("mphhi_bmi").setValue(205220000);
    } else if(calculateBMI > 18.4 && calculateBMI < 25.0) {
      // 205220001 healthy
      bmiOptionSet = formContext.getAttribute("mphhi_bmi").setValue(205220001);
    } else if (calculateBMI < 18.5) {
      // 205220002 underweight
      bmiOptionSet = formContext.getAttribute("mphhi_bmi").setValue(205220002);
    }
  }
}
