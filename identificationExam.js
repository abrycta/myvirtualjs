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
    const textField = htmlItem.lastElementChild;
    if (typeof studentSession['identificationAnswers'].get(index) !== 'undefined') {
        textField.value = studentSession['identificationAnswers'].get(index)
        
    }

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

/*
const getIdentificationAnswer = (item, index, answers) => {
    let answer = document.getElementById(`identification_${index}`).value
    console.log(index, answer)
    answers.set(index, answer)
}

 */


function nextPageButton() {
    const nextPage = document.createElement('nextPageButton')
    nextPage.classList.add("roundedFixedBtn");
    nextPage.classList.add("fixedButtonRight");
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
        // console.log(studentSession['identificationAnswers'])
        document.body.innerHTML = ''
        multipleChoiceExamStart()
    })

    body.append(nextPage)
}

export { renderIdentificationItem, nextPageButton }