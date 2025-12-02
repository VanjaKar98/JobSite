const LOGO_IMG = document.querySelector("span.article__logo--border>img");

const COMPANY = document.querySelector(".job-article__company--name");

const JOB_TYPE = document.querySelector(".article-jobs__type");

const JOB_LOCATION = document.querySelector(".article-jobs__pref--item");

const DATE = document.querySelector(".article-recent__spot");

const ABOUT_COMPANY_TITLE = document.querySelector(".about>h2");

const ABOUT_COMPANY_DESCRIPTION = document.querySelector(".about>p");

const APPLY_BTNS = document.querySelectorAll(".link-post--large");

document.addEventListener("DOMContentLoaded", searchParamsHandler);

function getData() {
  let data = JSON.parse(localStorage.getItem("jobs"));
  return data;
}

function searchParamsHandler() {
  let data = getData();
  if (!data) {
    alert("Data not found in local storage!!!");
    return;
  }

  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  let job = data.find((job) => job.id === id);
  renderHandler(job);
  handleEmail(job);
}

function renderHandler(job) {
  LOGO_IMG.src = job.image;
  COMPANY.textContent = job.companyName;
  JOB_TYPE.textContent = job.type;
  JOB_LOCATION.textContent = job.location;
  DATE.textContent = new Date(job.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  ABOUT_COMPANY_TITLE.textContent = `About Company ${job.companyName}`;
  ABOUT_COMPANY_DESCRIPTION.textContent = job.companyDescription;
}

function handleEmail(job) {
  APPLY_BTNS.forEach((btn) => (btn.href = `mailto:${job.email}`));
}
