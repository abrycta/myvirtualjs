// Module created by Lupin, Jade
let accounts = JSON.parse(localStorage.getItem("accounts")).accounts
let attempt = 3; // set available attempts to 3

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
    let name = ""
    console.log(username, password)
    let isValid = false;

    for (let i = 0; i < accounts.length; i++) {
        console.log(username, accounts[i].username, password, accounts[i].password)
        if (username === accounts[i].username && password === accounts[i].password) { // validate accounts
            isValid = true;
            name = accounts[i].name
            break;
        }
    }

    // access appropriate scripts depending on type of account
    if (isValid === true) {
        errorMessage.innerText = `Welcome ${name}`;
        errorMessage.style.color = "green";
        localStorage.setItem("loggedInUser", name);
        if (username === "admin"){
            window.location = "/teacher/index.html";
        }else {
            window.location = "/test/index.html"; // if valid, redirect to index.html
        }
    // disable form if no more attempts are left
    } else {
        attempt--;
        errorMessage.innerText = `Account combination invalid. ${attempt} attempts left.`;
        errorMessage.style.color = "white";
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

document.getElementById('loginButton').addEventListener('click', validateAccount)