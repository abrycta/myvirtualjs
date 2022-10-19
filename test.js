import {JSONHandler, exams} from "./scripts/exam/jsonparser.js"
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




var test = document.createElement('button')
test.setAttribute("type", "button")
test.addEventListener('click', () => {
    console.log("exams: ",exams)
    localStorage.setItem("exams", JSON.stringify(exams))
    console.log("localstorage: ",localStorage)
    console.log("localstorage e:",localStorage.getItem('exams'))
    console.log(JSON.parse(localStorage.getItem("exams")))
})


body.append(test)