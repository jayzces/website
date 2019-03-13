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
                if (window.pageYOffset >= page.offsetTop
                    && window.pageYOffset > currentScroll) {
                    Eventbus.$emit('showNav')
                } else {
                    Eventbus.$emit('hideNav')
                }

                currentScroll = window.pageYOffset
            })
        }
    }
</script>

<style scoped>
    .projects-page {
        padding-top: 84px;
    }
</style>
