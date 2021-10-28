const { google } = require('googleapis');

exports.handler = async function handler(event) {
  const qsp = event.queryStringParameters;

  const gcs = google.customsearch({
    version: 'v1',
    auth: process.env.CSE_API_KEY,
  });

  const listParams = {
    cx: process.env.ENGINE_ID,
    q: !qsp.l || qsp.l !== 'all' ? `${qsp.q} more:${qsp.l}`: (qsp.q),
    ...(qsp.s && { start: qsp.s })
  };
  const results = await gcs.cse.siterestrict.list(listParams);

  const response = {
    statusCode: 200,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(results.data),
  };
  return response;
};
