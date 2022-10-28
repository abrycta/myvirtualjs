import {multipleChoiceExamStart} from "./multipleChoiceExam.js";
import {identificationExam, multiChoiceExam} from "./testproper.js";
import {studentSession} from "./testproper.js";
import {enforceAccomplishedExam} from "./checker.js";
const matchingExam = JSON.parse(localStorage.getItem('matchingExam'))
const body = document.body

// class has-data


function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id)
    setTimeout(() => {
        e.target.classList.add('hide')
    }, 0)
}

// Functions just for preventing the default mechanism of e
function dragEnter(e) {
    e.preventDefault();

}
function dragOver(e) {
    e.preventDefault();
}
function dragLeave(e) {
    e.target.classList.remove('drag-over')
}

// Function for managing the drop event
function drop(e) {
    e.target.classList.remove('drag-over')

    let has_data =  e.target.hasChildNodes() // for checking if there is already an answer
    const id = e.dataTransfer.getData('text/plain')
    let draggable = document.getElementById(id)
    // if no answer
    if (!has_data){
        
        // Get the parent div and delete it
        let parentDiv = draggable.parentNode
        e.target.appendChild(draggable)
        if (!parentDiv.classList.contains("drop-targets")){ // Prevent from deleting the div of the questions
            parentDiv.remove()
        }
        

        // Re-add Event Listener
        draggable = document.getElementById(id)
        draggable.addEventListener('dragstart', dragStart)

        draggable.classList.remove('hide')
    } else {
        let currentItem = e.target
        swap(currentItem, draggable)
    
    }
    
}


const renderMatchingItem = (item, index) => {

    let previousAnswer = studentSession['matchingAnswers'].get(index)
   
    const htmlItem = document.createElement('div')
    let itemsDiv = document.getElementById("itemsDiv")

    htmlItem.innerHTML=`
        <h3>${item.Answer}</h3>
        <div class = "drop-targets" id = "dropTarget${index}"></div>
    `
    itemsDiv.append(htmlItem)
    let dropTarget = document.getElementById("dropTarget"+index);

    // For Re adding previous answer
    if (previousAnswer){
        let answer = previousAnswer[0]
        let oldIndex = previousAnswer[1] // for making sure oldIndex was copied as used in preventing duplicate
        if (answer != null){ // if there is a previous answer (just a safety net)
            // Create an element by code
            const choiceItem = document.createElement('h2')
            choiceItem.classList.add('item');
            choiceItem.id = oldIndex;
            if (!studentSession['finished']){
            choiceItem.draggable = true;
            }
            choiceItem.innerHTML = answer;
            choiceItem.addEventListener('dragstart', dragStart) // Apply event listener
            dropTarget.append(choiceItem);
        }
    }
    
    
    if (studentSession['finished']){
        let checkItem = studentSession['matchingAnswersCheck'].get(index)

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
            feedbackText.innerHTML = "Correct Answer: " + item.Choice;
            htmlItem.append(feedbackText);
        }
    }else{
        // Add an event listener for watching the drop thingies
        dropTarget.addEventListener('dragenter', dragEnter);
        dropTarget.addEventListener('dragover', dragOver);
        dropTarget.addEventListener('dragleave', dragLeave);
        dropTarget.addEventListener('drop', drop);
    }
    
}



const renderChoice = (item, index) => {
    if (studentSession['finished']){return;}
    let choiceItem = document.getElementById("item"+index); // For checking if there already duplicate (from previous answer)
    let choicesDIv = document.getElementById("choicesDiv")
    if (!choiceItem){ // Only run if no previous answer
        const div = document.createElement('div');
        choiceItem = document.createElement('h2');
        choiceItem.classList.add('item');
        choiceItem.id = "item"+index;
        choiceItem.draggable = true;
        choiceItem.innerHTML = item.Choice;

        choiceItem.addEventListener('dragstart', dragStart) // reapply event listener
        div.append(choiceItem)
        choicesDIv.append(div)
    }
    
}

function returnButton() {
    const returnPage = document.createElement('returnButton')
    returnPage.classList.add("roundedFixedBtn");
    returnPage.classList.add("fixedButtonLeft");
    returnPage.innerText = "Return"
    returnPage.addEventListener('click', () => {
        saveData()
        window.location.href = "/login/index.html"
    })
    
    body.append(returnPage)
}


function backButton() {
    const nextPage = document.createElement('backButton')
    nextPage.classList.add("roundedFixedBtn");
    nextPage.classList.add("fixedButtonRight");
    nextPage.innerText = "Back"
    /*
    nextPage.addEventListener('click', () => {
        // save progress
        let selectedElements = document.querySelectorAll("[name^='multiForm_']")
        let index = 0
        let prevItem
        console.log(selectedElements)
        /*
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
        
    }) */

    nextPage.addEventListener('click', () => {
        saveData();
        
        document.body.innerHTML = ''
        const htmlItem = document.createElement('div')
        htmlItem.innerHTML = `
            <h2 class="center">Multiple Choice</h2>
            <h2 class="center">${multiChoiceExam['instructions']}</h2> 
            `
        body.append(htmlItem)
        multipleChoiceExamStart()
    })


    body.append(nextPage)
}
function saveData(){
    // Experimental Code
    let selectedElements = document.querySelectorAll("[id^='dropTarget']")
    let index = 0
    console.log(studentSession['matchingAnswers'])
    selectedElements.forEach((item) => {
        try{
            let indexV = null // for storing old index of the answer
            let has_data =  item.hasChildNodes() // check if the question has an answer
            let value = null
            if (has_data) {
                value = item.firstChild.innerHTML
                indexV = item.firstChild.id
            }
            if (value != null) {
                studentSession['matchingAnswers'].set(index, [value, indexV])
            }
            
            index++
        }catch (TypeError){

        }
        
    })
}
function submitButton() {
    const submitPage = document.createElement('submitButton')
    submitPage.classList.add("fixedButtonCenter")
    submitPage.classList.add("roundedFixedBtn")
    submitPage.innerText = "Submit"
    submitPage.addEventListener('click', () => {
        saveData();
        // window.location.href = "./index.html"
        enforceAccomplishedExam(studentSession)
    })
    body.append(submitPage)
}

function matchingTypeExam() {

    const htmlItem = document.createElement('div')
    htmlItem.innerHTML = `
    <h2 class="center">Matching Type</h2>
    <h2 class="center">${matchingExam['instructions']}</h2> 
    `
    body.append(htmlItem)
    // For 2 column div currently is not responsive for mobile screens
    const container = document.createElement('span');
    container.style.display = "flex"
    const itemsDiv = document.createElement('span');
    itemsDiv.id = "itemsDiv"
    const choicesDiv = document.createElement('span');
    choicesDiv.id = "choicesDiv"
    choicesDiv.style.margin = 0;

    itemsDiv.style.flexGrow = 1;
    choicesDiv.style.flexGrow = 1;
    choicesDiv.style.height = 100%

    container.appendChild(itemsDiv)
    container.appendChild(choicesDiv)
    body.append(container)

    // start matching type exam
    matchingExam['questions'].forEach((item) => {
        renderMatchingItem(item,
            matchingExam['questions'].indexOf(item))
    })

    matchingExam['questions'].forEach((item) => {
        renderChoice(item,
            matchingExam['questions'].indexOf(item))
    })
    returnButton()
    backButton()
    if (!studentSession['finished']){submitButton()}
}

function swap(nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
}

export {matchingTypeExam}

