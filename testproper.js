let identificationExam = JSON.parse(localStorage.getItem('identificationExam'))
let matchingExam = JSON.parse(localStorage.getItem('matchingExam'))
let multiChoiceExam = JSON.parse(localStorage.getItem('multiChoiceExam'))

console.log(identificationExam, matchingExam, multiChoiceExam)
function newStudentSession(name) {
    return {
        name: name,
        score: 0,
    }
}

function renderItem() {

}

function renderIdentificationItem(item) {

}

function renderMatchingTypeItem() {

}

function renderMultiChoiceItem() {

}

function processItem() {

}

function startExam() {

}

// Actual code
// console.log(exams);

// create a new Student session
studentSession = newStudentSession()

