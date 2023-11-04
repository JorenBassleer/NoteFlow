import { createApp } from 'vue';
import './style.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import Notifications from '@kyvg/vue3-notification'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const pinia = createPinia();

const appInstance = createApp(App);
appInstance.use(pinia);
appInstance.use(router);
appInstance.use(Notifications);
appInstance.use(autoAnimatePlugin);
appInstance.mount('#app');
