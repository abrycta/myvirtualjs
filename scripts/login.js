let attempt = 3; // set available attempts to 3

function jsonToArray() {
    $.getJSON('accounts.json', function(json) {
        var array = [];
        for (var key in json) {
            if (json.hasOwnProperty(key)) {
                var item = json[key];
                array.push({
                    username: item.Username,
                    password: item.Password
                });
            }
        }
    });
}

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
