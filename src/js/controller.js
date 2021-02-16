// const header = document.querySelector(".header");
// const main = document.querySelector(".results");
// document.querySelector(".form__button").addEventListener("click", function (e) {
//   e.preventDefault();
//   header.classList.add("hidden");
//   main.classList.remove("hidden");
// });

// document
//   .querySelector(".form__button--home")
//   .addEventListener("click", function (e) {
//     e.preventDefault();
//     header.classList.remove("hidden");
//     main.classList.add("hidden");
//   });

import * as model from "./model.js";
import headerView from "./View/headerView.js";
import mainView from "./View/mainView.js";
import paginationView from "./View/paginationView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const controlOnLoadCaption = async function () {
  try {
    await model.loadRandomAdvice();
    // console.log(model.state.randAdvice);
    headerView.renderCap(model.state.randAdvice);
  } catch (err) {
    console.error(err);
  }
};

const controlSearch = async function (view = "header") {
  try {
    const query = view === "main" ? mainView.getQuery() : headerView.getQuery();
    if (!query) return;

    history.replaceState(null, null, " ");

    if (view === "header") {
      headerView.hide();
      mainView.show();
    }
    mainView.renderSpinner();
    await model.loadSearchResults(query);
    mainView.clearSpinner();

    paginationView.clearPagination();
    mainView.renderResults(model.searchResultsPage(1));
    paginationView.renderPages(model.state.search);
    // console.log(model.state.search);
  } catch (err) {
    mainView.renderError();
  }
};

const controlAdvice = async function () {
  try {
    mainView.clearContent();
    const id = window.location.hash.slice(1);
    if (!id) return;
    model.loadSelectedAdvice(id);

    mainView.renderAdvice(model.state);
  } catch (err) {
    mainView.renderError();
  }
};

const controlPages = function (page) {
  mainView.clearContent();
  mainView.renderResults(model.searchResultsPage(page));
  paginationView.renderPages(model.state.search);
};

const controlBack = function () {
  history.replaceState(null, null, " ");
  paginationView.clearPagination();
  mainView.renderResults(model.searchResultsPage());
  paginationView.renderPages(model.state.search);
};

const init = function () {
  controlOnLoadCaption();
  headerView.addHandlerSearchHome(controlSearch);
  mainView.addHandlerRender(controlAdvice);
  mainView.addHandlerSearchMain(controlSearch);
  paginationView.addHandlerPage(controlPages);
  mainView.addHandlerBack(controlBack);
};

init();

// fetch("https://api.adviceslip.com/advice/search/life")
//   .then((res) => {
//     if (!res.ok) throw new Error(`${res.status}`);
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
