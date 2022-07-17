const Main = document.getElementById("main");
const Form = document.getElementById("form");
const Email = document.getElementById("email");
const Password = document.getElementById("password");
const Submit = document.getElementById("submit");
const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");
const authMsg = document.getElementById("auth-message");
const authText = document.getElementById("auth-text");
const loader = document.getElementById("loader-container");

const show = (Msg) => {
  Msg.style.visibility = "visible";
};
const hide = (Msg) => {
  Msg.style.visibility = "hidden";
};

const showMsg = () => {
  authMsg.style.visibility = "visible";
};
const hideMsg = () => {
  authMsg.style.visibility = "hidden";
};

const showError = (message) => {
  hide(loader);
  authText.innerText = message;
  authText.style.color = "red";
  setTimeout(showMsg, 1000);
  setTimeout(hideMsg, 3000);
};
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
    show(loader);
    fetch("https://Softstudy.herokuapp.com/api/learners/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    })
      .then((response) => response.json())
      .then((user) => {
        const { status, data } = user;

        if (status === "success") {
          const { learner, token } = data;
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("dateOfBirth", learner.dateOfBirth);
          sessionStorage.setItem("email", learner.email);
          sessionStorage.setItem("firstName", learner.firstName);
          sessionStorage.setItem("lastName", learner.lastName);
          sessionStorage.setItem("personalityTest", learner.personalityTest);
          sessionStorage.setItem("id", learner.id);
          sessionStorage.setItem("token", token);
          authText.innerText = "Authencation successful";
          authText.style.color = "green";
          hide(loader);
          setTimeout(showMsg, 1000);
          setTimeout(hideMsg, 3000);
          const personalityTest = sessionStorage.getItem("personalityTest");
          setTimeout(() => {
            if (personalityTest === "undefined") {
              window.location.replace(
                "../Personality-test/Personality-test1.html"
              );
            } else {
              window.location.replace("../index.html");
            }
          }, 1000);
        } else if (
          status === "error" &&
          user.message === "Invalid email or password"
        ) {
          showError("Invalid Email or Password");
        } else {
          showError("Authentication failed");
        }
      })
      .catch((error) => {
        console.log(error);
        showError("Something went wrong");
      });
  }
};

try {
  Submit.addEventListener("click", inputValidation);
} catch (error) {}
