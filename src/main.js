import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faTrophy, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faTrophy, faHeartBroken)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
