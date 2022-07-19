const hamburger = document.querySelector(".hamburger");
const navigation = document.getElementById("navigation");
// const Main = document.getElementById("main");
const signUp = document.getElementById("sign-up");
const signIn = document.getElementById("sign-in");

const loggedIn = sessionStorage.getItem("loggedIn");

const classToggle = () => {
  hamburger.classList.toggle("active");
  navigation.classList.toggle("show");
};

hamburger.addEventListener("click", classToggle);

const createPTag = (text, pId) => {
  const p = document.createElement("p");
  p.append((document.textContent = text));
  p.setAttribute("id", pId);

  return p;
};

const createLink = (text, link) => {
  const a = document.createElement("a");
  a.append((document.textContent = text));
  a.setAttribute("href", link);

  return a;
};

// Main.addEventListener("load", userState());
