import { URL } from "../Config/Api";

/**
 *
 * @param {String} query
 * @param {Object} variables
 * @returns
 */
export default async function Fetch({ query, variables = {} }) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer TESTTOKEN`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    method: "POST",
  };
  try {
    const rawResponse = await fetch(URL, options);
    const { data } = await rawResponse.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
