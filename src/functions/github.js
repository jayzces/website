import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const API_ENDPOINT = `https://api.github.com/users/jayzces/repos?sort=pushed&client_id=${process.env.VUE_APP_CLIENT_ID}&client_secret=${process.env.VUE_APP_CLIENT_SECRET}`

exports.handler = async (event, context) => {
    return fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => ({
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=604800'
            }
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }))
}