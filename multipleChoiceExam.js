import {matchingTypeExam} from "./matchingTypeExam.js";
import {renderIdentificationItem} from "./identificationExam.js";
import {identificationExam, studentSession} from "./testproper.js";

const multiChoiceExam = JSON.parse(localStorage.getItem('multiChoiceExam'))
const body = document.body
const renderMultipleChoiceItem = (item, index) => {
    // console.log(item, index)
    const htmlItem = document.createElement('div')
    htmlItem.innerHTML = `
    <h2 class="questionText">${item.question}</h2>
    <form name="multiForm_${index}">
            <input type="radio" name="multi_${index}" id =${item.a}" value="${item.a}"/>
            <label for = "${item.a}">${item.a}</label>
            <input type="radio" name="multi_${index}" id =${item.b} "value="${item.b}"/>
            <label for = "${item.b}">${item.b}</label>
            <input type="radio" name="multi_${index}" id =${item.c}" value="${item.c}"/>
            <label for = "${item.c}">${item.c}</label>
            <input type="radio" name="multi_${index}" id =${item.d}" value="${item.d}"/>
            <label for = "${item.d}">${item.d}</label>
    </form>
    `
    // previously stored item, if any
    let previousAnswer = studentSession['matchingAnswers'].get(index)

    console.log(htmlItem)


    if(previousAnswer !== null) {
        console.log(htmlItem
            .lastElementChild
            .querySelector(`#${previousAnswer}`))
        /*
        htmlItem
            .lastElementChild
            .querySelector(`#${previousAnswer}`)
            .checked = true

         */
    }

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
        let selectedElements = document.querySelectorAll("[name^='multiForm_']")
        let index = 0
        selectedElements.forEach((item) => {
            studentSession['multiChoiceAnswers'].set(index,
                item.querySelector("input[name ^= 'multi_']:checked").value)
            index++
        })
    })
    console.log(studentSession['multiChoiceAnswers'])
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
