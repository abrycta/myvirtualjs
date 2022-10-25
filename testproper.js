// exam objects
import {multipleChoiceExamStart} from "./multipleChoiceExam.js";

const identificationExam = JSON.parse(localStorage.getItem('identificationExam'))
const matchingExam = JSON.parse(localStorage.getItem('matchingExam'))
const multiChoiceExam = JSON.parse(localStorage.getItem('multiChoiceExam'))

// localStorage object for aggregating StudentSession objects
let aggregatedExamStatistics = JSON.parse(localStorage.getItem('aggregatedExamStatistics'))

// store a reference to the DOM
const body = document.body

// for answer checking
// every object must be in the form of:
// {index: 0, answer: "someString"}
const studentIdentificationAnswers = []
const studentMatchingExamAnswers = []
const studentMultiChoiceExamAnswers = []

// to be stored in the aggregatedExamStatistics localStorage object
// store indexes of items in array
const newStudentSession = () =>  {
    return {
        name: name,
        correctIdentificationItems: [],
        IncorrectIdentificationItems: [],
        correctMatchingItems: [],
        IncorrectMatchingItems: [],
        correctMultiChoiceItems: [],
        IncorrectMultiChoiceItems: [],
        totalScore: 0,
    }
}

const renderIdentificationItem = (item, index) => {
    const htmlItem = document.createElement('div')
    htmlItem.innerHTML = `
        <h2 class = "questionText">${item.Question}</h2>
        <input type="text" id = identification_${index} class="answerTextField" placeholder="input answer" onfocus="this.placeholder=''" onblur="this.placeholder = 'input answer'" required/>
    `
    body.append(htmlItem)
}

// for answer checking
// every object must be in the form of:
// {index: 0, answer: "someString"}
function checkIdentificationExam(index, answer) {
    // possibly do parseInteger on the ID?
}
function nextPageButton() {
    const nextPage = document.createElement('nextPageButton')
    nextPage.innerText = "Next Page"
    nextPage.addEventListener('click', () => {
        document.body.innerHTML = '';
        multipleChoiceExamStart()
    })
    body.append(nextPage)
}

// Exam logic
function startExam() {
    // create a new Student session
    let studentSession = newStudentSession()
    console.log(identificationExam.questions)
    // start identification part
    identificationExam['questions'].forEach((item) => {
        renderIdentificationItem(item,
            identificationExam['questions'].indexOf(item))
    })
    nextPageButton()
}


startExam()


