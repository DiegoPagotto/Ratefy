import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';
import axios from './plugins/axios';

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);


// Adiciona o Axios ao contexto global do Vue
app.config.globalProperties.$axios = axios;

app.mount('#app');
