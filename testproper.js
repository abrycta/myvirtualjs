// exam objects
import { multipleChoiceExamStart } from "./multipleChoiceExam.js";
import { renderIdentificationItem, nextPageButton } from "./identificationExam.js";

const identificationExam = JSON.parse(localStorage.getItem('identificationExam'))
const matchingExam = JSON.parse(localStorage.getItem('matchingExam'))
const multiChoiceExam = JSON.parse(localStorage.getItem('multiChoiceExam'))

// localStorage object for aggregating StudentSession objects
let aggregatedExamStatistics = JSON.parse(localStorage.getItem('aggregatedExamStatistics'))

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
        name: name,
        identificationAnswers: new Map(),
        matchingAnswers: new Map(),
        multiChoiceAnswers: new Map(),
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
            identificationExam['questions'].indexOf(item))
    })
}

// Exam logic
studentSession = newStudentSession()
startIdentificationExam()
nextPageButton()

export { body, studentSession, identificationExam, matchingExam, multiChoiceExam }

