const fetch = require("node-fetch");

let cache = {}; // Defined outside the function globally

exports.handler = async function(event, context) {
  try {
    const { page } = event.queryStringParameters;
    if (cache[page]) {
      return {
        headers: {
          "USED-CACHE": "true"
        },
        statusCode: 200,
        body: JSON.stringify(cache[page])
      };
    }

    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=6&order_by=latest`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();
    cache[page] = data;

    return {
      headers: {
        "USED-CACHE": "false"
      },
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
