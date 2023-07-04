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
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import VScrollLock from 'v-scroll-lock'

//localStorage.setItem('addressServer', 'http://localhost:8080')
localStorage.setItem('addressServer', 'http://129.151.226.75:8080')
console.log('addressServer: ' + localStorage.getItem('addressServer'))
/* add icons to the library */
library.add(faGoogle, faLinkedinIn, faGithub, faUserLarge, faArrowUp, faMagnifyingGlass, faAngleLeft, faAngleRight, faPlus, faHeart, faHeartSolid, faHeartCirclePlus, faBookmark, faBookmarkSolid, faBars)

createApp(App).use(router).use(VScrollLock).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
