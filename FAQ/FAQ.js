const FAQs = [
  {
    summary: "What is Softstudy?",
    details:
      " Softstudy is an online learning platform designed to ease student's learning process and also provides convenient and relatable courses tolearn",
  },
  {
    summary: "How much does it cost to use Soft Study?",
    details: "It is totally free.",
  },
  {
    summary: "What does Soft Study offer students?",
    details:
      "Soft study offers students a cnducive and self paced learning environment. It also help students choose the best courses suitable for learning taking the personality test",
  },
  {
    summary: "How do they help students before exams?",
    details:
      "Soft study help students before exams by making available the required course with questions to be answered after completing the course.",
  },
  {
    summary: "How does Soft Study create personalized learning plans?",
    details:
      "Personalized learning plans are created from student's results from their personality tests.",
  },
  {
    summary:
      "What is the difference between Soft study and other online learning website?",
    details:
      "Soft study helps tackle a course and help create similar question which will help broaden a student's knowledge of answering real-time exam questions. ",
  },
  {
    summary: "What kinds of support does Soft Study provide?",
    details:
      "Soft study help makes the learning process seamless, encouraging and easy.",
  },
  {
    summary: "How do I use Soft Study?",
    details:
      "The application has been designed for self paced easy. It is PC and mobile friendly.",
  },
  {
    summary: "What are the benefit of Soft Study?",
    details: "It is a seamless study, Self-paced, and Improved IQ",
  },
  {
    summary:
      "Who is providing reading assistance for students before and during exams?",
    details:
      "Soft Study is the smartest way to approach exam time. Our platform is designed to help you make the most of your time so you can get the grades you want. With Soft Study, you can be confident that you are studying in the most effective way possible.",
  },
];

let filteredArray = [];
const main = document.getElementById("main");
const questions = document.getElementById("questions");
const search = document.getElementById("search");
const btn = document.getElementById("btn");

const createDetails = (a, b) => {
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  const img = document.createElement("img");
  const paragraph = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");

  img.setAttribute("src", "assets/add.svg");
  span1.setAttribute("class", "text");
  span2.setAttribute("class", "add-icon");
  span1.append(document.createTextNode(a));
  span2.append(img);
  summary.append(span1, span2);
  paragraph.append(document.createTextNode(b));
  details.append(summary, paragraph);
  questions.append(details);
};
const mapArray = () =>
  FAQs.map((item) => {
    const { summary, details } = item;
    createDetails(summary, details);
  });

const filterArray = () => {
  console.log(search.value);
  filteredArray = FAQs.filter((item) => {
    return item.summary.toLowerCase().includes(search.value.toLowerCase());
  });
};
console.log(filteredArray);

const createFromFilter = () => {
  console.log(filteredArray);
  filteredArray.map((item) => {
    const { summary, details } = item;
    createDetails(summary, details);
  });
};

main.addEventListener("load", mapArray());

search.addEventListener("change", function () {
  if (search.value.length === 0) {
    questions.innerText = "";
    mapArray();
  } else {
    filterArray();
  }
});

btn.addEventListener("click", function () {
  if (search.value.length === 0) {
    questions.innerText = "";
    mapArray();
  } else {
    questions.innerText = "";
    createFromFilter();
    setTimeout(function () {
      search.value = "";
      questions.innerText = "";
      mapArray();
    }, 10000);
  }
});
