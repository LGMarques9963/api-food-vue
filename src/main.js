import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import VueResource from 'vue-resource'
import http from '@/http'

Vue.config.productionTip = false
Vue.prototype.$http = http
// Vue.use(VueResource)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
