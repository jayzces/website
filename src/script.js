import Vue from 'vue'
import App from './components/app.vue'

Vue.config.productionTip = false

new Vue({
    render(createElement) {
        return createElement(App)
    }
}).$mount('#app')