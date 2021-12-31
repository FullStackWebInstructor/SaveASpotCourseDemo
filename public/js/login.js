

function login() {
    const emailInput = document.querySelector("#email-input");
    const passwordInput = document.querySelector("#login-password");
    const email = emailInput.value;
    const password = passwordInput.value;

    const validationResult = validate(email, password);

    if (validationResult) {
        // send HTTP request
        axios.post("/login", {
            email: email,
            password: password
        }).then(() => {
            window.location.href = "/spots";
        }).catch((e) => {
            alert(`Login failed: ${e.response.data.result}`);
        });
    }
}

function validate(email, password) {
    if (!email.includes("@")) {
        alert("email input must include @");
        return false;
    }

    if (password.length < 6) {
        alert("password must be at least 6 characters");
        return false;
    }

    return true;
}

