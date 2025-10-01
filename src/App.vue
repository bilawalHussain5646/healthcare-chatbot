<template>
  <div id="app">
    <header>
      <h2>Chatbot</h2>
    </header>

    <main>
      <ChatApp />
    </main>
  </div>
</template>

<script>
import ChatApp from "./components/ChatApp.vue";

export default {
  name: "App",
  components: { ChatApp },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f0f4f7;
}

header {
  background-color: #00796b;
  color: white;
  padding: 16px;
  text-align: center;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
