import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

exports.handler = async (event, context) => {
    let APIEndpoint = `https://api.github.com/repos/jayzces/${event.queryStringParameters.repo}/contents?access_token=${process.env.VUE_APP_ACCESS_TOKEN}`
    return fetch(APIEndpoint)
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
        let name = JSON.stringify(data[i].name)
        if (name.includes('preview')) {
            return data[i].download_url
        }
    }
    return 'none'
}