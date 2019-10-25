<template>
    <div class="theme-item"
        :style="`--main: ${main}; --sub: ${sub};`"
        @click="$emit('clickItem', true)"
        :title="theme.name | capitalize"></div>
</template>

<script>
    export default {
        name: 'ThemeItem',
        props: {
            theme: {
                type: Object,
                required: true
            }
        },
        filters: {
            capitalize(word) {
                return word.charAt(0).toUpperCase() + word.substring(1)
            }
        },
        computed: {
            main() {
                let color = this.theme.mainColor
                return `hsl(${color.h}, ${color.s}%, ${color.l}%)`
            },
            sub() {
                let color = this.theme.subColor
                return `hsl(${color.h}, ${color.s}%, ${color.l}%)`
            }
        }
    }
</script>

<style scoped>
    .theme-item {
        background-image: linear-gradient(to right, var(--main), var(--sub));
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 200ms ease-in-out;
    }

    .list .theme-item {
        margin: 5px;
        z-index: 1;
        transform: scale(0);
    }

    .opened .list .theme-item {
        transform: scale(1);
    }
</style>
