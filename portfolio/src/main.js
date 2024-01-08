import './assets/style.css'
import LangSelector from './components/LangSelector.vue'
import HomePage from './components/HomePage.vue'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.component('LangSelector', LangSelector);
app.component('HomePage', HomePage);
const mountedApp = app.mount('body');