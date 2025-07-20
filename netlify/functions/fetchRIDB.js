const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = "45315405-be74-484f-8302-fb72ce14c6b7";
  
  // ✅ DEBUG OUTPUT — this goes to the Netlify logs
  console.log("RIDB_API_KEY:", RIDB_API_KEY ? "Received ✅" : "Missing ❌");

  const RIDB_ENDPOINT = 'https://ridb.recreation.gov/api/v1/facilities?limit=10';

  try {
    const response = await fetch(RIDB_ENDPOINT, {
      headers: {
        apikey: RIDB_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`RIDB request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

