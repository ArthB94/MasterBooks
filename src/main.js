import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/Master.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import VScrollLock from 'v-scroll-lock'

/* add icons to the library */
library.add(faGoogle,faLinkedinIn,faGithub,faUserLarge,faArrowUp,faMagnifyingGlass,faAngleLeft,faAngleRight)

createApp(App).use(router).use(VScrollLock).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

