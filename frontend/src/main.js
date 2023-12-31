import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';
import Charts from './views/Charts.vue';
import Search from './views/Search.vue';
import Song from './views/Song.vue';

import axios from './plugins/axios';
import config from './config.json';

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/charts', component: Charts },
  { path: '/search', component: Search },
  { path: '/song', name:"Song", component: Song, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);


// Adiciona o Axios ao contexto global do Vue
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$config = config;

app.mount('#app');
