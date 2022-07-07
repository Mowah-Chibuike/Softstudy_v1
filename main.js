const hamburger = document.querySelector(".hamburger");
const navigation = document.getElementById("navigation");

const classToggle = () => {
  hamburger.classList.toggle("active");
  navigation.classList.toggle("show");
};

hamburger.addEventListener("click", classToggle);
