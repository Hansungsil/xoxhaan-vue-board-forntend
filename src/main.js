// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faUnlock, faUserEdit, faSearch, faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.prototype.$http = axios
Vue.prototype.$eventBus = new Vue()

Vue.use(VueCookie)

// font Awesome Icon
library.add(faLock, faUnlock, faUserEdit, faSearch, faEnvelope, faTrashAlt, faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)

require('@/assets/css/common.css')
require('@/assets/css/fonts.css')
require('../node_modules/nprogress/nprogress.css')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
