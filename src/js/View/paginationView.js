class PaginationView {
  _parentEl = document.querySelector(".pagination");
  renderPages(data) {
    this._data = data;
    const markup = this._generatePages();
    if (!markup) return;

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  addHandlerPage(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination__button");
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  clearPagination() {
    this._parentEl.innerHTML = "";
  }
  _generatePages() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (curPage === 1 && numPages > 1) {
      return `<button class="pagination__button pagination__button--left" data-goto = ${
        curPage + 1
      }>
      Page ${curPage + 1} &rarr;
            </button>`;
    }
    if (curPage === numPages && numPages > 1) {
      return `<button class="pagination__button pagination__button--left" data-goto = "${
        curPage - 1
      }">
      &larr; Page ${curPage - 1}
        
      </button>`;
    }
    if (curPage > 1 && numPages > 1) {
      return `<button class="pagination__button pagination__button--left" data-goto = "${
        curPage - 1
      }">
                    &larr; Page ${curPage - 1}
                </button>
                <button class="pagination__button pagination__button--right" data-goto = "${
                  curPage + 1
                }">
                 Page ${curPage + 1} &rarr;
             </button>`;
    }
    return "";
  }
}

export default new PaginationView();
/*
<button class="pagination__button pagination__button--left">
              &larr; Page N
            </button>
            <button class="pagination__button pagination__button--right">
              Page N &rarr;
          </button> 
          */
