const JOB_CONTAINER = document.querySelector(".recent__articles");

const ARTICLE_TEMPLATE = document.getElementById("article-template");

document.addEventListener("DOMContentLoaded", getData);

let jobs = [];
let filteredJobs = [];

function getData() {
  jobs = JSON.parse(localStorage.getItem("jobs"));
  renderHandler(jobs);
}

function renderHandler(input) {
  JOB_CONTAINER.innerHTML = "";
  input.forEach((job) => {
    const jobEl = document.importNode(ARTICLE_TEMPLATE.content, true);
    jobEl.querySelector("img").setAttribute("src", job.image);
    jobEl.querySelector(".article-recent__company--intro-name").textContent =
      job.companyName;
    jobEl.querySelector(".article-recent__company--intro-type").textContent =
      job.type;
    jobEl.querySelector("h3").textContent = job.title;
    jobEl.querySelector("ul>li").textContent = job.location;
    jobEl.querySelector(".article-recent__pref--arrangement").textContent =
      job.arrangement;
    jobEl.querySelector("span.article-recent__spot").textContent = new Date(
      job.createdAt
    ).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const params = new URLSearchParams("id=" + job.id);

    jobEl
      .querySelector("a")
      .setAttribute("href", `../Jobpage/index.html?${params}`);

    JOB_CONTAINER.appendChild(jobEl);
  });
}

const FILTERS = document.querySelector(".filter__list");

FILTERS.addEventListener("click", (event) => filterHandler(event));

function filterHandler(event) {
  if (event.target.matches("button")) {
    let genre = event.target.dataset.technology;
    if (genre === "all") {
      renderHandler(jobs);
    } else {
      filteredJobs = jobs.filter((item) => item.technology.includes(genre));
      renderHandler(filteredJobs);
    }
  }
  activeBtnHandler(event);
}

const BUTTONS = FILTERS.querySelectorAll("button");

function activeBtnHandler(event) {
  let activeBtn = event.target;
  if (!activeBtn.matches(".filter__list")) {
    BUTTONS.forEach((btn) => btn.classList.remove("active"));
    activeBtn.classList.add("active");
  }
}
