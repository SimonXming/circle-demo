// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import moment from 'moment'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.config.productionTip = false

Vue.filter('dateFromTT', function (value) {
  if (value) {
    return moment.unix(value).format('YYYY/MM/DD hh:mm')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
