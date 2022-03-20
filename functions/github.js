import fetch from 'node-fetch'

const API_ENDPOINT = `https://api.github.com/users/jayzces/repos?sort=pushed`

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, {
    headers: {
      'Authorization': `${process.env.GITHUB_ACCESS_TOKEN}`
    }
  })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }))
}
