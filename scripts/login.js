let attempt = 3; // set available attempts to 3

var accounts =  [ //temporary
    {
        "username": "user1",
        "password": "pass1"
    },
    {
        "username": "user2",
        "password": "pass2"
    },
    {
        "username": "user3",
        "password": "pass3"
    },
    {
        "username": "admin",
        "password": "admin"
    }
]

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
    let isValid = false;

    for (let i = 0; i < accounts.length; i++) {
        if (username == accounts[i].username && password == accounts[i].password) { // validate accounts
            isValid = true;
            break;
        } 
    } 
    
    if (isValid == true) {
        errorMessage.innerText = `Welcome ${username}`;
        errorMessage.style.color = "green";
        window.location = "index.html"; // if valid, redirect to index.html
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
