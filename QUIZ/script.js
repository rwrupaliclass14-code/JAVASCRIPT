/* ---------- ELEMENTS ---------- */
// Sab elements ek hi baar call kiya hai bar bar search na karna
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const nextBtn = document.getElementById("next");

const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

const scoreValueEl = document.getElementById("scoreValue");
const scorePercentEl = document.getElementById("scorePercent");
const statusEl = document.getElementById("status");

// Har question ek object hai. Yahin par add/remove karo quiz change karne ke liye.
const quiz = [
  {
    q: "What is the capital of France?",
    options: ["Paris", "Rome", "Berlin"],
    answer: "Paris"
  },
  {
    q: "2 + 2 = ?",
    options: ["3", "4", "5"],
    answer: "4"
  },
  {
    q: "Which language runs in a browser?",
    options: ["Python", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    q: "7-1 = ?",
    options: ["8", "9", "6"],
    answer: "6"
  }
];

const TIME_LIMIT = 60; // har question ke liye seconds

/* ---------- STATE ---------- */
let currentIndex = 0;   // kaunsa question chal raha hai
let score = 0;           // ab tak sahi jawab
let secondsLeft = 0;     // current question ka countdown
let timerId = null;      // setInterval id, taaki baad me stop kar sakein



/* ---------- HELPERS ---------- */
// Ek screen dikhao, baaki do hide kar do (Bootstrap ka d-none class use karke)
function showScreen(screenToShow) {
  [startScreen, quizScreen, resultScreen].forEach(screen => {
    screen.classList.toggle("d-none", screen !== screenToShow);
  });
}

//60 second mese 1:69 dikhane k liye 
function formatTime(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60);   // 69 / 60 = 1.15 -> Math.floor isko round-down karke 1 bana deta hai minute nikal ta hai
  let seconds = totalSeconds % 60;  // bache hue seconds nikalo 69 % 60 = 9

  return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
}
/* ---------- TIMER ---------- */
function startTimer() {
  clearInterval(timerId);        // purana timer band karo (double counting na ho)
  secondsLeft = TIME_LIMIT;
  timerEl.textContent = formatTime(secondsLeft);

  timerId = setInterval(() => {
    secondsLeft--;
    timerEl.textContent = formatTime(secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(timerId);
      revealAnswer(null); // null matlab time khatam, koi option select nahi hua
    }
  }, 1000);
}

/* ---------- QUIZ FLOW ---------- */
function loadQuestion() {
  const item = quiz[currentIndex];
  questionEl.textContent = item.q;
  optionsEl.innerHTML = "";          // purane buttons hatao
  nextBtn.classList.add("d-none");   // jab tak answer na mile "Next" hide rakho

  // har option ke liye ek Bootstrap button banao
  item.options.forEach(optionText => {
    const btn = document.createElement("button");
    btn.textContent = optionText;
    btn.className = "btn btn-outline-secondary w-100 my-1";
    btn.onclick = () => revealAnswer(btn);
    optionsEl.appendChild(btn);
  });

  startTimer();
}

// Jab user option click kare (clickedBtn = wo button) ya time khatam ho jaye (clickedBtn = null)
function revealAnswer(clickedBtn) {
  clearInterval(timerId);
  const correctAnswer = quiz[currentIndex].answer;
  const allButtons = optionsEl.querySelectorAll("button");

  allButtons.forEach(btn => {
    btn.disabled = true; // sab buttons lock, dobara answer change na ho sake

    if (btn.textContent === correctAnswer) {
      btn.classList.replace("btn-outline-secondary", "btn-success"); // sahi answer hamesha green
    } else if (btn === clickedBtn) {
      btn.classList.replace("btn-outline-secondary", "btn-danger"); // galat pick red
    }
  });

  if (clickedBtn && clickedBtn.textContent === correctAnswer) {
    score++;
  }

  nextBtn.classList.remove("d-none"); // ab "Next" button dikhao
}

/* ---------- RESULTS ---------- */
function showResults() {
  const total = quiz.length;
  const percent = Math.round((score / total) * 100);

  scoreValueEl.textContent = `${score} / ${total}`;
  scorePercentEl.textContent = `${percent}% correct`;

  // Score ke hisaab se label + Bootstrap badge color
  let label, colorClass;
  if (percent >= 90) { label = "Excellent!"; colorClass = "bg-success"; }
  else if (percent >= 70) { label = "Good"; colorClass = "bg-primary"; }
  else if (percent >= 40) { label = "Average"; colorClass = "bg-warning"; }
  else { label = "Needs Improvement"; colorClass = "bg-danger"; }

  statusEl.textContent = label;
  statusEl.className = `badge mb-3 ${colorClass}`;

  showScreen(resultScreen);
}

/* ---------- EVENTS ---------- */
startBtn.onclick = () => {
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
};

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < quiz.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

restartBtn.onclick = () => {
  showScreen(startScreen);
};

// create a quiz app of 10 random mcq type questions.
// next button click -> next question...
// each question should be display for 60 second.
// after 60 second it should be change to next question.
// count user's mark while attempting test and show at the end of quiz.
// and show excellent, good, average, poor result based on mark.