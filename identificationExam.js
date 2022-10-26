import {multipleChoiceExamStart} from "./multipleChoiceExam.js";
import { body, studentSession, identificationExam } from './testproper.js'


const renderIdentificationItem = (item, index) => {
    const htmlItem = document.createElement('div')
    // console.log(studentSession['identificationAnswers'].get(index))
    htmlItem.innerHTML = `
        <h2 class = "questionText">${item.Question}</h2>
        <input type="text" id = identification_${index}
        class="answerTextField" placeholder="input answer"
        onfocus="this.placeholder=''"
        onblur="this.placeholder = 'input answer'" required/>
    `

    if (typeof studentSession['identificationAnswers'].get(index) !== 'undefined') {
        htmlItem.lastElementChild.value = studentSession['identificationAnswers'].get(index)
    }

    body.append(htmlItem)
}

/*
const getIdentificationAnswer = (item, index, answers) => {
    let answer = document.getElementById(`identification_${index}`).value
    console.log(index, answer)
    answers.set(index, answer)
}

 */

// button handler for next page
const identificationHandler = () => {
    let selectedElements = document.querySelectorAll("[id^='identification_']")
    selectedElements.forEach((item) => {
        console.log(item)
    })
}

function nextPageButton() {
    const nextPage = document.createElement('nextPageButton')
    nextPage.innerText = "Next Page"


    nextPage.addEventListener('click', () => {
        // Experimental Code
        let selectedElements = document.querySelectorAll("[id^='identification_']")
        let index = 0
        selectedElements.forEach((item) => {
            // console.log(index, item.value)
            studentSession['identificationAnswers'].set(index, item.value)
            index++
        })
        document.body.innerHTML = ''
        multipleChoiceExamStart()
    })

    body.append(nextPage)
}

export { renderIdentificationItem, nextPageButton }