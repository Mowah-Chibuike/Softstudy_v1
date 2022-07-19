const Main = document.getElementById("main");

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

Main.addEventListener("load", userState());
