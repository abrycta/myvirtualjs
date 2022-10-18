// store a reference to our file handle
let examPart;

function parseJSON(input) {
    let file = input.files[0];

    let reader = new FileReader();

    // read File object as Text
    // contents are stored in the
    // result property of reader
    reader.readAsText(file);

    reader.onload = function() {
        examPart = JSON.parse(reader.result)
    };

    // handler when an error occurs
    reader.onerror = function() {
        console.log(reader.error);
    };

    return examPart

}

export { parseJSON }