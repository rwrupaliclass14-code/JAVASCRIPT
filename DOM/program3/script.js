//wap program turn dark mode in to light mode .

const title = document.querySelector("#title");

const btn = document.querySelector("#btn");

const body = document.body;

let darkMode = true;

btn.addEventListener("click", function () {

    //switch to light mode
    if (darkMode) {
        body.style.backgroundColor = "#333333";
        title.textContent = "welcome to dark mode 🌛"
        darkMode = false;
    } else {
        //switch to dark mode 
        body.style.backgroundColor = "#ffffff";
        title.textContent = "welcome to light mode 🌞";
        darkMode = true;
    }
});