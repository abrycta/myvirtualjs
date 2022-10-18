// store a reference to our file handle
let multiChoiceExam = {}
let identificationExam = {}
let enumerationExam = {}
/*
function parseJSON(input) {
    let file = input.target.files[0];

    let reader = new FileReader();

    // read File object as Text
    // contents are stored in the
    // result property of reader
    reader.readAsText(file);

    reader.onload = function() {
        return function(e) {
            examPart = JSON.parse(reader.result)
            console.log(examPart)
        }
    };

    // handler when an error occurs
    reader.onerror = function() {
        console.log(reader.error);
    };

    return examPart

}
*/
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
        console.log(temp)
        if(temp.type === "multi-choice") Object.assign(multiChoiceExam, temp)
        else if (temp.type === "identification") Object.assign(identificationExam, temp)
        else Object.assign(enumerationExam, temp)
    } catch(e) {
        console.warn(e.message)
    }
}

export { JSONHandler, multiChoiceExam, enumerationExam, identificationExam}