// JSON Handler abstracted into another file
// JSON Handler is the event handler for the onload event of buttons
// Feature written by Kurt
import {JSONHandler, exams} from "./test/jsonparser.js"

let aggregatedExamStatistics = new Map();

// store a reference to the body node
var container = document.createElement("div")
const body = document.body
body.append(container)

var title = document.createElement("h2")
title.innerHTML = "Exam Initialization: Upload Json Files"
title.style.textAlign = "center";
container.append(title)

// logic for first button
var uploadJSONButton1 = document.createElement("input")
uploadJSONButton1.classList.add("buttonA")
uploadJSONButton1.classList.add("inputA")
uploadJSONButton1.setAttribute("type", "file")
uploadJSONButton1.addEventListener("change", JSONHandler)

// logic for second button
var uploadJSONButton2 = document.createElement("input")
uploadJSONButton2.classList.add("buttonA")
uploadJSONButton2.classList.add("inputA")
uploadJSONButton2.setAttribute("type", "file")
uploadJSONButton2.addEventListener("change", JSONHandler)

// logic for second button
var uploadJSONButton3 = document.createElement("input")
uploadJSONButton3.classList.add("buttonA")
uploadJSONButton3.classList.add("inputA")
uploadJSONButton3.setAttribute("type", "file")
uploadJSONButton3.addEventListener("change", JSONHandler)

var studentCredentials = document.createElement("input")
studentCredentials.classList.add("buttonA")
studentCredentials.classList.add("inputA")
studentCredentials.setAttribute("type", "file")
studentCredentials.addEventListener("change", JSONHandler)

// append unique buttons to the body node
container.append(uploadJSONButton1)
container.append(uploadJSONButton2)
container.append(uploadJSONButton3)
container.append(studentCredentials)

// button for initializing exams
var initexam = document.createElement('buttonA') // create a button that
initexam.classList.add("buttonA")
initexam.setAttribute("type", "button") // will execute the logic upon click
initexam.innerText = "Initialize Exam"
// execute this function when the button is called
initexam.addEventListener('click', () => {
    console.log(exams)
    // test if files are complete
    if(exams.length !== 4) alert("Insufficient files")
    else {
        localStorage.setItem('identificationExam',
            JSON.stringify(
                exams.find(part => part.type === "identification")
            )
        )
        localStorage.setItem('matchingExam',
            JSON.stringify(
                exams.find(part => part.type === "matching")
            )
        )
        localStorage.setItem('multiChoiceExam',
            JSON.stringify(
                exams.find(part => part.type === "multi-choice")
            )
        )
        localStorage.setItem('accounts',
            JSON.stringify(
                exams.find(part => part.type === "accounts")
            )
        )
        localStorage.setItem('aggregatedExamStatistics',
            JSON.stringify(Array.from(aggregatedExamStatistics.entries()) )
        )
        window.open('./login/index.html')
    }
    // logger function
})
console.log(aggregatedExamStatistics)
// append button to body node
container.append(initexam)