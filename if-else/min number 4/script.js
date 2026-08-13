//wap to find minimum from 4 number.

let a = 15;
let b = 10;
let c = 20;
let d = 55;

if (a < b && a < c && a < d) {
    document.write("a is minimum number")
}
else if (b < c && b < d) {
    document.write("b is minimum number");
}
else if (c < d && c < a && c < a) {
    document.write("c is minimum number");
}
else {
    document.write("d is minimum number");
}