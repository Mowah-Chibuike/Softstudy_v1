const userName = document.getElementById("username");
const Main = document.getElementById("main");
const Home = document.getElementById("home");

const firstName =
  sessionStorage.getItem("firstName").charAt(0).toUpperCase() +
  sessionStorage.getItem("firstName").slice(1);
const LoggedIn = sessionStorage.getItem("loggedIn");

const displayName = () => {
  LoggedIn ? (userName.innerText = firstName) : (userName.innerText = "there");
};

Main.addEventListener("load", displayName());

Home.addEventListener("click", () => {
  window.location.replace("../index.html");
});
