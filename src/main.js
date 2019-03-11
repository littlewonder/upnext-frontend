import Vue from 'vue'
import App from './App.vue'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
new Vue({
  el: '#app',
  render: h => h(App)
})

