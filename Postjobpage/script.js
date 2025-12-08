const FORM = document.querySelector(".form__input");

const MESSAGE_TEMPLATE = document.getElementById("message-template");

const MAIN_ELEMENT = document.querySelector("main");

FORM.addEventListener("submit", (event) => formHandler(event));

function formHandler(event) {
  event.preventDefault();
  let data = new FormData(FORM);
  let jobData = Object.fromEntries(data.entries());
  jobData.createdAt = new Date().toISOString();
  jobData.technology = jobData.technology
    .trim()
    .replaceAll(" ", "")
    .toLowerCase()
    .split(",");
  if (!jobData.hasOwnProperty("spotlight")) {
    jobData.spotlight = false;
  }
  postHandler(jobData);
  FORM.reset();
}
let apiUrl = new URL("https://68d037faec1a5ff33826c70e.mockapi.io/Jobs");

async function postHandler(input) {
  try {
    let response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) throw new Error("Error during posting occured");

    handlePostMessage();
  } catch (error) {
    console.log(error + "occured");
  }
}

function handlePostMessage() {
  const message = document.importNode(MESSAGE_TEMPLATE.content, true);
  MAIN_ELEMENT.appendChild(message);
  let messageWindow = document.querySelector(".message-container");
  setTimeout(() => messageWindow.remove(), 2000);
}
