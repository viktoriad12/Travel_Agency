import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/styles/styles-config.js";
import App from "./App.vue";
import router from "@/router/index.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
