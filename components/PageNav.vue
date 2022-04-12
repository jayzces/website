<template>
  <nav class="nav"
    :class="{ 'visible': showNav }">
    <a href="#home" class="logo-link">logo
      <div v-html="isDesktop ? logoLeft : logoCenter"></div>
    </a>
    <a class="fancy-link"
      href="#my-projects"
      :class="{ 'active': showNav }">My Projects</a>
    <a class="fancy-link"
      href="https://resume.louisehermosa.com/"
      rel="noreferrer">My Resume</a>
    <a class="fancy-link"
      href="https://github.com/jayzces"
      rel="noreferrer"> @jayzces on Github</a>
    <a class="fancy-link"
      href="mailto:hi@louisehermosa.com">hi@louisehermosa.com</a>
  </nav>
</template>

<script>
  import logoCenter from '~/assets/svg/logo_center.svg?raw'
  import logoLeft from '~/assets/svg/logo_left.svg?raw'

  export default {
    data() {
      return {
        isDesktop: true,
        logoCenter,
        logoLeft,
        showNav: false
      }
    },
    methods: {
      checkWindowWidth() {
        if (window.innerWidth <= 690) this.isDesktop = false
        else this.isDesktop = true
      }
    },
    mounted() {
      this.$nuxt.$on('showNav', () => this.showNav = true)
      this.$nuxt.$on('hideNav', () => this.showNav = false)

      this.checkWindowWidth()
      window.addEventListener('resize', this.checkWindowWidth)
    }
  }
</script>

<style scoped>
  .nav {
    background-color: var(--bg-color);
    display: flex;
    align-items: center;
    position: fixed;
    top: -85px;
    left: 0;
    right: 0;
    padding: 0 40px;
    height: 80px;
    opacity: 0;
    z-index: 1;
    transition: top 200ms, opacity 200ms;
    box-shadow: 0 5px 10px var(--box-shadow);
  }

  .visible {
    top: 5px;
    opacity: 1;
  }


  .logo-link {
    display: inline-block;
    font-size: 0;
  }

  .logo-link > div {
    width: 143px;
  }

  .fancy-link {
    font-weight: 600;
  }

  .fancy-link:not(:hover):not(.active) {
    color: var(--subtext-color);
  }

  .nav a:not(.logo-link):not(:first-child) {
    margin-left: 30px;
  }


  @media all and (max-width: 860px) {
    .nav a:not(.logo-link) {
      font-size: 14px;
    }

    .nav a:not(.logo-link):not(:first-child) {
      margin-left: 20px;
    }
  }

  @media all and (max-width: 690px) {
    .nav {
      justify-content: center;
      padding: 0 15px;
      height: 50px;
    }

    .nav a:not(.logo-link):not(.logo-link) {
      display: none;
    }

    .logo-link > div {
      width: 123px;
    }
  }
</style>
