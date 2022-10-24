import {matchingTypeExam} from "./matchingTypeExam.js";

const multiChoiceExam = JSON.parse(localStorage.getItem('multiChoiceExam'))
const body = document.body
const renderMultipleChoiceItem = (item, index) => {
    const htmlItem = document.createElement('div')
    htmlItem.innerHTML=`
        <h2>${item.question}</h2>
        <ul>
            <li><button type="button">${item.a}</button></li>
            <li><button type="button">${item.b}</button></li>
            <li><button type="button">${item.c}</button></li>
            <li><button type="button">${item.d}</button></li>
        </ul>
        
    `
    body.append(htmlItem)
}

function backButton() {
    const nextPage = document.createElement('button')
    nextPage.innerText = "Back"
    nextPage.addEventListener('click', () => {
        window.location.href = "./testproper.html"
    })
    body.append(nextPage)
}

function nextPageButton() {
    const nextPage = document.createElement('button')
    nextPage.innerText = "Next Page"
    nextPage.addEventListener('click', () => {
        document.body.innerHTML = '';
        matchingTypeExam()
    })
    body.append(nextPage)
}

function multipleChoiceExamStart() {

    console.log(multiChoiceExam.questions)
    // start identification part
    multiChoiceExam['questions'].forEach((item) => {
        renderMultipleChoiceItem(item,
            multiChoiceExam['questions'].indexOf(item))
    })
    backButton()
    nextPageButton()
}

export { multipleChoiceExamStart }
