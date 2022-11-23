import quiz_data from "./quiz_data/quiz_data.js";
// console.log(quiz_data);
const titleNode = document.querySelector("#quizTitle");
const questionNode = document.querySelector("#question");
const questionTimeNode = document.querySelector("#questionTime");
const backBtn = document.querySelector("#back");
const nextBtn = document.querySelector("#next");
const endBtn = document.querySelector("#end");
const timeFull = document.querySelector("#totalTime");
titleNode.innerHTML = quiz_data.title; //przypisanie tytulu z quzi_data
let currentIntervalId; //zmienna typu number
let fullIntervalId;
localStorage.setItem("currentQuestionIdx", "0"); //zaczynamy od indeksu jeden
//local storage moj 
localStorage.setItem("quiz", JSON.stringify(quiz_data));
function fullCounter() {
    let fullTime = 0;
    fullIntervalId = setInterval(() => {
        (timeFull.innerHTML = `${++fullTime}`);
    }, 1000);
}
function startCounter() {
    let time = 0;
    currentIntervalId = setInterval(() => {
        (questionTimeNode.innerHTML = `${++time}`);
    }, 1000);
}
function stopCounter() {
    clearInterval(currentIntervalId);
    questionTimeNode.innerHTML = "0";
}
function isOutOfRange() {
    const currentIdx = parseInt(localStorage.getItem("currentQuestionIdx"));
    return currentIdx < 0 || currentIdx >= quiz_data.questions.length;
}
function displayQuestion() {
    const currentIdx = parseInt(localStorage.getItem("currentQuestionIdx"));
    questionNode.innerHTML = quiz_data.questions[currentIdx].formula; //wyswietlenie pytania
    startCounter();
}
nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    stopCounter();
    const currentIdx = parseInt(localStorage.getItem("currentQuestionIdx"));
    localStorage.setItem("currentQuestionIdx", `${currentIdx + 1}`); //ustawia kolejny indeks 
    displayQuestion();
});
backBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    stopCounter();
    const currentIdx = parseInt(localStorage.getItem("currentQuestionIdx"));
    localStorage.setItem("currentQuestionIdx", `${currentIdx - 1}`);
    displayQuestion();
});
endBtn.addEventListener("click", (e) => {
});
displayQuestion();
fullCounter();
