import { createApp } from "vue";
import App from "./App.vue";
import directive from "./components/directive";
import "./components/index.scss";
const app = createApp(App);
app.directive("ellipsis", directive);
app.mount("#app");
