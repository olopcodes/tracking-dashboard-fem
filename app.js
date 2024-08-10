const buttons = document.querySelectorAll("button");
const topicsData = [];
const dashboard = document.querySelector(".dashboard");

let timeframe = "weekly";

buttons.forEach((b) => {
  b.addEventListener("click", async (e) => {
    removeActiveClass();
    e.target.classList.add("active");

    timeframe = e.target.dataset.timeframe;
    const topics = document.querySelectorAll("[data-topic]");
    topics.forEach((el) => el.remove());

    const data = await getData();
    displayTimeFrameData(data);
  });
});

async function getData() {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
}

function displayTimeFrameData(data) {
  data.forEach((d, i) => {
    const div = document.createElement("div");
    div.classList.add("dashboard-item");
    const title =
      data[i].title.toLowerCase() === "self care" ? "self-care" : data[i].title;

    div.dataset.topic = title;
    if (data[i].title.toLowerCase() === "self care") {
      console.log("self-care");
    }

    div.innerHTML = `
        <div class="dashboard-img">
          <img src="./images/icon-${title.toLowerCase()}.svg" alt="">
        </div>
        <div class="dashboard-content">
          <div class="dashboard-content-heading">
            <p class="dashboard-content-title">${title}</p>
            <img src="./images/icon-ellipsis.svg" alt="elipsis">
          </div>
          <h2 class="dashboard-content-time">
            ${data[i].timeframes[timeframe].current}hrs
          </h2>
          <p class="dashboard-content-description">
            last week - ${data[i].timeframes[timeframe].previous}hrs
          </p>
        </div>
    `;
    dashboard.append(div);
  });
}

function removeActiveClass() {
  buttons.forEach((b) => {
    b.classList.remove("active");
  });
}

(async function () {
  const data = await getData();
  displayTimeFrameData(data);
})();
