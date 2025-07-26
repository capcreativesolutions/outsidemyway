const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const API_KEY = process.env.RIDB_API_KEY;
  const states = ["TX", "NM", "AZ", "UT", "CO", "AR", "MO"]; // add/remove states here
  const limit = 200;
  const pagesPerState = 3; // fetch 200 * 3 = 600 per state
  const allResults = [];

  for (const state of states) {
    for (let i = 0; i < pagesPerState; i++) {
      const offset = i * limit;
      const url = `https://ridb.recreation.gov/api/v1/facilities?state=${state}&limit=${limit}&offset=${offset}`;
      try {
        const res = await fetch(url, {
          headers: { apikey: API_KEY }
        });
        const json = await res.json();
        if (json.RECDATA && json.RECDATA.length > 0) {
          allResults.push(...json.RECDATA);
        } else {
          break; // stop paging if no more results
        }
      } catch (err) {
        console.error(`Failed to fetch ${state} offset ${offset}`, err);
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ RECDATA: allResults })
  };
};
