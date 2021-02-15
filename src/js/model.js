import { API_URL } from "./config.js";
import { getData } from "./helper.js";

export const state = {
  randAdvice: "",
  search: {
    results: [],
    totalRes: 0,
    query: "",
  },
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
    console.log(data);

    if (!data.slips) throw new Error(`${data.message.text}`);

    state.search.results = data.slips.map((ad) => {
      return {
        id: ad.id,
        adviceRes: ad.advice,
      };
    });
    state.search.totalRes = data.total_results;
  } catch (err) {
    console.error(err);
  }
};

// query: "life"
// slips: (11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// total_results: "11"
