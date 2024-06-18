let inpDay=document.querySelector(".day");
let inpMonth=document.querySelector(".month");
let inpYear=document.querySelector(".year");

let inputs=document.querySelectorAll("input")
let spans=document.querySelectorAll("span")

let outDay=document.querySelector(".outd");
let outMonth=document.querySelector(".outm")
let outYear=document.querySelector(".outy")

let button=document.querySelector("svg");

function calculateAge(inpYearVal, inpMonthVal, inpDayVal) {
    
  var today = new Date();
  const birthDate = new Date(inpYearVal, inpMonthVal - 1, inpDayVal);
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    days += lastMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days };
}

button.onclick = function() {
  let inpDayVal = inpDay.value;
  let inpMonthVal = inpMonth.value;
  let inpYearVal = inpYear.value;

  outYear.textContent = "--";
  outMonth.textContent = "--"; 
  outDay.textContent = "--"; 

  inputs.forEach((input, index) => {
    let value = input.value;
    let isValid = true;
    let errorMessage = "";
    if (value === "") {
      isValid = false;
      errorMessage = "Required field";
    } 
    else if (isNaN(value) || value.includes(".") || value.includes(",")) {
      isValid = false;
      errorMessage = "Invalid number";
    }
     else {
       if(index==0 && (value < 1 || value > 31)) {
        isValid = false;
        errorMessage = "Day must be between 1 and 31";
      }
      else if (index === 0 &&( inpYearVal !="" && inpMonthVal !="")) { // day
       
        date = new Date(inpYearVal, inpMonthVal - 1, value);
        isValid = date.getDate() === parseInt(value) ;
        errorMessage = "Date not found";
        
      } 
      else if (index === 1) {
        if (value < 1 || value > 12) {
          isValid = false;
          errorMessage = "Month must be between 1 and 12";
        }
      } else if (index === 2) { 
        if (value < 1850 || value > new Date().getFullYear()) {
          isValid = false;
          errorMessage = "Year must be between 1850 and " + new Date().getFullYear();
        }
      }
    }

    if (isValid) {
      input.classList.remove("error");
      spans[index].textContent = ""; 
    } else {
      input.classList.add("error");
      spans[index].textContent = errorMessage; 
    }
  });

  let isValidInput = true;
  inputs.forEach(input => {
    if (input.classList.contains("error")) {
      isValidInput = false;
    }
  });

  if (isValidInput) {
    let c = calculateAge(inpYearVal, inpMonthVal, inpDayVal);
    outYear.textContent = c.years;
    outMonth.textContent = c.months;
    outDay.textContent = c.days;
  }
}
