import Vue from 'vue'
import App from './App.vue'

var utils = require('./utils'),
    radio = require('./radio')

window.utils = utils
window.radio = radio


new Vue({
  el: '#app',
  render: h => h(App)
})

