<template>
  <section id="home" class="page landing">
    <div class="page__content">
      <header class="header">Hi, I'm
        <div class="site-logo">
          <div v-html="logoCenter"></div>
        </div>
      </header>

      <p>
        I'm a Web Developer at <a href="https://arcanys.com" rel="noreferrer" class="main-link">Arcanys</a>. Previously a Front End Web Developer and Web Designer at <strong>ChannelFix.com</strong> and <strong>BPOSeats.com</strong>. I specialize in UI design, and templating. Currently exploring new front end technologies.
      </p>

      <footer class="links">
        <a href="#my-projects">My Projects</a>
        <a href="https://resume.louisehermosa.com/" target="_blank" rel="noreferrer">My Resume</a>
        <a href="https://github.com/jayzces" target="_blank" rel="noreferrer"> @jayzces on Github</a>
        <a href="mailto:hi@louisehermosa.com">hi@louisehermosa.com</a>
      </footer>
    </div>
  </section>
</template>

<style scoped>
  .landing {
    display: grid;
  }

  .landing .page__content {
    margin: auto;
    padding: 0 15px;
  }

  .header {
    text-align: center;
    font-weight: 600;
    font-size: 24px;
    color: var(--subtext-color);
  }

  .header .site-logo {
    margin: 15px auto 0;
  }

  .site-logo {
    width: 320px;
  }

  .landing p {
    margin: 12px auto 0;
    max-width: 500px;
    line-height: 24px;
    text-align: center;
  }

  .main-link {
    position: relative;
    display: inline-block;
    text-transform: uppercase;
    font-weight: 700;
    z-index: 0;
    color: inherit;
  }

  .links a::before,
  .main-link::before {
    content: "";
    background-image: linear-gradient(to right,
      var(--main-accent),
      var(--sub-accent));
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 4px;
    width: 100%;
    height: 8px;
    transform: rotate(-2deg);
    z-index: -1;
  }

  .links {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 30px;
    font-weight: 600;
    color: var(--subtext-color);
  }

  .links a {
    position: relative;
    display: inline-block;
    transition: all 200ms ease-in-out;
    z-index: 0;
    color: inherit;
  }

  .links a::before {
    max-height: 0%;
    transition: all 200ms ease-in-out;
  }

  .links a:hover {
    color: var(--text-color);
  }

  .links a:hover::before {
    max-height: 100%;
  }

  .links a:not(:first-child) {
    margin-left: 30px;
  }

  @media all and (max-width: 480px) {
    .header {
      font-size: 18px;
    }

    .site-logo {
      width: 260px;
    }

    .landing p {
      margin-top: 10px;
      line-height: 22px;
    }

    .main-link::before {
      bottom: 2px;
      height: 6px;
    }

    .links {
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }

    .links a:not(:first-child) {
      margin-top: 5px;
      margin-left: 0;
    }
  }
</style>

<script>
  import logoCenter from '~/assets/svg/logo_center.svg?raw'

  export default {
    data() {
      return {
        logoCenter
      }
    }
  }
</script>
