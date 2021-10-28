const { google } = require('googleapis');

exports.handler = async function handler(event, context, callback) {
  const qsp = event.queryStringParameters;

  const gcs = google.customsearch({
    version: 'v1',
    auth: process.env.CSE_API_KEY || 'AIzaSyAgT_75BnhkYOUT46Np9tPVQHtuhSQ2VBI	',
  });

  const listParams = {
    cx: process.env.ENGINE_ID || '8fae02a164443be00',
    q: !qsp.l || qsp.l !== 'all' ? `${qsp.q} more:${qsp.l}`: (qsp.q),
    ...(qsp.s && { start: qsp.s })
  };
  const results = await gcs.cse.siterestrict.list(listParams);

  return JSON.stringify(results.data);
};
