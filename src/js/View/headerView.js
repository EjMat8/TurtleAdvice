class HeaderView {
  _parentEl = document.querySelector(".header");
  renderCap(data) {
    this._data = data;
    this._parentEl.querySelector(".header__caption").innerHTML = this._data;
  }

  getQuery() {
    const query = this._parentEl.querySelector(".form__input").value;
    this._clear();
    return query;
  }
  addHandlerSearch(handler) {
    const callbackFunc = function (e) {
      e.preventDefault();
      this._parentEl.classList.add("hidden");
      handler();
    };
    this._parentEl
      .querySelector(".form")
      .addEventListener("submit", callbackFunc.bind(this));
  }

  _clear() {
    this._parentEl.querySelector(".form__input").value = "";
  }
}

export default new HeaderView();
