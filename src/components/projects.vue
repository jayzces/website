<template>
    <div id="my-projects" class="page projects-page">
        ello
    </div>
</template>

<script>
    import Eventbus from '@/modules/eventbus'

    export default {
        name: 'Projects',
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
        padding-top: 84px;
    }
</style>
