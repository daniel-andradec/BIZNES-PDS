import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
// regular
import { far } from '@fortawesome/free-regular-svg-icons'


library.add(fas)
library.add(far)

const app = createApp(App)

app.component('fa', FontAwesomeIcon)

app.use(router)

app.mount('#app')
