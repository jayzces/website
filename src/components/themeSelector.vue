<template>
    <div class="theme-selector"
        v-bind:class="{opened: openList}"
        v-on:click.self="openList = !openList">
        <div class="list">
            <ThemeItem
                v-for="color in themes"
                v-bind:key="color.name"
                v-bind:theme="color"
                v-on:clickItem="select(color)"></ThemeItem>
        </div>
        <ThemeItem class="selected"
            v-bind:class="{'scale-down': scaleDown}"
            v-bind:theme="selected"
            v-on:clickItem="openList = !openList"></ThemeItem>
    </div>
</template>

<script>
    import { setTimeout, clearTimeout } from 'timers'

    export default {
        name: 'ThemeSelector',
        props: {
            themes: {
                type: Array,
                required: true
            },
            currentSelected: {
                type: Object,
                required: true
            }
        },
        data: function() {
            return {
                selected: {
                    name: '',
                    mainColor: '',
                    subColor: ''
                },
                scaleDown: false,
                openList: false
            }
        },
        components: {
            ThemeItem: require('./themeItem').default
        },
        methods: {
            select(color) {
                if (this.selected == color) return
                this.scaleDown = true
                let scaleTimeout = setTimeout(() => {
                    this.selected = color
                    this.scaleDown = false

                    let body = document.querySelector('body')
                    body.dataset.theme = color.name
                    this.$emit('themeChange', this.selected)

                    clearTimeout(scaleTimeout)
                }, 400)
            },
            toHSL(colorObj) {
                return `hsl(${colorObj.h}, ${colorObj.s}%, ${colorObj.l}%)`
            }
        },
        mounted: function() {
            this.selected = this.currentSelected
        }
    }
</script>

<style scoped>
    .theme-selector {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        left: 0;
        bottom: 0;
        padding: 30px;
        z-index: 2;
        pointer-events: none;
    }

    .opened {
        width: 100vw;
        height: 100vh;
        pointer-events: auto;
    }

    .list {
        display: flex;
        align-items: center;
        flex-direction: column-reverse;
        padding: 5px 0;
        width: max-content;
        overflow: hidden;
        pointer-events: none;
    }

    .opened .list {
        pointer-events: auto;
    }

    .scale-down {
        transform: scale(0);
    }

    .selected {
        width: 40px;
        height: 40px;
        box-shadow: 0 5px 10px var(--box-shadow);
        pointer-events: auto;
    }
</style>
