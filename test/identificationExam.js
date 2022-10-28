import {multipleChoiceExamStart} from "./multipleChoiceExam.js";
import { body, studentSession, identificationExam } from './testproper.js'

// MODULE WRITTEN BY KURT, JEROME

// render function to be called by a forEach method in the
// executable code
const renderIdentificationItem = (item, index) => {
    const htmlItem = document.createElement('div')
    // create an html element
    // use innerhtml attribute with string interpolation
    htmlItem.innerHTML = `
        <h2 class = "questionText">${item.Question}</h2>
        <input type="text" id = identification_${index}
        class="answerTextField" placeholder="input answer"
        onfocus="this.placeholder=''"
        onblur="this.placeholder = 'input answer'" required/>
    `
    // save form state
    const textField = htmlItem.lastElementChild;
    if (typeof studentSession['identificationAnswers'].get(index) !== 'undefined') {
        textField.value = studentSession['identificationAnswers'].get(index)
    }

    // for use to display the answers
    if (studentSession['finished']){
        let checkItem = studentSession['identificationAnswersCheck'].get(index)
        textField.disabled = true;

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
            feedbackText.innerHTML = "Correct Answer: " + item.Answer;
            htmlItem.append(feedbackText);
        }
    }
    body.append(htmlItem)
}


// function to append a nextpage button
// much of the processing occurs when a button is clicked
function nextPageButton() {
    const nextPage = document.createElement('nextPageButton')
    nextPage.classList.add("roundedFixedBtn");
    nextPage.classList.add("fixedButtonRight");
    nextPage.innerText = "Next Page"

    nextPage.addEventListener('click', () => {
        // Experimental Code
        let selectedElements = document.querySelectorAll("[id^='identification_']")
        let index = 0
        // before navigating to the next page
        // save the form state
        selectedElements.forEach((item) => {
            // console.log(index, item.value)
            studentSession['identificationAnswers'].set(index, item.value)
            index++
        })
        // clear the body via dom manipulation
        document.body.innerHTML = ''
        // start the next page
        multipleChoiceExamStart()
    })

    body.append(nextPage)
}

export { renderIdentificationItem, nextPageButton }