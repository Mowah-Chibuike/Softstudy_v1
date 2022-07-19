const Main = document.getElementById("main");
const radios = document.querySelectorAll("input[type='radio']");
const set1 = document.getElementById("set1");
const set2 = document.getElementById("set2");
const completionBar = document.getElementById("speed");
const Form = document.getElementById("form");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const Submit = document.getElementById("submit");
const authMsg = document.getElementById("auth-message");
const authText = document.getElementById("auth-text");

let que_count = 0;
let check1 = false;
let check2 = false;
let check3 = false;
let check4 = false;
let check5 = false;
let check6 = false;
let check7 = false;
let check8 = false;
let check9 = false;
let check10 = false;

const disable = () => {
  if (que_count !== 5) {
    next.disabled = true;
  }
  if (que_count !== 10) {
    Submit.disabled = true;
  }
};

const userState = () => {
  console.log(createLink("Sign Up", "Softstudy-sign-up/sign-up.html"));
  console.log(createPTag("Sign Out", "sign-out"));

  if (loggedIn === null) {
    signUp.innerText = "";
    signUp.append(createLink("Sign Up", "../Softstudy-sign-up/sign-up.html"));
  } else {
    signIn.style.visibility = "hidden";
    signUp.innerText = "";
    signUp.append(createPTag("Sign Out", "sign-out"));
    signUp.addEventListener("click", () => {
      const Token = sessionStorage.getItem("token");
      fetch("https://Softstudy.herokuapp.com/api/learners/me/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Token,
        },
      })
        .then((response) => response.json())
        .then((info) => {
          const { status } = info;
          if (status === "success") {
            sessionStorage.clear();
            authText.innerText = "You have logged out succesfully";
            authText.style.color = "green";
            setTimeout(showMsg, 0);
            setTimeout(hideMsg, 3000);
            setTimeout(() => {
              window.location.replace("./index.html");
            }, 0);
          } else {
            authText.innerText = "Unable to log out";
            authText.style.color = "red";
            setTimeout(showMsg, 0);
            setTimeout(hideMsg, 3000);
          }
        })
        .catch(() => {
          authText.innerText = "Something went wrong";
          authText.style.color = "red";
          setTimeout(showMsg, 0);
          setTimeout(hideMsg, 3000);
        });
    });
  }
};

const loadFunc = () => {
  disable();
  userState();
};

Main.addEventListener("load", loadFunc());

Form.addEventListener("submit", function (e) {
  e.preventDefault();
});

const nextSlide = () => {
  const question1 = document.querySelectorAll(
    "input[name = 'bestFormOfLearning']"
  );
  const question2 = document.querySelectorAll(
    "input[name = 'bestReadingTime']"
  );
  const question3 = document.querySelectorAll(
    "input[name = 'likeOrganizationTools']"
  );
  const question4 = document.querySelectorAll(
    "input[name = 'canManageExamsPressure']"
  );
  const question5 = document.querySelectorAll(
    "input[name = 'meetLikeMindedPersons']"
  );
  const question6 = document.querySelectorAll(
    "input[name = 'likeStudyGroups']"
  );
  const question7 = document.querySelectorAll(
    "input[name = 'completeTaskBeforeRelaxing']"
  );
  const question8 = document.querySelectorAll(
    "input[name = 'preparationPreference']"
  );

  const question9 = document.querySelectorAll(
    "input[name = 'struggleWithDeadline']"
  );
  const question10 = document.querySelectorAll("input[name = 'likeStudying']");
  if (!check1) {
    question1.forEach((item) => {
      if (item.checked) {
        check1 = true;
        que_count++;
      }
    });
  }

  if (!check2) {
    question2.forEach((item) => {
      if (item.checked) {
        check2 = true;
        que_count++;
      }
    });
  }

  if (!check3) {
    question3.forEach((item) => {
      if (item.checked) {
        check3 = true;
        que_count++;
      }
    });
  }

  if (!check4) {
    question4.forEach((item) => {
      if (item.checked) {
        check4 = true;
        que_count++;
      }
    });
  }

  if (!check5) {
    question5.forEach((item) => {
      if (item.checked) {
        check5 = true;
        que_count++;
      }
    });
  }

  if (!check6) {
    question6.forEach((item) => {
      if (item.checked) {
        check6 = true;
        que_count++;
      }
    });
  }

  if (!check7) {
    question7.forEach((item) => {
      if (item.checked) {
        check7 = true;
        que_count++;
      }
    });
  }

  if (!check8) {
    question8.forEach((item) => {
      if (item.checked) {
        check8 = true;
        que_count++;
      }
    });
  }

  if (!check9) {
    question9.forEach((item) => {
      if (item.checked) {
        check9 = true;
        que_count++;
      }
    });
  }

  if (!check10) {
    question10.forEach((item) => {
      if (item.checked) {
        check10 = true;
        que_count++;
      }
    });
  }

  if (que_count >= 4) {
    next.disabled = false;
  }

  if (que_count >= 9) {
    Submit.disabled = false;
  }

  completionBar.style.width = `${(que_count / 10) * 100}%`;
};

const showMsg = () => {
  authMsg.style.visibility = "visible";
};
const hideMsg = () => {
  authMsg.style.visibility = "hidden";
};

Main.addEventListener("change", nextSlide);
next.addEventListener("click", () => {
  set1.style.display = "none";
});
previous.addEventListener("click", () => {
  set1.style.display = "block";
});
Submit.addEventListener("click", () => {
  let obj = {};
  new FormData(Form).forEach((value, key) => (obj[key] = value));
  const payload = JSON.stringify(obj);
  const Token = sessionStorage.getItem("token");

  fetch("https://Softstudy.herokuapp.com/api/learners/me/personality-test", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
    body: payload,
  })
    .then((response) => response.json())
    .then((data) => {
      const { status } = data;
      if (status === "success") {
        authText.innerText = "Test submitted successfully";
        authText.style.color = "green";
        setTimeout(showMsg, 0);
        setTimeout(hideMsg, 3000);
        sessionStorage.setItem("personalityTest", true);
        setTimeout(() => {
          window.location.replace("./AfterTest.html");
        }, 500);
      } else {
        authText.innerText = "Test submission failed";
        authText.style.color = "red";
        setTimeout(showMsg, 0);
        setTimeout(hideMsg, 4000);
      }
    })
    .catch((error) => {
      console.log(error);
      authText.innerText = "Something went wrong, please try again";
      authText.style.color = "red";
      setTimeout(showMsg, 0);
      setTimeout(hideMsg, 4000);
    });
});
