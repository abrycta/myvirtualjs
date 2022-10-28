// exam objects
import { multipleChoiceExamStart } from "./multipleChoiceExam.js";
import { renderIdentificationItem, nextPageButton } from "./identificationExam.js";

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
// store indexes of items in array
// answers to be stored in the array
// must be objects in the form of
// { index, answer }
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

// for answer checking
// every object must be in the form of:
// {index: 0, answer: "someString"}
function checkIdentificationExam(index, answer) {
    // possibly do parseInteger on the ID?
}


function startIdentificationExam() {
    identificationExam['questions'].forEach((item) => {
        renderIdentificationItem(item,
            identificationExam['questions'].indexOf(item), identificationExam['instructions'])
    })
}


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
console.log("Aggregate tesproper", aggregatedExamStatistics)
export { body, studentSession, identificationExam, matchingExam, multiChoiceExam }

//TODO CHECK IF IN AGGRETAED

