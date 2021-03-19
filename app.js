import fetchFollowers from "./fetchFollowers.js";
import displayFollowers from "./displayFollowers.js";
import paginate from "./paginate.js";
import displayButtons from "./displayButtons.js";

const title = document.querySelector(".section-title h1");

const btnContainer = document.querySelector(".btn-container");
let index = 0;
let pages = [];
const init = async () => {
  const followers = await fetchFollowers();
  title.textContent = "pagination";
  pages = paginate(followers);
  console.log(pages);
  setupUI();
};

const setupUI = () => {
  displayFollowers(pages[index]);
  displayButtons(btnContainer, pages, index);
};

btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-btn")) {
    index = parseInt(e.target.dataset.index);
    setupUI();
  }
  if (e.target.classList.contains("prev-btn")) {
    index = index - 1;
    if (index < 0) {
      index = pages.length - 1;
    }
    setupUI();
  }
  if (e.target.classList.contains("next-btn")) {
    index = index + 1;
    if (index > pages.length - 1) {
      index = 0;
    }
    setupUI();
  }
});
window.addEventListener("load", init);
