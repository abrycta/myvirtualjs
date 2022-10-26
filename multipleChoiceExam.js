import {matchingTypeExam} from "./matchingTypeExam.js";
import {renderIdentificationItem} from "./identificationExam.js";
import {nextPageButton as nextPageIdentification}  from "./identificationExam.js";
import {identificationExam, studentSession} from "./testproper.js";

const multiChoiceExam = JSON.parse(localStorage.getItem('multiChoiceExam'))
const body = document.body
const renderMultipleChoiceItem = (item, index) => {
    // console.log(item, index)
    let htmlItem = document.createElement('div')
    htmlItem.innerHTML = `
    <h2 class="questionText">${item.question}</h2>
    <form name="multiForm_${index}">
        <ul>
            
            <li><input type="radio" name="multi_${index}" id ="${item.a}" value="${item.a}"/>
            <label for = "${item.a}">${item.a}</label></li>
            
            <li><input type="radio" name="multi_${index}" id ="${item.b}" value="${item.b}"/>
            <label for = "${item.b}">${item.b}</label></li>
            
            <li><input type="radio" name="multi_${index}" id ="${item.c}" value="${item.c}"/>
            <label for = "${item.c}">${item.c}</label></li>
            
            <li><input type="radio" name="multi_${index}" id ="${item.d}" value="${item.d}"/>
            <label for = "${item.d}">${item.d}</label></li>
            
            </ul>
    </form>
    `
    // previously stored item, if any
    let previousAnswer = studentSession['multiChoiceAnswers'].get(index)
    console.log(index)
    console.log(previousAnswer)
        try {
        // [name^='multiForm_']
            console.log(htmlItem
                .lastElementChild
                .querySelector(`[value =${previousAnswer}]`)
        )
            htmlItem
                .lastElementChild
                .querySelector(`#${previousAnswer}`)
                .checked = true
        } catch (TypeError) {
            console.log(htmlItem.lastElementChild)
        }


    body.append(htmlItem)
}

function backButton() {
    const nextPage = document.createElement('backButton')
    nextPage.innerText = "Back"
    nextPage.addEventListener('click', () => {
        // save progress
        let selectedElements = document.querySelectorAll("[name^='multiForm_']")
        let index = 0
        let prevItem
        console.log(selectedElements)
        selectedElements.forEach((item) => {
            try {
                prevItem = item
                    .querySelector("input[name ^= 'multi_']:checked")
                    .value
                studentSession['multiChoiceAnswers'].set(index, prevItem)
                index++
            }
            catch (TypeError) {
                console.log('jkjkjkj')
                studentSession['multiChoiceAnswers'].set(index, null)
                console.log(studentSession['multiChoiceAnswers'])
                index++
            }
        })
        // render identification
        document.body.innerHTML = '';
        identificationExam['questions'].forEach((item) => {
            renderIdentificationItem(item,
                identificationExam['questions'].indexOf(item))
        })
        nextPageIdentification()
    })

    body.append(nextPage)
}

function nextPageButton() {
    const nextPage = document.createElement('nextPageButton2')
    nextPage.innerText = "Next Page"

    nextPage.addEventListener('click', () => {
        let selectedElements = document.querySelectorAll("[name^='multiForm_']")
        let index = 0
        let prevItem
        selectedElements.forEach((item) => {
            // console.log(item.querySelector("input[name ^= 'multi_']:checked").value)
            try {
            prevItem = item
                .querySelector("input[name ^= 'multi_']:checked")
                .value
            if (prevItem != null) studentSession['multiChoiceAnswers'].set(index, prevItem)
            index++ }
            catch (TypeError) {
                // ignore
            }
        })
        document.body.innerHTML = ''
        matchingTypeExam()
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
