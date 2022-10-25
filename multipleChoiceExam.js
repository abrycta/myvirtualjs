import {matchingTypeExam} from "./matchingTypeExam.js";
import {renderIdentificationItem} from "./identificationExam.js";
import {identificationExam} from "./testproper.js";

const multiChoiceExam = JSON.parse(localStorage.getItem('multiChoiceExam'))
const body = document.body
const renderMultipleChoiceItem = (item, index) => {
    const htmlItem = document.createElement('div')
    htmlItem.innerHTML=`
        <h2 class = "questionText">${item.question}</h2>
        <ul>
            <li><button type="button" class="answerButton">${item.a}</button></li>
            <li><button type="button" class="answerButton">${item.b}</button></li>
            <li><button type="button" class="answerButton">${item.c}</button></li>
            <li><button type="button" class="answerButton">${item.d}</button></li>
        </ul>
        
    `
    body.append(htmlItem)
}

function backButton() {
    const nextPage = document.createElement('backButton')
    nextPage.innerText = "Back"
    nextPage.addEventListener('click', () => {
        document.body.innerHTML = '';
        identificationExam['questions'].forEach((item) => {
            renderIdentificationItem(item,
                identificationExam['questions'].indexOf(item))
        })
        nextPageButton()
    })


    body.append(nextPage)
}

function nextPageButton() {
    const nextPage = document.createElement('nextPageButton2')
    nextPage.innerText = "Next Page"
    nextPage.addEventListener('click', () => {
        document.body.innerHTML = '';
        matchingTypeExam()
    })
    body.append(nextPage)
}

function multipleChoiceExamStart() {

    // console.log(multiChoiceExam.questions)
    // start identification part
    multiChoiceExam['questions'].forEach((item) => {
        renderMultipleChoiceItem(item,
            multiChoiceExam['questions'].indexOf(item))
    })
    backButton()
    nextPageButton()
}

export { multipleChoiceExamStart }
