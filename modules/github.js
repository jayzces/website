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
    const url = `${api}/repos/${username}/${repo}/contents`

    try {
      const response = await unWrap(await fetch(url, { headers }))
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        ...response,
        body: getUrl(response.body)
      }))
    } catch(err) {
      res.statusCode = 400
      res.end()
    }
  }

  async function getProjects(req, res) {
    const { hits, page } = req.body
    const url = `${api}/users/${username}/repos?sort=pushed&per_page=${hits}&page=${page}`

    try {
      const response = await unWrap(await fetch(url, { headers }))
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response))
    } catch(err) {
      res.statusCode = 400
      res.end()
    }
  }

  function getUrl(data) {
    for (let i = 0; i < data.length; i++) {
      const name = JSON.stringify(data[i].name)
      if (name.includes('preview')) return data[i].download_url
    }
    return null
  }

  async function unWrap(response) {
    const body = await response.json()
    const { ok, status, statusText } = response
    return { body, ok, status, statusText }
  }
}
