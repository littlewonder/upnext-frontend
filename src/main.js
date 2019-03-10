import Vue from 'vue'
import App from './App.vue'

window.utils = require('./utils')

new Vue({
  el: '#app',
  render: h => h(App)
})

