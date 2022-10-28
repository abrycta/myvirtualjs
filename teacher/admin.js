
let aggregatedExamStatistics = new Map(JSON.parse(localStorage.getItem('aggregatedExamStatistics')))
let highestScoringStudent = "";
let lowestScoringStudent = "";
let averageScore = 0;
let mostAnsweredQuestion = "";
let leastAnsweredQuestion = "";
let questions = new Map();

function getStudentSession(rawJsonStudent){
    let studentSessionS = JSON.parse(rawJsonStudent)
    console.log("Student Session", studentSessionS)
    studentSessionS.identificationAnswers = new Map(JSON.parse(studentSessionS.identificationAnswers))
    studentSessionS.matchingAnswers = new Map(JSON.parse(studentSessionS.matchingAnswers))
    studentSessionS.multiChoiceAnswers = new Map(JSON.parse(studentSessionS.multiChoiceAnswers))

    studentSessionS.identificationAnswersCheck = new Map(JSON.parse(studentSessionS.identificationAnswersCheck))
    studentSessionS.matchingAnswersCheck = new Map(JSON.parse(studentSessionS.matchingAnswersCheck))
    studentSessionS.multiChoiceAnswersCheck = new Map(JSON.parse(studentSessionS.multiChoiceAnswersCheck))
    return studentSessionS;
}

aggregatedExamStatistics.forEach((studentSession, studentName) => {
    aggregatedExamStatistics.set(studentName, getStudentSession(studentSession))
})
console.log(aggregatedExamStatistics)

function getAverageScore(){
    
    let index = 0;
    let totalScore = 0;
    let highestScore = -1;
    let lowestScore = 9999999;
    aggregatedExamStatistics.forEach((studentSession, studentName) => {
        totalScore += studentSession.totalScore;
        if (studentSession.totalScore > highestScore){
            highestScoringStudent = studentName;
            highestScore = studentSession.totalScore
        }
        if (studentSession.totalScore < lowestScore){
            lowestScoringStudent = studentName;
            lowestScore = studentSession.totalScore
            console.log(lowestScore)
        }
        index++;

        generateStudentBox(studentSession);
    })
    averageScore = totalScore/index;
}

function generateStudentBox(student){
    let htmlItem = document.createElement('div');
    htmlItem.classList.add("Correct");
    htmlItem.innerHTML = `
    <h2 class="adminText">Name: ${student.name}</h2>
        <h2 class="adminText">Identification: ${student.identificationScore}</h2>
        <h2 class="adminText">Multiple Choice: ${student.multiChoiceSCore}</h2>
        <h2 class="adminText">Matching Type: ${student.matchingScore}</h2>
        
        <h2 class="adminText">Total Score: ${student.totalScore}</h2>
    `;

    document.body.append(htmlItem);
}



function clearLocalStorage(){
    localStorage.clear();
    window.location = "index.html"; // if valid, redirect to index.html
}

function getQuestionsCount(){
    aggregatedExamStatistics.forEach((studentSession, studentName) => {
        studentSession.identificationAnswersCheck.forEach((value, index) => {
            addQuestion("identification", index, value);
        })
        studentSession.matchingAnswersCheck.forEach((value, index) => {
            addQuestion("matchingAnswers", index, value);
        })
        studentSession.multiChoiceAnswersCheck.forEach((value, index) => {
            addQuestion("multiChoice", index, value);
        })
    })
    let highestCount = -1;
    let lowestCount = 99999;

    questions.forEach((questionObject, questionIdentifier) => {
        if (questionObject.count > highestCount){
            mostAnsweredQuestion = questionObject.question;
            highestCount = questionObject.count;
        }

        if (questionObject.count < lowestCount){
            leastAnsweredQuestion = questionObject.question;
            lowestCount = questionObject.count;
        }
    })
}

function addQuestion(identifierA, index, value){
    if (value.correct){
        let identifier = identifierA
        let key = identifier + index
        let questionA = questions.get(key)
        if (questionA == undefined){
            questions.set(key, {
                question: value.question,
                count: 1,
            })
        }else{
            questions.set(key, {
                question: value.question,
                count: questionA.count + 1,
            })
        }
    }
}

getQuestionsCount()
console.log(questions)

getAverageScore();

const averageScoreText = document.getElementById("averageScore");
const highestScoringStudentText = document.getElementById("highestScoringStudent");
const lowestScoringStudentText = document.getElementById("lowestScoringStudent");
const mostAnsweredQuestionText = document.getElementById("mostAnsweredQuestion");
const leastAnsweredQuestionText = document.getElementById("leastAnsweredQuestion");

averageScoreText.innerHTML += averageScore;
highestScoringStudentText.innerHTML += highestScoringStudent;
lowestScoringStudentText.innerHTML += lowestScoringStudent;
mostAnsweredQuestionText.innerHTML += mostAnsweredQuestion;
leastAnsweredQuestionText.innerHTML += leastAnsweredQuestion;