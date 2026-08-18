//write to program sum of only even number 1 to n

let i;
let num = 10;
let sum = 1;
let temp = 0;

for (i = 1; i <= 10; i++) {
    console.log(i);
    if (i % 2 == 0) {
        sum += i;
    }
}
console.log("sum of even number" + sum);