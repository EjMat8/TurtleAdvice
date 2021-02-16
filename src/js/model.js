import { API_URL } from "./config.js";
import { getData } from "./helper.js";

export const state = {
  randAdvice: "",
  search: {
    results: [],
    totalRes: 0,
    query: "",
    page: 1,
    resultsPerPage: 6,
  },
  selectedAdvice: "",
};

export const loadRandomAdvice = async function () {
  try {
    const {
      slip: { advice },
    } = await getData(API_URL);

    state.randAdvice = advice;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const searchURL = `${API_URL}/search/${query}`;
    const data = await getData(searchURL);
    // console.log(data);

    if (!data.slips) throw new Error(`${data.message.text}`);

    state.search.results = data.slips.map((ad) => {
      return {
        id: ad.id,
        adviceRes: ad.advice,
      };
    });
    state.search.totalRes = data.total_results;
  } catch (err) {
    throw err;
  }
};

export const searchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
export const loadSelectedAdvice = function (id) {
  const selectedAdvice = state.search.results.find((ad) => ad.id === +id);
  console.log(selectedAdvice);
  state.selectedAdvice = selectedAdvice.adviceRes;
};
// https://api.adviceslip.com/advice/{slip_id}
// query: "life"
// slips: (11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// total_results: "11"
