export class CommonView {
  _errorEl = document.querySelector(".advice-box");
  show() {
    this._parentEl.classList.remove("hidden");
  }
  hide() {
    this._parentEl.classList.add("hidden");
  }
  getQuery() {
    const query = this._parentEl.querySelector(".form__input").value;
    this._clear();
    return query;
  }

  _clear() {
    this._parentEl.querySelector(".form__input").value = "";
  }
  clearError() {
    this._errorEl.innerHTML = "";
  }
  renderError() {
    const markup = `<p class="error">
      Sadly, I could not find what you were looking for :(
    </p>`;
    this.clearSpinner();
    this.clearContent();
    this._activateHome();
    this._errorEl.insertAdjacentHTML("afterbegin", markup);
  }
}
