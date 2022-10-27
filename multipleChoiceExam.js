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
            
            <li><input type="radio" name="multi_${index}" id ="${item.a + index}" value="${item.a}"/>
            <label for = "${item.a + index}">${item.a}</label></li>
            
            <li><input type="radio" name="multi_${index}" id ="${item.b + index }" value="${item.b}"/>
            <label for = "${item.b + index}">${item.b}</label></li>
            
            <li><input type="radio" name="multi_${index}" id ="${item.c + index}" value="${item.c}"/>
            <label for = "${item.c + index}">${item.c}</label></li>
            
            <li><input type="radio" name="multi_${index}" id ="${item.d + index}" value="${item.d}"/>
            <label for = "${item.d + index}">${item.d}</label></li>
            
            </ul>
    </form>
    `
    // previously stored item, if any
    let previousAnswer = studentSession['multiChoiceAnswers'].get(index)
        try {
            htmlItem
                .lastElementChild
                .querySelector(`[value ="${previousAnswer}"]`)
                .checked = true
        } catch (TypeError) {
            // console.log(htmlItem, TypeError, htmlItem.lastElementChild,`[value ="${previousAnswer}"]`)
        }
    

    const form = htmlItem.lastElementChild;
    if (studentSession['finished']){
        
        var x = form.getElementsByTagName("input");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].disabled = true;
        }

        let checkItem = studentSession['multiChoiceAnswersCheck'].get(index)

        const scoreText = document.createElement('h2');
        scoreText.classList.add("scoreText");
        scoreText.innerHTML = checkItem.points +"/" +checkItem.totalPoints;
        htmlItem.prepend(scoreText);

        
        if (checkItem.correct){
            htmlItem.classList.add("correct");
        }else{
            htmlItem.classList.add("wrong");
            
            const feedbackText = document.createElement('h2');
            feedbackText.classList.add("feedbackText");
            feedbackText.innerHTML = "Correct Answer: " + item.answer;
            htmlItem.append(feedbackText);
        }
    }
    body.append(htmlItem)
}

function backButton() {
    const nextPage = document.createElement('backButton')
    nextPage.classList.add("roundedFixedBtn");
    nextPage.classList.add("fixedButtonLeft");
    nextPage.innerText = "Back"
    nextPage.addEventListener('click', () => {
        // save progress
        let selectedElements = document.querySelectorAll("[name^='multiForm_']")
        let index = 0
        let prevItem
        selectedElements.forEach((item) => {
            try {
                prevItem = item
                    .querySelector("input[name ^= 'multi_']:checked")
                    .value
                studentSession['multiChoiceAnswers'].set(index, prevItem)
                index++
            }
            catch (TypeError) {
                studentSession['multiChoiceAnswers'].set(index, "")
                index++
            }
        })
        // render identification
        document.body.innerHTML = '';
        identificationExam['questions'].forEach((item) => {
            renderIdentificationItem(item,
                identificationExam['questions'].indexOf(item))
        })
        console.log(studentSession['multiChoiceAnswers'])
        nextPageIdentification()
    })

    body.append(nextPage)
}

function nextPageButton() {
    const nextPage = document.createElement('nextPageButton2')
    nextPage.classList.add("roundedFixedBtn");
    nextPage.classList.add("fixedButtonRight");
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
                studentSession['multiChoiceAnswers'].set(index, "")
                index++
            }
        })
        document.body.innerHTML = ''
        matchingTypeExam()
    })
    body.append(nextPage)
}

function multipleChoiceExamStart() {

    // start identification part
    multiChoiceExam['questions'].forEach((item) => {
        renderMultipleChoiceItem(item,
            multiChoiceExam['questions'].indexOf(item))
    })
    backButton()
    nextPageButton()
}

export { multipleChoiceExamStart }
