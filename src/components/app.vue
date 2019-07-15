<template>
    <div class="app">
        <Canvas v-bind:theme="selected"></Canvas>
        <div class="progress-bar"></div>
        <Nav></Nav>
        <LandingPage></LandingPage>
        <ProjectsPage></ProjectsPage>
        <Footer></Footer>
        <ThemeSelector
            v-bind:themes="themes"
            v-bind:currentSelected="selected"
            v-on:themeChange="updateSelected"></ThemeSelector>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data: function() {
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
            Canvas: require('./canvas').default,
            Nav: require('./nav').default,
            LandingPage: require('./landing').default,
            ProjectsPage: require('./projects').default,
            Footer: require('./footer').default,
            ThemeSelector: require('./themeSelector').default
        },
        methods: {
            updateSelected(theme) {
                this.selected = theme
            }
        },
        created: function() {
            /* To change default theme, change this value and
             * change `.detect` class variables in `styles.css` */
            this.selected = this.themes[1]
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
