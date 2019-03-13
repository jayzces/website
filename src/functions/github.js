import fetch from 'node-fetch'

const API_ENDPOINT = "https://api.github.com/users/jayzces/repos?sort=pushed&client_id=476b7cc4fe0874323a1e&client_secret=b4f2157ae723324aa8a43f70ed744724027b366d"

exports.handler = async (event, context) => {
    return fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => ({
            statusCode: 200,
            body: `${JSON.stringify(data)}`
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }))
};