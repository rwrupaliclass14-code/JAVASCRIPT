let n = 123;
let original = n;

let sum = 0;
let multi = 1;

while (n > 0) {
    let digit = n % 10;

    sum = sum + digit;

    multi = multi * digit;

    n = Math.floor(n / 10);
}


if (sum == multi) {
    console.log(original + " is a magic number");
}
else {
    console.log(original + " is not a magic number");
}