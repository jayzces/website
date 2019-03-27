import Vue from 'vue'
import App from './components/app.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
    render: function (createElement) {
        return createElement(App)
    }
}).$mount('#app')