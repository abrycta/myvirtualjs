// module written by Kurt
let exams = []  // store exam part objects into an exam array

function addExams(examPart) {
    if (exams.length === 3) return
    // if the part has a type property that matches the array, accept
    if (!["multi-choice", "identification", "matching"]
        .some(e => e.type === examPart.type)) {
        // second check, if the file already exists in the array, reject
        if (!exams.some(e => e.type === examPart.type)) exams.push(examPart)
        else alert("File already loaded.")
    } else alert("Invalid file")
    console.log(exams.length)
}

// called function abstracted to handle
// a FileReader object
// The FileReader has async methods which can only be
// accessed through async functions, and returns values
// through Promise objects
const parseJSON = (input) => {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
        // execute when an I/O error occurs
        reader.onerror = () => {
            reject(console.log("error"));
        }
        // when the executor function returns true,
        // the promise is fulfilled, and resolved() is called
        reader.onload = () => resolve(JSON.parse(reader.result))

        // async function that initiates the actual JSON parsing
        // from a File Object, via the FileReader Object
        reader.readAsText(input)
    })
}

// async function for handling a FileReader object
// this function will be used as a handler for a button
// This handler primarily processes Promise objects
// that hold the values parsed by a FileReader object
const JSONHandler = async (input) => {
    let file = input.target.files[0]

    try {
        let temp = await parseJSON(file)
        addExams(temp)
        // console.log(exams)
    
    } catch(e) {
        console.warn(e.message)
    }
}

// export the handler
// exams contain the parsed questions and answers
// in the form of an array
export { JSONHandler, exams}
