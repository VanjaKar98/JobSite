const FEATURED_CONTAINER = document.querySelector(".featured__articles");

const RECENT_CONTAINER = document.querySelector(".recent__articles");

const FEATURED_TEMPLATE = document.getElementById("article-template1");

const RECENT_TEMPLATE = document.getElementById("article-template2");

document.addEventListener("DOMContentLoaded", fetchHandler);

let jobs = [];

const url = new URL("https://68d037faec1a5ff33826c70e.mockapi.io/Jobs");

async function fetchHandler() {
  try {
    let response = await fetch(url);

    if (!response.ok) throw new Error(`Error occured during fetching!!!`);

    let data = await response.json();
    jobs = data;
    localStorage.setItem("jobs", JSON.stringify(jobs));
    renderFeaturedHandler();
    renderRecentHandler();
  } catch (error) {
    console.log(error + " occured during fetching");
  }
}

function renderFeaturedHandler() {
  FEATURED_CONTAINER.innerHTML = "";
  let spotlightJobs = jobs.filter((job) => job.spotlight);
  let lastIndex = spotlightJobs.length - 1;

  for (let i = lastIndex; i >= lastIndex - 5; i--) {
    const jobEl = document.importNode(FEATURED_TEMPLATE.content, true);
    jobEl.querySelector("img").setAttribute("src", spotlightJobs[i].image);
    jobEl.querySelector(".article-jobs__company--name").textContent =
      spotlightJobs[i].companyName;
    jobEl.querySelector(".article-jobs__company--type").textContent =
      spotlightJobs[i].type;
    jobEl.querySelector("h3").textContent = spotlightJobs[i].title;
    jobEl.querySelector(".article-jobs__pref--location").textContent =
      spotlightJobs[i].location;
    jobEl.querySelector(".article-jobs__pref--arrangement").textContent =
      spotlightJobs[i].arrangement;

    const params = new URLSearchParams("id=" + spotlightJobs[i].id);
    jobEl
      .querySelector("a")
      .setAttribute("href", `../Jobpage/index.html?${params}`);

    FEATURED_CONTAINER.appendChild(jobEl);
  }
}

function renderRecentHandler() {
  RECENT_CONTAINER.innerHTML = "";
  jobs.forEach((job) => {
    const jobEl = document.importNode(RECENT_TEMPLATE.content, true);
    jobEl.querySelector("img").setAttribute("src", job.image);
    jobEl.querySelector(".article-recent__company--intro-name").textContent =
      job.companyName;
    jobEl.querySelector(".article-recent__company--intro-type").textContent =
      job.type;
    jobEl.querySelector("h3").textContent = job.title;
    jobEl.querySelector(".article-recent__pref--location").textContent =
      job.location;
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

    RECENT_CONTAINER.appendChild(jobEl);
  });
}
