<template>
  <div class="app">
    <particles-canvas :theme="selected"></particles-canvas>
    <div class="progress-bar"></div>
    <page-nav />
    <main>
      <landing-section />
      <projects-section />
    </main>
    <page-footer />

    <theme-selector :themes="themes"
      :currentSelected="selected"
      @themeChange="updateSelected" />
  </div>
</template>

<style scoped>
  .app {
    position: relative;
  }

  .progress-bar {
    background-image: linear-gradient(to right,
      var(--main-accent),
      var(--sub-accent));
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 5px;
    z-index: 2;
  }
</style>

<script>
  export default {
    data() {
      return {
        themes: [
          {
            name: 'blanc',
            mainColor: {
              h: 200, s: 100, l: 50
            },
            subColor: {
              h: 97, s: 81, l: 48
            }
          }, {
            name: 'noire',
            mainColor: {
              h: 200, s: 100, l: 50
            },
            subColor: {
              h: 280, s: 100, l: 50
            }
          }, {
            name: 'rose',
            mainColor: {
              h: 340, s: 82, l: 52
            },
            subColor: {
              h: 353, s: 93, l: 80
            }
          }, {
            name: 'beignet',
            mainColor: {
              h: 344, s: 91, l: 61
            },
            subColor: {
              h: 18, s: 96, l: 68
            }
          }, {
            name: 'mer',
            mainColor: {
              h: 203, s: 67, l: 50
            },
            subColor: {
              h: 179, s: 67, l: 55
            }
          }, {
            name: 'coucher',
            mainColor: {
              h: 269, s: 50, l: 50
            },
            subColor: {
              h: 11, s: 100, l: 69
            }
          }, {
            name: 'plage',
            mainColor: {
              h: 200, s: 87, l: 62
            },
            subColor: {
              h: 356, s: 100, l: 85
            }
          }
        ],
        selected: {
          name: '',
          mainColor: {},
          subColor: {}
        }
      }
    },
    methods: {
      detectColorScheme() {
        const prefersDark =
          window.matchMedia('(prefers-color-scheme: dark)').matches
        const prefersLight =
          window.matchMedia('(prefers-color-scheme: light)').matches

        if (prefersLight && !prefersDark) this.selected = this.themes[0]
        else this.selected = this.themes[1]
      },
      randomizeTheme() {
        const randomTheme = Math.floor(Math.random() * Math.floor(this.themes.length))
        this.updateSelected(this.themes[randomTheme])
      },
      updateSelected(theme) {
        this.selected = theme
        const body = document.querySelector('body')
        body.dataset.theme = theme.name
      }
    },
    mounted() {
      /**
       * Detect initial color scheme preference to set the right value.
       * To change default theme, change this value and change
       * `.detect` class variables in `styles.css`
       */
      // this.detectColorScheme()

      // Randomize initial color scheme
      this.randomizeTheme()

      window.addEventListener('keyup', e => {
        if (e.code == 'Enter') {
          this.randomizeTheme()
        } else if (e.code == 'ArrowRight') {
          const currentIndex = this.themes.indexOf(this.selected)
          const nextIndex = currentIndex < this.themes.length - 1
            ? currentIndex + 1 : 0
          this.updateSelected(this.themes[nextIndex])
        } else if (e.code == 'ArrowLeft') {
          const currentIndex = this.themes.indexOf(this.selected)
          const nextIndex = currentIndex > 0
            ? currentIndex - 1 : this.themes.length - 1
          this.updateSelected(this.themes[nextIndex])
        }
      })
    }
  }
</script>
