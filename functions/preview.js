import fetch from 'node-fetch'

exports.handler = async (event, context) => {
  let APIEndpoint = `https://api.github.com/repos/jayzces/${event.queryStringParameters.repo}/contents`
  return fetch(APIEndpoint, {
    headers: {
      'Authorization': `${process.env.GITHUB_ACCESS_TOKEN}`
    }
  })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: getURL(data),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }))
}

const getURL = data => {
  for (let i = 0; i < data.length; i++) {
    const name = JSON.stringify(data[i].name)
    if (name.includes('preview')) return data[i].download_url
  }
  return 'none'
}
