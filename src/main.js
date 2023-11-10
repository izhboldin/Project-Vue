import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "@/router/router.js";
import { } from '@/services/fireBase.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'



const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.directive("colorWhite", {  mounted (el) {el.style.color = 'white' }})
app.mount('#app')
