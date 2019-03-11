import Vue from 'vue'
import App from './App.vue'
import VueYoutube from 'vue-youtube'

var api = require('./api')
var radio = require('./radio')

window.api = api
window.radio = radio


Vue.use(VueYoutube)
new Vue({
  el: '#app',
  render: h => h(App)
})

