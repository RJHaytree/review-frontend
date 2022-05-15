import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCookies from 'vue-cookies'
import VueClipboard from 'vue3-clipboard'

loadFonts()

library.add(faStar);

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueCookies, { expires: '1d'})
  .use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
  })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app')
