<template>
  <section id="my-projects" class="page projects" ref="projects">
    <h2>Projects</h2>
    <template v-if="data.length > 0">
      <div class="projects-list" >
        <project-item v-for="pi in data"
          :key="pi.html_url"
          :project="pi" />
      </div>

      <div class="buttons">
        <button class="bg-sub clickable"
          v-if="showPrev"
          @click="navigatePage(page - 1)"
          :disabled="loading">Prev</button>
        <button class="bg-main clickable"
          v-if="showNext"
          @click="navigatePage(page + 1)"
          :disabled="loading">Next</button>
      </div>
    </template>
    <div class="no-projects" v-else>Loading...</div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        showNext: false,
        showPrev: false,
        page: 1,
        loading: true,
        scrollToTop: false
      }
    },
    methods: {
      fetchProjects(page = 1, hits = 9) {
        fetch(`${this.$config.rootUrl}/api/projects`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({ page, hits })
        })
          .then(response => response.json())
          .then(parsedData => {
            const parsedBody = parsedData.body
            this.loading = false

            if (parsedBody.length > 0) {
              this.data = parsedBody
              this.showNext = parsedBody.length === hits
              this.showPrev = page > 1
            } else {
              this.page = this.page - 1
              this.showNext = false
              this.showPrev = true
            }

            if (this.scrollToTop) this.scrollToTopSection()
          })
      },
      navigatePage(newPage) {
        this.page = newPage
        this.loading = true
        this.fetchProjects(this.page)
      },
      scrollToTopSection() {
        const page = this.$refs.projects
        window.scrollTo({top: page.offsetTop})
      }
    },
    created() {
      this.fetchProjects()
    },
    mounted() {
      const page = this.$refs.projects
      let currentScroll = window.pageYOffset

      window.addEventListener('scroll', () => {
        const pageTop = page.offsetTop
        const pageBottom = pageTop + page.clientHeight
        const windowOffset = window.pageYOffset

        if (windowOffset >= pageTop
          && windowOffset <= pageBottom
          && windowOffset > currentScroll) {
          this.$nuxt.$emit('showNav')
          this.scrollToTop = true
        } else {
          this.$nuxt.$emit('hideNav')
          this.scrollToTop = false
        }

        currentScroll = windowOffset
      })
    }
  }
</script>

<style scoped>
  .projects {
    padding: 85px 40px 0;
  }

  .no-projects {
    text-align: center;
    color: var(--subtext-color);
  }

  h2 {
    text-transform: uppercase;
    text-align: center;
    font-size: 24px;
  }

  .projects-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .buttons button {
    margin: 0 0.5rem;
    padding: 1rem 2.5rem;
    text-transform: uppercase;
    font-weight: bold;
    font-family: inherit;
    font-size: 1rem;
    color: inherit;
    border: 0;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.7;
  }

  .bg-main {
    background-color: var(--main-accent);
  }

  .bg-sub {
    background-color: var(--sub-accent);
  }


  @media all and (max-width: 690px) {
    .projects {
      padding-top: 55px;
    }
  }

  @media all and (max-width: 480px) {
    .projects {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
