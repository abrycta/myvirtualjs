// exam objects
import { multipleChoiceExamStart } from "./multipleChoiceExam.js";
import { renderIdentificationItem, nextPageButton } from "./identificationExam.js";

// CORE LOGIC
// MODULE WRITTEN BY KURT

const identificationExam = JSON.parse(localStorage.getItem('identificationExam'))
const matchingExam = JSON.parse(localStorage.getItem('matchingExam'))
const multiChoiceExam = JSON.parse(localStorage.getItem('multiChoiceExam'))

// localStorage object for aggregating StudentSession objects
let aggregatedExamStatistics = new Map(JSON.parse(localStorage.getItem('aggregatedExamStatistics')))
let loggedInUser = localStorage.getItem('loggedInUser');
// store a reference to the DOM
const body = document.body
let studentSession = {}

// to be stored in the aggregatedExamStatistics localStorage object
// for easier processing
// answers of students are stored
const newStudentSession = () =>  {
    return {
        name: loggedInUser,
        identificationAnswers: new Map(),
        matchingAnswers: new Map(),
        multiChoiceAnswers: new Map(),

        identificationAnswersCheck: new Map(),
        matchingAnswersCheck: new Map(),
        multiChoiceAnswersCheck: new Map(),
        finished: false,
        identificationScore: 0,
        matchingScore: 0,
        multiChoiceSCore: 0,
        totalScore: 0,
    }
}

// start the first part of the exam
function startIdentificationExam() {
    const htmlItem = document.createElement('div')
    htmlItem.innerHTML = `
    <h2 class="center">Identification</h2>
    <h2 class="center">${identificationExam['instructions']}</h2> 
    `
    body.append(htmlItem)
    identificationExam['questions'].forEach((item) => {
        renderIdentificationItem(item,
            identificationExam['questions'].indexOf(item))
    })
}

// case if aggregatedexamstatistics is not empty
// this means that a student has already taken an exam
// and that parsing within the admin panel
// for statistics can now take place
if (aggregatedExamStatistics != null && aggregatedExamStatistics.length != 0){
    let found = false
    console.log(aggregatedExamStatistics)
    studentSession = aggregatedExamStatistics.get(loggedInUser)
    if (studentSession != undefined){
        found = true;
        studentSession = JSON.parse(studentSession)
        console.log("Student Session", studentSession)
        studentSession.identificationAnswers = new Map(JSON.parse(studentSession.identificationAnswers))
        studentSession.matchingAnswers = new Map(JSON.parse(studentSession.matchingAnswers))
        studentSession.multiChoiceAnswers = new Map(JSON.parse(studentSession.multiChoiceAnswers))

        studentSession.identificationAnswersCheck = new Map(JSON.parse(studentSession.identificationAnswersCheck))
        studentSession.matchingAnswersCheck = new Map(JSON.parse(studentSession.matchingAnswersCheck))
        studentSession.multiChoiceAnswersCheck = new Map(JSON.parse(studentSession.multiChoiceAnswersCheck))
        console.log("Student Session", studentSession)
    }
    if (!found) {
        studentSession = newStudentSession()
    }
}else{
    studentSession = newStudentSession()
}

// Exam logic

console.log("Student Session", studentSession)
startIdentificationExam()
nextPageButton()

export { body, studentSession, identificationExam, matchingExam, multiChoiceExam }


