<template>
    <nav class="nav">
        <a href="#home" class="logo-link">
            <NavLogo v-if="isDesktop" />
            <NavLogo2 v-else />
        </a>
        <a href="#my-projects">My Projects</a>
        <a href="">My Résumé</a>
        <a href="https://github.com/jayzces" target="_blank"> @jayzces on Github</a>
        <a href="mailto:louise@channelfix.com">louise@channelfix.com</a>
    </nav>
</template>

<script>
    import Eventbus from '@/modules/eventbus'
    import NavLogo from '@/svgs/logo_left.svg'
    import NavLogo2 from '@/svgs/logo_center.svg'

    export default {
        name: 'Nav',
        components: { NavLogo, NavLogo2 },
        data: function() {
            return {
                isDesktop: true
            }
        },
        methods: {
            checkWindowWidth: function() {
                if (window.innerWidth <= 690) {
                    this.isDesktop = false
                } else {
                    this.isDesktop = true
                }
            }
        },
        mounted: function() {
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
    }

    .visible {
        top: 5px;
        opacity: 1;
    }


    .logo-link {
        display: inline-block;
    }


    .nav a {
        position: relative;
        z-index: 0;
        font-weight: 600;
        color: var(--disabled-color);
    }

    .nav a:not(:first-child) {
        margin-left: 30px;
    }

    .nav a::before {
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

    .nav a:hover,
    .nav .active {
        color: var(--text-color);
    }

    .nav a:hover::before,
    .nav .active::before {
        max-height: 100%;
    }


    .nav svg {
        height: 40px;
    }


    @media all and (max-width: 860px) {
        .nav a {
            font-size: 14px;
        }

        .nav a:not(:first-child) {
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

        .nav a:not(.logo-link) {
            display: none;
        }

        .nav svg {
            height: 35px;
        }
    }
</style>
