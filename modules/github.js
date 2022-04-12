import bodyParser from 'body-parser'
import fetch from 'node-fetch'

export default function() {
  const { api, token, username } = this.options.privateRuntimeConfig.github
  const headers = { 'Authorization': `token ${token}` }

  this.nuxt.hook('render:setupMiddleware', app => {
    app.use(bodyParser.json())
    app.use('/api/projects', getProjects)
    app.use('/api/previews', getPreview)
  })

  async function getPreview(req, res) {
    const repo = req._parsedUrl.query.split('=')[1]
    fetch(`${api}/repos/${username}/${repo}/contents`, { headers })
      .then(response => unWrap(response))
      .then(parsedResponse => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          ...parsedResponse,
          body: getUrl(parsedResponse.body)
        }))
      })
      .catch(err => {
        res.statusCode = 400
        res.end()
      })
  }

  function getProjects(req, res) {
    const { hits, page } = req.body
    const url = `${api}/users/${username}/repos?sort=pushed&per_page=${hits}&page=${page}`

    fetch(url, { headers })
      .then(response => unWrap(response))
      .then(parsedResponse => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(parsedResponse))
      })
      .catch(err => {
        res.statusCode = 400
        res.end()
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
    return response.json().then(body => {
      const { ok, status, statusText } = response
      return { body, ok, status, statusText }
    })
  }
}
