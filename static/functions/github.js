import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()
exports.handler = async (event, context) => {
  const mainUrl = 'https://api.github.com/users/jayzces/repos?sort=pushed'
  const reqHeaders = {
    'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  }
  const resHeaders = {
    'Access-Control-Allow-Origin': '*'
  }

  if (event.httpMethod === 'POST') {
    const { page, hits } = JSON.parse(event.body)
    const url = `${mainUrl}&per_page=${hits}&page=${page}`
    return fetch(url, { headers: reqHeaders })
      .then(response => response.json())
      .then(data => ({
        statusCode: 200,
        body: JSON.stringify(data),
        headers: resHeaders
      }))
      .catch(err => sendError(422, String(err), resHeaders))
  } else {
    return fetch(mainUrl, { headers: reqHeaders })
      .then(response => response.json())
      .then(data => ({
        statusCode: 200,
        body: JSON.stringify(data),
        headers: resHeaders
      }))
      .catch(err => sendError(422, String(err), resHeaders))
  }
}

const sendError = (statusCode, message, headers) => ({
  statusCode,
  body: JSON.stringify({ error: message }),
  headers
})
