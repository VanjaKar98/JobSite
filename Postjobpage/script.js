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

  console.log(jobData);

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

function setData() {
  FORM[0].value = "Frontend Developer";
  FORM[1].value = "Varaždin";
  FORM[2].value = "On-site";
  FORM[3].value = "Full-time";
  FORM[4].value = "Hickle, Bailey and Considine";
  FORM[5].value =
    "We create mobile applications that solve everyday problems using simple design. We test every feature extensively to ensure smooth performance. We focus on delivering fast, reliable, and secure apps. We work closely with users to add new improvements. We believe that technology should make life easier, not more complicated.";
  FORM[6].value = "React,   javascript, c++";
  FORM[7].value = "john@doe.com";
  FORM[8].value = "https://avatars.githubusercontent.com/u/83152088";
}
