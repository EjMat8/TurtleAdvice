export class CommonView {
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
}
