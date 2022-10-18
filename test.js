import {JSONHandler, identificationExam, enumerationExam, multiChoiceExam} from "./scripts/exam/jsonparser.js"
const body = document.body

var uploadJSONButton1 = document.createElement("input")
uploadJSONButton1.setAttribute("type", "file")
uploadJSONButton1.addEventListener("change", JSONHandler)

var uploadJSONButton2 = document.createElement("input")
uploadJSONButton2.setAttribute("type", "file")
uploadJSONButton2.addEventListener("change", JSONHandler)

var uploadJSONButton3 = document.createElement("input")
uploadJSONButton3.setAttribute("type", "file")
uploadJSONButton3.addEventListener("change", JSONHandler)

body.append(uploadJSONButton1)
body.append(uploadJSONButton2)
body.append(uploadJSONButton3)

console.log(identificationExam, enumerationExam, multiChoiceExam)

localStorage.setItem('identificationExam', identificationExam)
localStorage.setItem('enumerationExam', enumerationExam)
localStorage.setItem('multichoiceExam', multiChoiceExam)

