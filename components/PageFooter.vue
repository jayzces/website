<template>
  <footer class="footer">
    <div class="name">Mary Louise Hermosa</div>
    <p>&copy; 2022 Mary Louise Hermosa. All rights reserved.</p>
    <p>This site was made with <a class="fancy-link" href="https://nuxtjs.org/">NuxtJS</a> and <a class="fancy-link" href="https://www.netlify.com/products/functions/">Netlify Functions</a>, and hosted on <a class="fancy-link" href="https://www.netlify.com/">Netlify</a>.</p>
  </footer>
</template>

<style scoped>
  footer {
    margin-top: 40px;
    padding: 40px 0;
    text-align: center;
    font-size: 14px;
    color: var(--subtext-color);
  }

  .name {
    text-transform: lowercase;
    font-family: 'Cattieshine', cursive;
    font-size: 24px;
    color: var(--text-color);
  }

  p {
    margin: 0;
    line-height: 1.5;
  }

  p:first-of-type {
    margin-top: 5px;
  }

  .fancy-link:not(:hover) {
    color: var(--main-accent);
  }

  @media all and (max-width: 640px) {
    footer {
      margin-top: 0;
      padding: 20px 15px;
    }
  }
</style>
