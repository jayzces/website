import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const API_ENDPOINT = `https://api.github.com/users/jayzces/repos?sort=pushed`

exports.handler = async (event, context) => {
    return fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => ({
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `${process.env.VUE_APP_ACCESS_TOKEN}`
            }
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }))
}