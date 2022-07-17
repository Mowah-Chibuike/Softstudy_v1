const Body = document.getElementById("body");
const Form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const Email = document.getElementById("email");
const Birthday = document.getElementById("birthday");
const Password = document.getElementById("password");
const Terms = document.getElementById("terms");
const Submit = document.getElementById("submit");
const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");
const msg3 = document.getElementById("msg3");
const msg4 = document.getElementById("msg4");
const msg5 = document.getElementById("msg5");
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
const disable = () => {
  if (!Terms.checked) {
    Submit.disabled = true;
  }
};
Body.addEventListener("load", disable());
Form.addEventListener("submit", function (e) {
  e.preventDefault();
});
let allowSubmit = false;

const inputValidation = () => {
  let obj = {};
  new FormData(Form).forEach((value, key) => (obj[key] = value));
  const payload = JSON.stringify(obj);
  firstName.value.length < 1
    ? ((msg1.innerText = "Please fill in this field"),
      (allowSubmit = false),
      (firstName.value = ""))
    : ((allowSubmit = true), (msg1.innerText = ""), (firstName.value = ""));
  lastName.value.length < 1
    ? ((msg2.innerText = "Please fill in this field"),
      (allowSubmit = false),
      (lastName.value = ""))
    : ((allowSubmit = true), (msg2.innerText = ""), (lastName.value = ""));
  Email.value.length < 1 || !Email.value.includes("@")
    ? ((msg3.innerText = "Please enter a valid Email address"),
      (allowSubmit = false),
      (Email.value = ""))
    : ((allowSubmit = true), (msg3.innerText = ""), (Email.value = ""));
  Birthday.value.length < 1
    ? ((msg4.innerText = "Please fill in this field"),
      (allowSubmit = false),
      (Birthday.value = ""))
    : ((allowSubmit = true), (msg4.innerText = ""), (Birthday.value = ""));

  Password.value.length < 7
    ? ((msg5.innerText =
        "Password must contain up to 8 characters containing alphabets(a-z), numbers(0-9) and atleast a symbol(/..)"),
      (allowSubmit = false),
      (Password.value = ""))
    : ((allowSubmit = true), (msg5.innerText = ""), (Password.value = ""));
  console.log(allowSubmit);
  if (allowSubmit) {
    show(loader);
    fetch("https://Softstudy.herokuapp.com/api/learners/sign-up", {
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
          sessionStorage.setItem("id", learner.id);
          sessionStorage.setItem("personalityTest", learner.personalityTest);
          sessionStorage.setItem("token", token);
          authText.innerText = "Registration Successful";
          authText.style.color = "green";
          hide(loader);
          setTimeout(showMsg, 0);
          setTimeout(hideMsg, 3000);
          setTimeout(() => {
            window.location.replace("../index.html");
          }, 1000);
        } else if (
          status === "error" &&
          user.message === "Email already exist!"
        ) {
          showError("Email address already exists");
        } else {
          showError("Registration failed");
        }
      })
      .catch(() => {
        showError("Something went wrong");
      });
  }
};

Terms.addEventListener("click", () => {
  Terms.checked ? (Submit.disabled = false) : (Submit.disabled = true);
});

Submit.addEventListener("click", inputValidation);
// fetch("", {
//   method: "post",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     email: "",
//     password: "",
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {});
