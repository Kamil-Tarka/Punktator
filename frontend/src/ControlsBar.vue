<template>
  <div id="ControlsBar">
    <div class="row">
      <button class="btn btn-primary col-sm-2" @click="logout()">
        Wyloguj
      </button>
      <button class="btn btn-primary col-sm-2" @click="toList()">
        Lista Klientów
      </button>
      <button class="btn btn-primary col-sm-2" @click="add()">
        Dodaj klienta
      </button>
      <button
        v-if="isAdmin == 'true'"
        class="btn btn-primary col-sm-2"
        @click="users()"
      >
        Użytkownicy
      </button>
      <button
        v-if="isAdmin == 'true'"
        class="btn btn-primary col-sm-2"
        @click="logs()"
      >
        Logi
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "ControlsBar",
  components: {},
  data: function () {
    return { isAdmin: localStorage.isAdmin };
  },
  methods: {
    logout: function () {
      localStorage.clear();
      alert("Wylogowano z serwisu");
      this.$router.push({ name: "Home" });
    },
    toList: function () {
      this.$router.push({ name: "ClientControl" });
    },
    add: function () {
      this.$router.push({ name: "CreateClient" });
    },
    users: function () {
      this.$router.push({ name: "UsersList" });
    },
    logs: function () {
      this.$router.push({ name: "Logs" });
    },
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