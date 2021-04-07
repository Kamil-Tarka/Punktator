<template>
  <div id="Home">
    <ClientList></ClientList>
  </div>
</template>

<script>
import ClientList from "./components/ClientList.vue";
export default {
  name: "ClientControl",
  components: {
    ClientList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
