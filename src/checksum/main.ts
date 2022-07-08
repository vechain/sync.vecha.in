import Vue from 'vue'
import env from '../env'
import App from './App.vue'

declare module 'vue/types/vue' {
    interface Vue {
        $env: typeof env
    }
}
Vue.config.productionTip = false
Vue.use({
    install(vue: typeof Vue) {
        vue.prototype.$env = env
    }
})

new App().$mount('#app', true)
