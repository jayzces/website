import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()
exports.handler = async (event, context) => {
  const url = `https://api.github.com/repos/jayzces/${event.queryStringParameters.repo}/contents`
  const reqHeaders = {
    'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  }
  const resHeaders = {
    'Access-Control-Allow-Origin': '*'
  }

  return fetch(url, { headers: reqHeaders })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(getURL(data)),
      headers: resHeaders
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }))
}

const getURL = data => {
  for (let i = 0; i < data.length; i++) {
    let name = JSON.stringify(data[i].name)
    if (name.includes('preview')) return data[i].download_url
  }
  return null
}
