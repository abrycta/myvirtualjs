let attempt = 3;

/**
 * clears username and password input field
 */

function clear() {
    document.getElementById("loginUser").value = "";
    document.getElementById("loginPassword").value = "";
}

//Todo: reads csv files and return user & password combination

/**
 * Validate username and password combination input
 */

function validateAccount() {
    let username = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPassword").value;

    if (username === "placeholderUsername" && password === "placeholderPassword") { // determines if username and password combination input is valid
        alert("login successfully");
        window.location = "index.html"; // if valid, redirect to index.html
    } else {
        attempt--;
        alert(`You have ${attempt} attempts left.`);
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
