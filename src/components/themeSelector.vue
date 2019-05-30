<template>
    <div class="theme-selector"
        v-bind:class="{opened: openList}"
        v-on:click.self="openList = !openList">
        <div class="list">
            <div class="color"
                v-for="color in theme"
                v-bind:key="color.name"
                v-bind:style="`--main: ${color.mainColor}; --sub: ${color.subColor}`"
                v-on:click="select(color)"></div>
        </div>
        <div class="color selected"
            v-bind:class="{'scale-down': scaleDown}"
            v-bind:style="`--main: ${selected.mainColor}; --sub: ${selected.subColor}`"
            v-on:click="openList = !openList"></div>
    </div>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';
    export default {
        name: 'ThemeSelector',
        data: function() {
            return {
                selected: {
                    name: '',
                    mainColor: '',
                    subColor: ''
                },
                scaleDown: false,
                openList: false,
                theme: [
                    {
                        name: 'noire',
                        mainColor: 'hsl(200, 100%, 50%)',
                        subColor: 'hsl(280, 100%, 50%)'
                    }, {
                        name: 'blanc',
                        mainColor: 'hsl(200, 100%, 50%)',
                        subColor: 'hsl(97, 81%, 48%)'
                    }, {
                        name: 'rose',
                        mainColor: 'hsl(340, 82%, 52%)',
                        subColor: 'hsl(353, 93%, 80%)'
                    }, {
                        name: 'beignet',
                        mainColor: 'hsl(344, 91%, 61%)',
                        subColor: 'hsl(18, 96%, 68%)'
                    }, {
                        name: 'mer',
                        mainColor: 'hsl(203, 67%, 50%)',
                        subColor: 'hsl(179, 67%, 55%)'
                    }, {
                        name: 'coucher',
                        mainColor: 'hsl(269, 50%, 50%)',
                        subColor: 'hsl(11, 100%, 69%)'
                    }, {
                        name: 'plage',
                        mainColor: 'hsl(200, 87%, 62%)',
                        subColor: 'hsl(356, 100%, 85%)'
                    }
                ]
            }
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

                    clearTimeout(scaleTimeout)
                }, 400)
            }
        },
        mounted: function() {
            this.selected = this.theme[0]
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

    .color {
        background-image: linear-gradient(to right, var(--main), var(--sub));
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 200ms ease-in-out;
    }

    .list .color {
        margin: 5px;
        z-index: 1;
    }

    .list .color,
    .scale-down {
        transform: scale(0);
    }

    .opened .list .color {
        transform: scale(1);
    }

    .selected {
        width: 40px;
        height: 40px;
        box-shadow: 0 5px 10px var(--box-shadow);
        pointer-events: auto;
    }
</style>
