export const getData = async function (url) {
  try {
    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) throw new Error(`ERROR ${res.status}`);

    return data;
  } catch (err) {
    throw err;
  }
};
