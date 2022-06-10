import { createApp } from "vue";

import App from "./Demo.vue";
import SimpleComponentVue from "./SimpleComponent.vue";

const app = createApp(SimpleComponentVue);

app.mount("#app");
