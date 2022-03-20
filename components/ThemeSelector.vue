<template>
  <div class="theme-selector"
    :class="{ opened: openList }"
    @click.self="openList = !openList">
    <div class="list">
      <theme-item v-for="color in themes"
        :key="color.name"
        :theme="color"
        @clickItem="selectAndAnimate(color)" />
    </div>
    <theme-item class="selected"
      :class="{'scale-down': scaleDown}"
      :theme="selected"
      @clickItem="openList = !openList" />
  </div>
</template>

<style scoped>
  .theme-selector {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 30px;
    z-index: 2;
    pointer-events: none;
  }

  .opened {
    width: 100vw;
    height: 100vh;
    pointer-events: auto;
  }

  .list {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    padding: 5px 0;
    width: max-content;
    overflow: hidden;
    pointer-events: none;
  }

  .opened .list {
    pointer-events: auto;
  }

  .scale-down {
    transform: scale(0);
  }

  .selected {
    width: 40px;
    height: 40px;
    box-shadow: 0 5px 10px var(--box-shadow);
    pointer-events: auto;
  }
</style>

<script>
  export default {
    props: {
      themes: {
        type: Array,
        required: true
      },
      currentSelected: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        selected: {
          name: '',
          mainColor: '',
          subColor: ''
        },
        scaleDown: false,
        openList: false
      }
    },
    methods: {
      selectAndAnimate(color) {
        if (this.selected == color) return

        this.scaleDown = true

        let scaleTimeout = setTimeout(() => {
          this.selected = color
          this.scaleDown = false
          this.$emit('themeChange', this.selected)
          clearTimeout(scaleTimeout)
        }, 400)
      }
    },
    mounted() {
      this.selected = this.currentSelected
    },
    watch: {
      currentSelected(theme) {
        this.selected = theme
      }
    }
  }
</script>
