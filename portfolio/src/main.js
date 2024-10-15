import './assets/style.css'
import HomePage from './Pages/HomePage.vue'
import AboutPage from './Pages/AboutPage.vue'
import ProjectsPage from './Pages/ProjectsPage.vue'
import ContactPage from './Pages/ContactPage.vue'
//import SkillsPage from './Pages/SkillsPage.vue'

import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'

import mitt from 'mitt';
const emitter = mitt();

const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'About',
      component: AboutPage
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ProjectsPage
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactPage
    },
  ]
  
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
  })

const app = createApp(App);
app.use(router)
app.config.globalProperties.emitter = emitter;
const mountedApp = app.mount('body');
