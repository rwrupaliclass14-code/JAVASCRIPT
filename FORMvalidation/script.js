//we call id and get html element 
const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const inputNumber = document.getElementById("input-number");
const inputAge = document.getElementById("input-age");

const submitBtn = document.getElementById("submit-btn");

const outputName = document.getElementById("output-name");
const outputEmail = document.getElementById("output-email");
const outputNumber = document.getElementById("output-number");
const outputAge = document.getElementById("output-age");

// process function
const controlBtn = () => {

    //clear previous data 
    outputName.textContent = "";
    outputEmail.textContent = "";
    outputNumber.textContent = "";
    outputAge.textContent = "";

    //we fetch data from input box, and  store in new variable
    const name = inputName.value;
    const email = inputEmail.value;
    const number = inputNumber.value;
    const age = inputAge.value;

    //check phone number by if condition 
    if (number.length != 10) {
        alert("invalid phone number !");
    }
    //check age number by if condition, age must less than 100 and greater than 0.
    if (age > 100 || age <= 0) {
        alert("invalid age !");
        return;
    }

    //we print a output 
    outputName.textContent = name;
    outputEmail.textContent = email;
    outputNumber.textContent = number;
    outputAge.textContent = age;
}

//we create click event, and connect control submit function button.
submitBtn.addEventListener("click", controlBtn);