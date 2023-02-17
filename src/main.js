
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import {Tabs, Tab} from 'vue3-tabs-component';
import 'bootstrap/dist/css/bootstrap.min.css'


createApp(App)
    .component('tabs', Tabs)
    .component('tab', Tab)
    .use(router)
    .mount('#app')
