<template>
    <div class="app">
        <div class="progress-bar"></div>
        <div class="page landing-page">
            <div class="page__content">
                <div class="header">Hi, I'm
                    <div class="site-logo">
                        <div class="site-logo__ln">Hermosa</div>
                        <div class="site-logo__fn">Mary Louise</div>
                    </div>
                </div>

                <p>I’m a front end web developer and web designer at <a href="https://channelfix.com" target="_blank" class="main-link">ChannelFix.com</a> and <a href="https://bposeats.com" target="_blank" class="main-link">BPOSeats.com</a>.  I specialize in UI design, and templating. Currently exploring new front end technologies.</p>

                <div class="links">
                    <a href="">My Projects</a>
                    <a href="">My Résumé</a>
                    <a href="https://github.com/jayzces" target="_blank"> @jayzces on Github</a>
                    <a href="mailto:louise@channelfix.com">louise@channelfix.com</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>


<style scoped>
    .app {
        position: relative;
    }

    .progress-bar {
        background-image: linear-gradient(to left,
            var(--main-accent),
            var(--sub-accent));
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 5px;
    }

    .page {
        min-height: 100vh;
    }

    .landing-page {
        display: grid;
    }

    .landing-page .page__content {
        margin: auto;
        padding: 0 15px;
    }

    .header {
        text-align: center;
        font-weight: 600;
        font-size: 24px;
        color: var(--white-50);
    }

    .header .site-logo {
        margin-top: -12px;
    }

    .site-logo {
        position: relative;
        font-weight: normal;
    }

    .site-logo__ln {
        background-image: linear-gradient(to left,
            var(--main-accent),
            var(--sub-accent));
        line-height: 95px;
        text-transform: uppercase;
        font-weight: 800;
        font-size: 72px;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .site-logo__fn {
        position: relative;
        margin-top: -52px;
        line-height: 56px;
        text-transform: lowercase;
        font-family: 'Cattieshine', cursive;
        font-size: 56px;
        color: var(--white);
    }

    .landing-page p {
        margin: 30px auto 0;
        max-width: 500px;
        line-height: 24px;
        text-align: center;
    }

    .main-link {
        position: relative;
        display: inline-block;
        text-transform: uppercase;
        font-weight: 700;
    }

    .links a::before,
    .main-link::before {
        content: "";
        background-image: linear-gradient(to left,
            var(--main-accent),
            var(--sub-accent));
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 4px;
        width: 100%;
        height: 8px;
        transform: rotate(-2deg);
        z-index: -1;
    }

    .links {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 30px;
        font-weight: 600;
        color: var(--white-30);
    }

    .links a {
        position: relative;
        display: inline-block;
        transition: all 200ms ease-in-out;
    }

    .links a::before {
        max-height: 0%;
        transition: all 200ms ease-in-out;
    }

    .links a:hover {
        color: var(--white);
    }

    .links a:hover::before {
        max-height: 100%;
    }

    .links a:not(:first-child) {
        margin-left: 30px;
    }

    @media all and (max-width: 480px) {

        .header {
            font-size: 18px;
        }

        .site-logo {
            margin-top: -8px;
        }

        .site-logo__ln {
            line-height: 74px;
            font-size: 56px;
        }

        .site-logo__fn {
            margin-top: -41px;
            line-height: 42px;
            font-size: 42px;
        }

        .landing-page p {
            margin-top: 20px;
            line-height: 22px;
        }

        .main-link::before {
            bottom: 2px;
            height: 6px;
        }

        .links {
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        }

        .links a:not(:first-child) {
            margin-top: 5px;
            margin-left: 0;
        }
    }
</style>
