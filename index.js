let newUserEmailEl = document.getElementById("newUserEmail");
let newUserPasswordEL = document.getElementById("newUserPassword");
let userInputEmailEl = document.getElementById("inputEmail");
let userInputPasswordEL = document.getElementById("inputPassword");
let createBtnElement = document.getElementById("createBtn");
let loginBtnElement = document.getElementById("loginBtn");
let createBtnContainerElement = document.getElementById("createBtnContainer");
let errorMsgParaElement = document.getElementById("errorMsg");
let loginForgotParaElement = document.getElementById("loginForgotPara");
let accountCreatedMsgEl = document.getElementById("accountCreatedMsg");

let user = {
    email: null,
    password: null,
};

function getDatabase() {
    let stringifiedDatabaseObject = localStorage.getItem("databaseObject");
    let parsedDatabaseObject = JSON.parse(stringifiedDatabaseObject);
    if (parsedDatabaseObject === null) {
        return {};
    } else {
        return parsedDatabaseObject;
    }
}

let database = getDatabase();

function createAndAppendUserDetails() {
    user.email = newUserEmailEl.value;
    user.password = newUserPasswordEL.value;
    database.user = user;
    newUserEmailEl.value = "";
    newUserPasswordEL.value = "";
    localStorage.setItem("databaseObject", JSON.stringify(database));

    accountCreatedMsgEl.classList.remove("d-none");
    let backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    backBtn.classList.add("btn", "btn-dark");
    backBtn.setAttribute("onclick", "display('sectionLogin')");

    createBtnContainerElement.appendChild(backBtn);
}
createBtnElement.addEventListener("click", createAndAppendUserDetails);

function checkInDatabase() {
    let storedEmail = database.user.email;
    let storedPassword = database.user.password;
    if (storedEmail === userInputEmailEl.value && storedPassword === userInputPasswordEL.value) {
        errorMsgParaElement.textContent = "";
        loginForgotParaElement.classList.add("d-none");

        loginBtnElement.setAttribute("onclick", "display('sectionHome')");
        console.log(loginBtnElement)

        //userInputEmailEl.value = "";
        //userInputPasswordEL.value = "";
    } else if (userInputEmailEl.value === "" || userInputPasswordEL.value === "") {
        alert("Enter valid Credentials :)");
    } else {
        errorMsgParaElement.textContent = "Credentials doesn't match ";
        loginForgotParaElement.classList.remove("d-none");

    }
    accountCreatedMsgEl.classList.add("d-none");
}
loginBtnElement.addEventListener("click", checkInDatabase);