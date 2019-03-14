<template>
    <div id="my-projects" class="page projects-page">
        <h2>Projects</h2>
        <div v-if="data.length > 0" class="projects-list">
            <ProjectItem
                v-for="n in data.length"
                v-bind:key="n"
                v-bind:project="data[n - 1]"></ProjectItem>
        </div>
        <div class="no-projects" v-else>Loading...</div>
    </div>
</template>

<script>
    import Eventbus from '@/modules/eventbus'
    import axios from 'axios'

    export default {
        name: 'Projects',
        components: {
            ProjectItem: require('./projectItem').default
        },
        data: function() {
            return {
                data: []
            }
        },
        methods: {
            refresh: function() {
                location.reload()
            }
        },
        created: function() {
            axios.get(`${process.env.VUE_APP_FUNCTIONS_URL}/github`)
                .then(response => (this.data = response.data))
        },
        mounted: function() {
            let page = document.querySelector('.projects-page')
            let currentScroll = window.pageYOffset
            window.addEventListener('scroll', () => {
                let pageTop = page.offsetTop
                let pageBottom = pageTop + page.clientHeight
                let windowOffset = window.pageYOffset

                if (windowOffset >= pageTop
                    && windowOffset <= pageBottom
                    && windowOffset > currentScroll) {
                    Eventbus.$emit('showNav')
                } else {
                    Eventbus.$emit('hideNav')
                }

                currentScroll = windowOffset
            })
        }
    }
</script>

<style scoped>
    .projects-page {
        padding: 85px 40px 0;
    }

    .no-projects {
        text-align: center;
        color: var(--disabled-color);
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
        .projects-page {
            padding-top: 55px;
        }
    }

    @media all and (max-width: 480px) {
        .projects-page {
            padding-left: 15px;
            padding-right: 15px;
        }
    }
</style>
