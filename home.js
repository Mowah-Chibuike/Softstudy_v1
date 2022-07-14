const authMsg = document.getElementById("auth-message");
const authText = document.getElementById("auth-text");
const Test = document.getElementById("test");
const authMsg2 = document.getElementById("auth-message2");
const authText2 = document.getElementById("auth-text2");
const Test2 = document.getElementById("test2");

const takenTest = false;

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
  } else if (takenTest) {
    authText.innerText = "You have already taken the test";
    setTimeout(showMsg, 0);
    setTimeout(hideMsg, 3000);
  } else {
    window.location.replace("Personality-test/Personality-test1.html");
  }
};

const userTest2 = () => {
  if (loggedIn === null) {
    authText2.innerText = "Please Sign In";
    setTimeout(showMsg2, 0);
    setTimeout(hideMsg2, 3000);
    // setTimeout(() => )
  } else if (takenTest) {
    authText2.innerText = "You have already taken the test";
    setTimeout(showMsg2, 0);
    setTimeout(hideMsg2, 3000);
  } else {
    window.location.replace("Personality-test/Personality-test1.html");
  }
};

Test.addEventListener("click", userTest);
Test2.addEventListener("click", userTest2);
