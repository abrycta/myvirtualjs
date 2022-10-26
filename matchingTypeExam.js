import {multipleChoiceExamStart} from "./multipleChoiceExam.js";
import {multiChoiceExam} from "./testproper.js";
import {studentSession} from "./testproper.js";
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

// const body = document.body
// function allowDrop(ev) {
//     ev.preventDefault();
// }
//
// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }
//
// function drop(ev) {
//     ev.preventDefault();
//     let data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
// }
//
// let dragE = document.createElement("div1")
// dragE.setAttribute("ondrop", "drop(event)")
// dragE.setAttribute("ondragover", "allowDrop(event)")
// dragE.setAttribute("id", "div1")
//
// let dragE2 = document.createElement("div2")
// dragE2.setAttribute("ondrop", "drop(event)")
// dragE2.setAttribute("ondragover", "allowDrop(event)")
// dragE2.setAttribute("id", "div2")
//
// let dropE = document.createElement("item")
// dropE.setAttribute("draggable", "true")
// dropE.setAttribute("ondragstart", "drag(event)")
// dropE.innerText = "sheesh"
//
//
// body.append(dragE)
// body.append(dragE2)
// body.append(dropE)

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
            choiceItem.draggable = true;
            choiceItem.innerHTML = answer;
            choiceItem.addEventListener('dragstart', dragStart) // Apply event listener
            dropTarget.append(choiceItem);
        }
    }
    
    // Add an event listener for watching the drop thingies
    
    dropTarget.addEventListener('dragenter', dragEnter)
    dropTarget.addEventListener('dragover', dragOver)
    dropTarget.addEventListener('dragleave', dragLeave)
    dropTarget.addEventListener('drop', drop)
}



const renderChoice = (item, index) => {
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
    returnPage.innerText = "Return"
    returnPage.addEventListener('click', () => {
        window.location.href = "./testproper.html"
    })
    body.append(returnPage)
}


function backButton() {
    const nextPage = document.createElement('backButton')
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
        // Experimental Code
        let selectedElements = document.querySelectorAll("[id^='dropTarget']")
        let index = 0
        console.log("Drop Targetaaa",selectedElements)
        selectedElements.forEach((item) => {
            try{
                let indexV = null // for storing old index of the answer
                let has_data =  item.hasChildNodes() // check if the question has an answer
                let value = null
                if (has_data){
                    value = item.firstChild.innerHTML
                    indexV = item.firstChild.id
                }
                if (value != null){
                    studentSession['matchingAnswers'].set(index, [value, indexV])
                }
                
                index++
            }catch (TypeError){

            }
            
        })
        
        document.body.innerHTML = ''
        multipleChoiceExamStart()
    })


    body.append(nextPage)
}

function submitButton() {
    const submitPage = document.createElement('submitButton')
    submitPage.innerText = "Submit"
    submitPage.addEventListener('click', () => {
        window.location.href = "./testproper.html"
    })
    body.append(submitPage)
}

function matchingTypeExam() {
    console.log(matchingExam.questions)

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
    submitButton()
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

