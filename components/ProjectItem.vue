<template>
  <div class="project-item">
    <a class="preview"
      :href="demo_url"
      v-if="demo_url">
      <img :src="preview_url"
        :alt="title + `'s preview`"
        v-if="preview_url" />
      <div class="demo-indicator">Live Demo</div>
    </a>
    <div class="preview" v-else></div>
    <p>{{ desc }}</p>
    <a class="project-link fancy-link" :href="url" >{{ url }}</a>
  </div>
</template>

<script>
  export default {
    props: {
      project: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        demo_url: this.project.homepage,
        title: this.project.name,
        desc: this.project.description,
        url: this.project.html_url,
        preview_url: ''
      }
    },
    methods: {
      fetchPreview() {
        fetch(`${this.$config.rootUrl}/api/previews?repo=${this.title}`)
          .then(response => response.json())
          .then(parsedData => this.preview_url = parsedData.body ?? '')
      }
    },
    created() {
      this.fetchPreview()
    }
  }
</script>

<style scoped>
  .project-item {
    margin: 20px 0;
    width: calc(100% / 3 - (120px / 2));
    text-align: center;
  }

  .preview {
    background-color: var(--preview-color);
    position: relative;
    display: block;
    width: 100%;
    border: 2px solid var(--main-accent);
    border-image-slice: 2;
    border-image-source: linear-gradient(to right,
      var(--main-accent),
      var(--sub-accent));
  }

  .preview::before {
    content: "";
    display: block;
    padding-top: calc(100% / 440 * 247);
  }

  .preview img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .demo-indicator {
    background-color: var(--sub-accent);
    display: inline-block;
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 5px 10px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    color: var(--text-color);
  }

  p {
    margin: 20px 0 0;
  }

  .fancy-link {
    font-weight: 600;
  }

  .fancy-link:not(:hover) {
    color: var(--subtext-color);
  }


  @media (min-width: 641px) and (max-width: 860px) {
    .project-item {
      width: calc(100% / 3 - (40px / 2));
    }
  }

  @media (min-width: 481px) and (max-width: 640px) {
    .project-item {
      width: calc(100% / 2 - (20px / 2));
    }
  }

  @media all and (max-width: 480px) {
    .project-item {
      width: 100%;
    }

    .project-item:not(:first-child) {
      margin: 10px 0;
    }

    p {
      margin-top: 10px;
    }
  }
</style>
