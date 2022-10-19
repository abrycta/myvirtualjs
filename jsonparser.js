let exams = []

function addExams(examPart) {
    if (exams.length === 3) return

    if (!["multi-choice", "identification", "matching"]
        .some(e => e.type === examPart.type)) {
        if (!exams.some(e => e.type === examPart.type)) exams.push(examPart)
        else alert("File already loaded.")
    } else alert("Invalid file")
    console.log(exams.length)
}

const parseJSON = (input) => {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.onerror = () => reject(console.log("error"))

        reader.onload = () => resolve(JSON.parse(reader.result))

        reader.readAsText(input)
    })
}

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

export { JSONHandler, exams}
