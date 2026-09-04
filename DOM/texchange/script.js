// button text contain should be change on every click become background color.

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {

    const num = Math.floor(Math.random() * 16581375);
    const str = num.toString(16);
    const color = "#" + str;
    document.body.style.backgroundColor = color;
    btn.textContent = color;
    console.log(color);
})