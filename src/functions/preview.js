import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

exports.handler = async (event, context) => {
    let APIEndpoint = `https://api.github.com/repos/jayzces/${event.queryStringParameters.repo}/contents?client_id=${process.env.VUE_APP_CLIENT_ID}&client_secret=${process.env.VUE_APP_CLIENT_SECRET}`
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