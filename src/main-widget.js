import { createApp } from "vue";
import ChatApp from "./components/ChatApp.vue";

// Create container dynamically
const container = document.createElement("div");
container.id = "healthcare-chat-widget-root";
document.body.appendChild(container);

// Mount Vue app
createApp(ChatApp).mount(container);
