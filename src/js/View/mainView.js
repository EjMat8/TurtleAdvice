import { mark } from "regenerator-runtime";
import { CommonView } from "./commonView.js";
import headerView from "./headerView.js";
import icons from "url:../../img/sprite.svg";

class MainView extends CommonView {
  _parentEl = document.querySelector(".results");

  renderResults(data) {
    this._data = data;
    const markup = this._generateResultsMarkup();
    if (!markup) return;
    this._parentEl.querySelector(".advice-box").innerHTML = "";
    this._parentEl.querySelector(".form__button--back").classList.add("hidden");

    this._parentEl
      .querySelector(".query-list")
      .insertAdjacentHTML("afterbegin", markup);

    this._activateHome();
  }
  _homeCallBack(e) {
    // e.preventDefault();
    if (!e.target.closest(".form__button--home")) return;
    this.hide();
    headerView.show();
  }

  _activateHome() {
    this._parentEl.addEventListener("click", this._homeCallBack.bind(this));
  }
  addHandlerRender(handler) {
    ["hashchange"].forEach((ev) => window.addEventListener(ev, handler));
  }

  renderAdvice(data) {
    this._adData = data;
    const markup = this._generateAdviceMarkup();
    if (!markup) return;
    this._parentEl.querySelector(".query-list").innerHTML = "";
    this._parentEl.querySelector(".pagination").innerHTML = "";
    this._parentEl.querySelector(".advice-box").innerHTML = "";
    this._parentEl
      .querySelector(".form__button--back")
      .classList.remove("hidden");

    this._parentEl
      .querySelector(".advice-box")
      .insertAdjacentHTML("afterbegin", markup);

    this._parentEl
      .querySelector(".form__button--back")
      .addEventListener("click", this.renderResults.bind(this, this._data));
  }

  addHandlerSearchMain(handler) {
    this._parentEl
      .querySelector(".form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        handler("main");
      });
  }
  renderSpinner() {
    this._parentEl.querySelector(".query-list").innerHTML = "";
    this._parentEl.querySelector(".form").insertAdjacentHTML(
      "afterend",
      `<div class="spinner">
        <svg class="spinner__icon">
          <use href="${icons}#icon-spinner9"></use>
        </svg>
      </div>`
    );
  }
  clearSpinner() {
    this._parentEl.querySelector(".spinner").remove();
  }

  _generateAdviceMarkup() {
    return `<p class="advice-box__advice">
                ${this._adData.selectedAdvice}
            </p>
            <button class="btn-inline">COPY</button>`;
  }

  _generateResultsMarkup() {
    return this._data
      .map((ad) => {
        return `<li class="query-list__item">
              <a href="#${ad.id}" class="query-list__link"
                >${ad.adviceRes}</a
              >
            </li>`;
      })
      .join("");
  }
}
export default new MainView();
