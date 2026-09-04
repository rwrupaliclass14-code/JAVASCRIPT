//wap to program change the button color with text on one click becoming background color.

const btnprimary = document.getElementById("btn-primary");

btnprimary.addEventListener("click", () => {

    const num = Math.floor(Math.random() * 16581375);
    const str = num.toString(16);
    const color = "#" + str;
    document.body.style.backgroundColor = color;
    btnprimary.style.backgroundColor = color;
    btnprimary.textContent = color;

    console.log(color);
    alert("inform me");

});