<template>
    <nav class="nav">
        <a href="#home" class="logo-link">logo
            <NavLogo v-if="isDesktop" />
            <NavLogo2 v-else />
        </a>
        <a href="#my-projects">My Projects</a>
        <a href="https://resume.louisehermosa.com/" target="_blank" rel="noreferrer">My Resume</a>
        <a href="https://github.com/jayzces" target="_blank" rel="noreferrer"> @jayzces on Github</a>
        <a href="mailto:hi@louisehermosa.com">hi@louisehermosa.com</a>
    </nav>
</template>

<script>
    import Eventbus from '@/modules/eventbus'

    export default {
        name: 'Nav',
        data() {
            return {
                isDesktop: true
            }
        },
        components: {
            NavLogo: () => import('@/svgs/logo_left.svg'),
            NavLogo2: () => import('@/svgs/logo_center.svg')
        },
        methods: {
            checkWindowWidth() {
                if (window.innerWidth <= 690) {
                    this.isDesktop = false
                } else {
                    this.isDesktop = true
                }
            }
        },
        mounted() {
            Eventbus.$on('showNav', () => {
                let nav = document.querySelector('.nav')
                let projectsLink = nav.querySelector('a:nth-child(2)')
                nav.classList.add('visible')
                projectsLink.setAttribute('class', 'active')
            })

            Eventbus.$on('hideNav', () => {
                let nav = document.querySelector('.nav')
                let projectsLink = nav.querySelector('a:nth-child(2)')
                nav.classList.remove('visible')
                projectsLink.setAttribute('class', '')
            })

            this.checkWindowWidth()
            window.addEventListener('resize', this.checkWindowWidth)
        }
    }
</script>

<style scoped>
    .nav {
        background-color: var(--bg-color);
        display: flex;
        align-items: center;
        position: fixed;
        top: -85px;
        left: 0;
        right: 0;
        padding: 0 40px;
        height: 80px;
        opacity: 0;
        z-index: 1;
        transition: top 200ms, opacity 200ms;
        box-shadow: 0 5px 10px var(--box-shadow);
    }

    .visible {
        top: 5px;
        opacity: 1;
    }


    .logo-link {
        display: inline-block;
        font-size: 0;
    }


    .nav a:not(.logo-link) {
        position: relative;
        z-index: 0;
        font-weight: 600;
        color: var(--subtext-color);
    }

    .nav a:not(.logo-link):not(:first-child) {
        margin-left: 30px;
    }

    .nav a:not(.logo-link)::before {
        content: "";
        background-image: linear-gradient(to right,
            var(--main-accent),
            var(--sub-accent));
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 4px;
        width: 100%;
        height: 8px;
        max-height: 0;
        transform: rotate(-2deg);
        z-index: -1;
        transition: all 200ms ease-in-out;
    }

    .nav a:not(.logo-link):hover,
    .nav .active.active {
        color: var(--text-color);
    }

    .nav a:not(.logo-link):hover::before,
    .nav .active.active::before {
        max-height: 100%;
    }


    .nav svg {
        height: 40px;
    }


    @media all and (max-width: 860px) {
        .nav a:not(.logo-link) {
            font-size: 14px;
        }

        .nav a:not(.logo-link):not(:first-child) {
            margin-left: 20px;
        }
    }

    @media all and (max-width: 690px) {
        .nav {
            justify-content: center;
            align-items: flex-end;
            padding: 0 15px;
            height: 50px;
        }

        .nav a:not(.logo-link):not(.logo-link) {
            display: none;
        }

        .nav svg {
            height: 35px;
        }
    }
</style>
