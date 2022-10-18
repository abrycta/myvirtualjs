import { JSONHandler } from "./scripts/exam/jsonparser.js"
const body = document.body

var uploadJSONButton = document.createElement("input")
uploadJSONButton.setAttribute("type", "file")

uploadJSONButton.addEventListener("change", JSONHandler)

body.append(uploadJSONButton)
body.append(uploadJSONButton)
body.append(uploadJSONButton)

