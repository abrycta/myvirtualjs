let attempt = 3; // set available attempts to 3

const csvUserFile = document.getElementById("csvUserInput");
const myForm = document.getElementById("myForm");

function csvToArray(str, delimiter = ",") {
    /**
     * slice from start of text to the first \n index
     * use split to create an array from string by delimiter
     */
    const headers = str.slice(0, str.indexOf("\n").split(delimiter));

    /**
     * slice from \n index + 1 to the end of the text
     * use split to create an array of each csv value row
     */
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // return the array
    return rows.map(function (row) {
        const values = row.split(delimiter);
        return headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
    });
}

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvUserFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        const data = csvToArray(text);
        document.write(JSON.stringify(data));
    };

    reader.readAsText(input);
});

/**
 * clears username and password input field
 */
function clear() {
    document.getElementById("loginUser").value = "";
    document.getElementById("loginPassword").value = "";
}

/**
 * Validate username and password combination input
 */
function validateAccount() {
    let username = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPassword").value;
    let errorMessage = document.getElementById("errorMessage");

    //Todo: compare username to elements in array. csvToArray()
    if (username === csvToArray() && password === "placeholderPassword") { // determines if username and password combination input is valid
        errorMessage.innerText = `Welcome ${username}`;
        errorMessage.style.color = "green";
        alert("login successfully");
        window.location = "index.html"; // if valid, redirect to index.html
    } else {
        attempt--;
        errorMessage.innerText = `Account combination invalid. ${attempt} attempts left.`;
        errorMessage.style.color = "red";
        clear();
    }

    /**
     * disables login if there's 0 attempts left.
     */
    if (attempt === 0) {
        document.getElementById("loginUser").disabled = true;
        document.getElementById("loginPassword").disabled = true;
        document.getElementById("loginButton").disabled = true;
        return false;
    }
}
