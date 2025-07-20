const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Get the RIDB API key from environment variables
  const RIDB_API_KEY = process.env.RIDB_API_KEY;

  // Fallback error if environment variable is missing
  if (!RIDB_API_KEY) {
    throw new Error("RIDB_API_KEY environment variable is not set.");
  }

  // Log to Netlify functions console for debugging
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
