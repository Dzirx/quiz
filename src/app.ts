import quiz_data from "./quiz_data/quiz_data.js"

// console.log(quiz_data);

const titleNode: HTMLHeadElement = document.querySelector("#quizTitle")!;
const questionNode: HTMLSpanElement = document.querySelector("#question")!;
const questionTimeNode: HTMLSpanElement = document.querySelector("#questionTime")!;
const backBtn: HTMLButtonElement = document.querySelector("#back")!;
const nextBtn: HTMLButtonElement = document.querySelector("#next")!;
const endBtn: HTMLButtonElement = document.querySelector("#end")!;
const timeFull: HTMLButtonElement = document.querySelector("#totalTime")!;

titleNode.innerHTML = quiz_data.title;//przypisanie tytulu z quzi_data

let currentIntervalId: number;//zmienna typu number
let fullIntervalId:number;

localStorage.setItem("currentQuestionIdx", "0");//zaczynamy od indeksu jeden

//local storage moj 

localStorage.setItem("quiz",JSON.stringify(quiz_data));





function fullCounter(): void{
    let fullTime = 0;
    fullIntervalId = setInterval(() => {
        (timeFull.innerHTML = `${++fullTime}`)
    }, 1000)
}
function startCounter(): void {
    let time = 0;
    currentIntervalId = setInterval(() => {
        (questionTimeNode.innerHTML = `${++time}`)
    }, 1000)
}

function stopCounter(): void {
    clearInterval(currentIntervalId);
    questionTimeNode.innerHTML = "0"
}

function isOutOfRange(): boolean {
    const currentIdx: number = parseInt(localStorage.getItem("currentQuestionIdx")!)
    return currentIdx < 0 || currentIdx >= quiz_data.questions.length;
}

function displayQuestion(): void {//wyswietlenie pytania 
    const currentIdx: number = parseInt(localStorage.getItem("currentQuestionIdx")!)
    questionNode.innerHTML = quiz_data.questions[currentIdx].formula;//wyswietlenie pytania
    startCounter()
}

nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    stopCounter();
    const currentIdx: number = parseInt(localStorage.getItem("currentQuestionIdx")!)
    localStorage.setItem("currentQuestionIdx", `${currentIdx + 1}`)//ustawia kolejny indeks 
    displayQuestion();
    
})

backBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    stopCounter()
    const currentIdx: number = parseInt(localStorage.getItem("currentQuestionIdx")!)
    localStorage.setItem("currentQuestionIdx", `${currentIdx - 1}`)
    displayQuestion();
    
})
endBtn.addEventListener("click",(e)=>{

})

displayQuestion()
fullCounter()


