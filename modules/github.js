import bodyParser from 'body-parser'
import fetch from 'node-fetch'

export default function() {
  const { api, token, username } = this.options.privateRuntimeConfig.github
  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json'
  }
  const rootUrl = this.options.publicRuntimeConfig.rootUrl

  this.nuxt.hook('render:setupMiddleware', app => {
    app.use(bodyParser.json())
    app.use('/api/projects', getProjects)
    app.use('/api/previews', getPreview)
  })

  function getPreview(req, res) {
    const repo = req._parsedUrl.query.split('=')[1]
    fetch(`${api}/repos/${username}/${repo}/contents`, { headers })
      .then(response => unWrap(response))
      .then(parsedResponse => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', rootUrl)
        res.end(JSON.stringify({
          ...parsedResponse,
          body: getUrl(parsedResponse.body)
        }))
      })
      .catch(err => res.end(errorResponse(err)))
  }

  function getProjects(req, res) {
    const { hits, page } = req.body
    const url = `${api}/users/${username}/repos?sort=pushed&per_page=${hits}&page=${page}`

    fetch(url, { headers })
      .then(response => unWrap(response))
      .then(parsedResponse => {
        if (!parsedResponse.ok) {
          res.statusCode = 500
          res.end()
        }

        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', rootUrl)
        res.end(JSON.stringify(parsedResponse))
      })
      .catch(err => res.end(errorResponse(err)))
  }

  const errorResponse = err => {
    return JSON.stringify({
      ok: false,
      status: 400,
      statusText: err.message,
      json: {}
    })
  }

  const getUrl = data => {
    for (let i = 0; i < data.length; i++) {
      const name = JSON.stringify(data[i].name)
      if (name.includes('preview')) return data[i].download_url
    }
    return null
  }

  // still a promise
  const unWrap = response => {
    return response.json().then(json => {
      const { ok, status, statusText } = response
      return { json, ok, status, statusText }
    })
  }
}
