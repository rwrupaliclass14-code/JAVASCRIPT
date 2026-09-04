// every background color change by click.

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {

    const num = Math.floor(Math.random() * 16581375);
    const str = num.toString(16);
    console.log(str);
    document.body.style.backgroundColor = "#" + str;
})