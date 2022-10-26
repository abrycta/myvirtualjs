import {multipleChoiceExamStart} from "./multipleChoiceExam.js";
import {multiChoiceExam} from "./testproper.js";

const matchingExam = JSON.parse(localStorage.getItem('matchingExam'))
const body = document.body


const item = document.querySelector('.item')
if (item){
    item.addEventListener('dragstart', dragStart)
}
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id)
    setTimeout(() => {
        e.target.classList.add('hide')
    }, 0)
}
const boxes = document.querySelectorAll('.box')
boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver)
    box.addEventListener('dragleave', dragLeave)
    box.addEventListener('drop', drop)
})
function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over')
}
function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over')
}
function dragLeave(e) {
    e.target.classList.remove('drag-over')
}
function drop(e) {
    e.target.classList.remove('drag-over')
    const id = e.dataTransfer.getData('text/plain')
    const draggable = document.getElementById(id)
    e.target.appendChild(draggable)
    draggable.classList.remove('hide')
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
    const htmlItem = document.createElement('div2')

    htmlItem.innerHTML=`
        <h3>${item.Answer}</h3>
        <div class = "drop-targets" id = "dropTarget"></div>
    `
    body.append(htmlItem)
}

const renderChoice = (item, index) => {
    const choiceItem = document.createElement('div1')
    choiceItem.innerHTML=`
        <h2 class="item" id="item" draggable="true">${item.Choice}</h2>
    `
    body.append(choiceItem)
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
    nextPage.addEventListener('click', () => {
        document.body.innerHTML = '';
        multiChoiceExam['questions'].forEach((item) => {
            renderMatchingItem(item,
                multiChoiceExam['questions'].indexOf(item))
        })
        // multipleChoiceExamStart()
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

export {matchingTypeExam}
