<template>
    <div class="app">
        <div class="progress-bar"></div>
        <Nav></Nav>
        <LandingPage></LandingPage>
        <ProjectsPage></ProjectsPage>
        <Footer></Footer>
        <ThemeSelector></ThemeSelector>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {
            Nav: require('./nav').default,
            LandingPage: require('./landing').default,
            ProjectsPage: require('./projects').default,
            Footer: require('./footer').default,
            ThemeSelector: require('./themeSelector').default
        }
    }
</script>

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
