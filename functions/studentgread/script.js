
const getGradeMessage = (grade) => {
    switch (grade) {
        case "A": return "Excellent work!";
        case "B": return "Good job!";
        case "C": return "Well done, you passed.";
        case "D": return "You need some improvement.";
        case "F": return "Failed. Better luck next time.";
        default: return "Invalid grade.";
    }
};
const ans = getGradeMessage("C");
console.log(ans)
