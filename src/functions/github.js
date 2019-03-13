import fetch from 'node-fetch'

const API_ENDPOINT = "https://api.github.com/users/jayzces/repos?sort=pushed"

exports.handler = async (event, context) => {
    return fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => ({
            statusCode: 200,
            body: `${JSON.stringify(data)}`
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }))
};