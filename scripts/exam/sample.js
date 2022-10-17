const quizArea = document.querySelector('.quizArea');
const btn = document.createElement('button');
const message = document.createElement('div');
const question = document.createElement('div');
//const btnNext = document.createElement('button');
const quiz = {data}
btn.textContent = "Start Quiz";

quizArea.append(message);
quizArea.append(question);
quizArea.append(btn);
//quizArea.append(btnNext);

btn.addEventListener('click', startQuiz);

function startQuiz(){
    loadQuizData('multipleChoice.json ')
}

function loadQuizData(url){
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
}