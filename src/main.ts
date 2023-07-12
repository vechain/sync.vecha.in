import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/style.scss'
import './filters'
import VueAnalytics from 'vue-analytics'
import env from './env'
import 'spectre.css/dist/spectre-icons.css'

Vue.config.productionTip = false

declare global {
  interface Window { MSStream: any; }
}

window.MSStream = window.MSStream || {};


Vue.use({
    install(vue: typeof Vue) {
        vue.prototype.$env = env
    }
})
Vue.use(VueAnalytics, {
    id: 'UA-132391998-2',
    disabled: process.env.NODE_ENV !== 'production'
})
new App().$mount('#app', true)

declare module 'vue/types/vue' {
    interface Vue {
        $env: typeof env
    }
}
