import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { i18n } from "./i18n/i18n";
import FontAwesomeIcon from "./fontawesome-icons";

import "bulma/css/bulma.css";

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(i18n);

app.config.errorHandler = function (error) {
  //errorHandler.mutations.setError(error.message.toString());
  console.error(error);
};

app.mount("#app");
