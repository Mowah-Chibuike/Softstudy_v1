const Main = document.getElementById("main");
const authMsg = document.getElementById("auth-message");
const authText = document.getElementById("auth-text");
const Test = document.getElementById("test");
const authMsg2 = document.getElementById("auth-message2");
const authText2 = document.getElementById("auth-text2");
const Test2 = document.getElementById("test2");

const Token = sessionStorage.getItem("token");

const userState = () => {
  console.log(createLink("Sign Up", "Softstudy-sign-up/sign-up.html"));
  console.log(createPTag("Sign Out", "sign-out"));

  if (loggedIn === null) {
    signUp.innerText = "";
    signUp.append(createLink("Sign Up", "Softstudy-sign-up/sign-up.html"));
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

const showMsg = () => {
  authMsg.style.visibility = "visible";
};
const showMsg2 = () => {
  authMsg2.style.visibility = "visible";
};
const hideMsg = () => {
  authMsg.style.visibility = "hidden";
};
const hideMsg2 = () => {
  authMsg2.style.visibility = "hidden";
};

const userTest = () => {
  if (loggedIn === null) {
    authText.innerText = "Please Sign In";
    setTimeout(showMsg, 0);
    setTimeout(hideMsg, 3000);
    setTimeout(() => {
      window.location.replace("Softstudy-sign-up/sign-in.html");
    }, 1000);
  } else {
    fetch("https://Softstudy.herokuapp.com/api/learners/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        const personalityTest = sessionStorage.getItem("personalityTest");
        if (personalityTest !== "undefined") {
          authText.innerText = "You have already taken the test";
          setTimeout(showMsg, 0);
          setTimeout(hideMsg, 3000);
        } else {
          window.location.replace("Personality-test/Personality-test1.html");
        }
      });
  }
};

const userTest2 = () => {
  if (loggedIn === null) {
    authText2.innerText = "Please Sign In";
    setTimeout(showMsg2, 0);
    setTimeout(hideMsg2, 3000);
    setTimeout(() => {
      window.location.replace("Softstudy-sign-up/sign-in.html");
    }, 1000);
  } else {
    fetch("https://Softstudy.herokuapp.com/api/learners/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        // const { personalityTest } = user;
        const personalityTest = sessionStorage.getItem("personalityTest");
        if (personalityTest === "undefined" || personalityTest !== "null") {
          window.location.replace("Personality-test/Personality-test1.html");
        } else {
          authText2.innerText = "You have already taken the test";
          setTimeout(showMsg2, 0);
          setTimeout(hideMsg2, 3000);
        }
      });
  }
};
(() => console.log(Token))();
Test.addEventListener("click", userTest);
Test2.addEventListener("click", userTest2);
Main.addEventListener("load", userState());
