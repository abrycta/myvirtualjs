// JSON Handler abstracted into another file
// JSON Handler is the event handler for the onload event of buttons
// Feature written by Kurt
import {JSONHandler, exams} from "./jsonparser.js"

let aggregatedExamStatistics = {
    // after every student is done with their exam instance,
    // append the sessionObject examSession to this array
    // for processing
    studentSessions: []
}

// store a reference to the body node
const body = document.body

// logic for first button
var uploadJSONButton1 = document.createElement("input")
uploadJSONButton1.setAttribute("type", "file")
uploadJSONButton1.addEventListener("change", JSONHandler)

// logic for second button
var uploadJSONButton2 = document.createElement("input")
uploadJSONButton2.setAttribute("type", "file")
uploadJSONButton2.addEventListener("change", JSONHandler)

// logic for second button
var uploadJSONButton3 = document.createElement("input")
uploadJSONButton3.setAttribute("type", "file")
uploadJSONButton3.addEventListener("change", JSONHandler)

// append unique buttons to the body node
body.append(uploadJSONButton1)
body.append(uploadJSONButton2)
body.append(uploadJSONButton3)

// button for initializing exams
var initexam = document.createElement('button') // create a button that
initexam.setAttribute("type", "button") // will execute the logic upon click
initexam.innerText = "Initialize Exam"
// execute this function when the button is called
initexam.addEventListener('click', () => {
    // test if files are complete
    if(exams.length !== 3) alert("Insufficient files")
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
        localStorage.setItem('aggregatedExamStatistics',
            JSON.stringify(aggregatedExamStatistics)
        )
        window.open('./testproper.html')
    }
    // logger function
})

// append button to body node
body.append(initexam)