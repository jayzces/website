<template>
    <div class="app">
        <Canvas :theme="selected"></Canvas>
        <div class="progress-bar"></div>
        <Nav></Nav>
        <main>
            <LandingPage></LandingPage>
            <ProjectsPage></ProjectsPage>
        </main>
        <Footer></Footer>
        <ThemeSelector
            :themes="themes"
            :currentSelected="selected"
            @themeChange="updateSelected"></ThemeSelector>
    </div>
</template>

<script>
    export default {
        name: 'App',
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
        components: {
            Canvas: () => import('./canvas.vue'),
            Nav: require('./nav').default,
            LandingPage: require('./landing').default,
            ProjectsPage: require('./projects').default,
            Footer: require('./footer').default,
            ThemeSelector: () => import('./themeSelector.vue')
        },
        methods: {
            updateSelected(theme) {
                this.selected = theme
                let body = document.querySelector('body')
                body.dataset.theme = theme.name
            },
            randomizeTheme() {
                let randomTheme = Math.floor(Math.random() * Math.floor(this.themes.length))
                this.updateSelected(this.themes[randomTheme])
            }
        },
        created() {
            /**
             * Detect initial color scheme preference to set the right value.
             * To change default theme, change this value and change
             * `.detect` class variables in `styles.css`
             */
            // let prefersDark =
            //         window.matchMedia('(prefers-color-scheme: dark)').matches,
            //     prefersLight =
            //         window.matchMedia('(prefers-color-scheme: light)').matches

            // if (prefersLight && !prefersDark) this.selected = this.themes[0]
            // else this.selected = this.themes[1]


            // Randomize initial color scheme
            this.randomizeTheme()
        },
        mounted() {
            window.addEventListener('keyup', e => {
                if (e.code == 'Enter') {
                    this.randomizeTheme()
                } else if (e.code == 'ArrowRight') {
                    let currentIndex = this.themes.indexOf(this.selected),
                        nextIndex = currentIndex < this.themes.length - 1 ?
                            currentIndex + 1 : 0
                    this.updateSelected(this.themes[nextIndex])
                } else if (e.code == 'ArrowLeft') {
                    let currentIndex = this.themes.indexOf(this.selected),
                        nextIndex = currentIndex > 0 ?
                            currentIndex - 1 : this.themes.length - 1
                    this.updateSelected(this.themes[nextIndex])
                }
            })
        }
    }
</script>

<style>
    @import "../styles.css";
</style>

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
