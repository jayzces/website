<template>
  <section id="my-projects" class="page projects" ref="projects">
    <h2>Projects</h2>
    <div class="projects-list" v-if="data.length > 0">
      <project-item v-for="n in data.length"
        :key="n"
        :project="data[n - 1]" />
    </div>
    <div class="no-projects" v-else>Loading...</div>
  </section>
</template>

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

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        data: []
      }
    },
    methods: {
      refresh() {
        location.reload()
      }
    },
    created() {
      axios.get(`${this.$config.functionsURL}/github`)
        .then(response => this.data = response.data)
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
          && windowOffset > currentScroll)
          this.$nuxt.$emit('showNav')
        else
          this.$nuxt.$emit('hideNav')

        currentScroll = windowOffset
      })
    }
  }
</script>
