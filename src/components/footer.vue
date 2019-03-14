<template>
    <footer>
        <div>Mary Louise Hermosa</div>
        &copy; Copyright 2019
    </footer>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

<style scoped>
    footer {
        margin-top: 40px;
        padding: 40px 0;
        text-align: center;
        font-size: 14px;
        color: var(--disabled-color);
    }

    div {
        text-transform: lowercase;
        font-family: 'Cattieshine', cursive;
        font-size: 24px;
        color: var(--text-color);
    }


    @media all and (max-width: 640px) {
        footer {
            margin-top: 0;
            padding: 20px 0;
        }
    }
</style>
