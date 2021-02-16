import { CommonView } from "./commonView";

class HeaderView extends CommonView {
  _parentEl = document.querySelector(".header");
  renderCap(data) {
    this._data = data;
    this._parentEl.querySelector(".header__caption").innerHTML = this._data;
  }
  addHandlerSearchHome(handler) {
    this._parentEl
      .querySelector(".form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        handler();
      });
  }
}

export default new HeaderView();
