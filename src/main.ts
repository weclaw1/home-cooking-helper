import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
import { i18n } from "./i18n/i18n";
import FontAwesomeIcon from "./fontawesome-icons";

import 'bulma/css/bulma.css'

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(i18n)
  .mount('#app')
