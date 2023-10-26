import { createApp } from 'vue';
import './style.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const pinia = createPinia();

const appInstance = createApp(App);
appInstance.use(pinia);
appInstance.use(router);
appInstance.mount('#app');
