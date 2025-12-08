const JOB_CONTAINER = document.querySelector(".recent__articles");

const ARTICLE_TEMPLATE = document.getElementById("article-template");

const FILTER_BTNS = document.querySelectorAll(".btn-filter");

const FILTER_BTNS_COUNT = FILTER_BTNS.length;

document.addEventListener("DOMContentLoaded", getData);

let jobs = [];
let filteredJobs = [];
let filterList = [];

function getData() {
  jobs = JSON.parse(localStorage.getItem("jobs"));
  renderHandler(jobs);
  let url = new URL(window.location.href);
  url.searchParams.delete("tech");
  window.history.replaceState({}, "", url);
  searchParamGet();
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
  if (!event.target.matches("button")) return;
  let genre = event.target.dataset.technology;

  if (!filterList.includes(genre)) filterList.push(genre);
  else {
    let index = filterList.indexOf(genre);
    filterList.splice(index, 1);
  }

  const filterListLength = filterList.length;

  if (!filterListLength || filterListLength === FILTER_BTNS_COUNT) {
    renderHandler(jobs);
    activeBtnHandler(event);
    filterList = [];
  } else {
    filteredJobs = jobs.filter((job) =>
      job.technology.some((tech) => filterList.includes(tech))
    );
    renderHandler(filteredJobs);
    activeBtnHandler(event);
  }
  searchParamSet();
}

const BUTTONS = FILTERS.querySelectorAll("button");

function activeBtnHandler(event) {
  if (!event.target.matches("button")) return;
  if (event.target.classList.contains("active")) {
    event.target.classList.remove("active");
  } else {
    event.target.classList.add("active");
  }
  const filterListLength = filterList.length;
  if (filterListLength === FILTER_BTNS_COUNT) {
    FILTER_BTNS.forEach((filter) => filter.classList.remove("active"));
  }
}

function searchParamSet() {
  let url = new URL(window.location.href);
  url.searchParams.delete("tech");
  filterList.forEach((tech) => url.searchParams.append("tech", tech));
  window.history.replaceState({}, "", url);
  if (filterList.length < 1) {
    url.searchParams.delete("tech");
    localStorage.removeItem("searchParams");
  } else {
    localStorage.setItem("searchParams", url.search);
  }
}

function searchParamGet() {
  let storage = localStorage.getItem("searchParams");

  if (storage) {
    let params = new URLSearchParams(localStorage.getItem("searchParams"));
    let url = new URL(window.location.href);
    url.search = params.toString();
    window.history.replaceState({}, "", url);
    filterList = [...params.getAll("tech")];
  }
  filterList.forEach((filter) =>
    FILTER_BTNS.forEach((btn) => {
      if (btn.dataset.technology === filter) {
        btn.classList.add("active");
      }
    })
  );

  if (filterList.length > 0) {
    filteredJobs = jobs.filter((job) =>
      job.technology.some((tech) => filterList.includes(tech))
    );
    renderHandler(filteredJobs);
  } else {
    renderHandler(jobs);
  }
}
