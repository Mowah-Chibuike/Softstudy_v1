const Main = document.getElementById("main");
const Form = document.getElementById("form");
const Email = document.getElementById("email");
const Password = document.getElementById("password");
const Terms = document.getElementById("terms");
const Submit = document.getElementById("submit");
const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");
const authMsg = document.getElementById("auth-message");
const authText = document.getElementById("auth-text");

const takenTest = false;
const showMsg = () => {
  authMsg.style.visibility = "visible";
};
const hideMsg = () => {
  authMsg.style.visibility = "hidden";
};
const disable = () => {
  if (!Terms.checked) {
    Submit.disabled = true;
  }
};
try {
  Main.addEventListener("load", disable());
} catch (error) {}
try {
  Form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
} catch (error) {}

let allowSubmit = false;
const inputValidation = () => {
  let obj = {};
  new FormData(Form).forEach((value, key) => (obj[key] = value));
  const payload = JSON.stringify(obj);
  Email.value.length < 1
    ? ((msg1.innerText = "Please fill in this field"),
      (allowSubmit = false),
      (Email.value = ""))
    : ((allowSubmit = true), (msg1.innerText = ""), (Email.value = ""));
  Password.value.length < 1
    ? ((msg2.innerText = "Please fill in this field"),
      (allowSubmit = false),
      (Password.value = ""))
    : ((allowSubmit = true), (msg2.innerText = ""), (Password.value = ""));
  if (allowSubmit) {
    fetch("https://Softstudy.herokuapp.com/api/learners/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    })
      .then((response) => response.json())
      .then((user) => {
        const { status, data, token } = user;

        if (status === "success") {
          const { learner } = data;
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("dateOfBirth", learner.dateOfBirth);
          sessionStorage.setItem("email", learner.email);
          sessionStorage.setItem("firstName", learner.firstName);
          sessionStorage.setItem("lastName", learner.lastName);
          sessionStorage.setItem("takenTest", false);
          //   sessionStorage.setItem("id", learner.id);
          //   sessionStorage.setItem("token", token);
          authText.innerText = "Authencation successful";
          authText.style.color = "green";
          setTimeout(showMsg, 0);
          setTimeout(hideMsg, 3000);
          setTimeout(() => {
            if (!takenTest) {
              window.location.replace(
                "../Personality-test/Personality-test1.html"
              );
            } else {
              window.location.replace("../index.html");
            }
          }, 1000);
        } else {
          authText.innerText = "Authencation failed";
          authText.style.color = "red";
          setTimeout(showMsg, 1000);
          setTimeout(hideMsg, 3000);
        }
      });
  }
};
try {
  Terms.addEventListener("click", () => {
    Terms.checked ? (Submit.disabled = false) : (Submit.disabled = true);
  });
} catch (error) {}
try {
  Submit.addEventListener("click", inputValidation);
} catch (error) {}
