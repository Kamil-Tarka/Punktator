<template>
  <div class="container">
    <ControlsBar></ControlsBar>
    <h1>Użytkownicy</h1>
    <hr />
    <form>
      <div class="form-group row">
        <label class="col-sm-4" for="inputLogin">Login</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="inputLogin"
            class="form-control"
            placeholder="Podaj login"
            v-model="user.username"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="inputLogin">Hasło</label>
        <div class="col-sm-4">
          <input
            type="password"
            id="inputLogin"
            class="form-control"
            placeholder="Podaj hasło"
            v-model="user.password"
          />
        </div>
      </div>

      <div class="form-group row">
        <button id="find" class="btn btn-info col-sm-12" @click="add()">
          Zapisz
        </button>
      </div>
    </form>
    <hr />

    <table class="table">
      <tr>
        <th>Login</th>
        <th>Uprawnienia administratora</th>
        <th>Akcje</th>
      </tr>
      <tr v-for="user in users" v-bind:key="user.id">
        <td>{{ user.username }}</td>
        <td>
          <span v-if="user.is_admin == true">Tak</span>
          <span v-if="user.is_admin == false">Nie</span>
        </td>
        <td>
          <input
            type="button"
            class="btn btn-info col-md-12"
            value="Pokaż hasło"
            @click="showPassword(user)"
          /><br />
          <input
            type="button"
            class="btn btn-warning col-md-12"
            value="Edytuj"
            @click="editItem(user)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import ControlsBar from "../ControlsBar.vue";
import axios from "axios";
import { _ } from "vue-underscore";
export default {
  name: "UsersList",
  components: {
    ControlsBar,
  },
  data: function () {
    return {
      users: [],
      usersData: [],
      user: {
        username: "",
        password: "",
      },
    };
  },
  created: function () {
    if (localStorage.isValid == "true" && localStorage.isAdmin == "true") {
      var self = this;
      axios.get("http://127.0.0.1:8081/user/").then((res) => {
        self.users = res.data;
        self.usersData = self.clients;
      });
    } else {
      alert(
        "Nie masz uprawnień lub zakończyła się sesja logowania\nZaloguj się ponownie"
      );
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    add: function () {
      let errorMessage = this.validate();

      if (_.isEqual(errorMessage, "")) {
        const userJson = {
          username: this.user.username,
          password: this.user.password,
        };
        axios.post("http://127.0.0.1:8081/user/", userJson);

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        console.log(JSON.stringify(userJson));
        const logJson = {
          user_id: localStorage.userId,
          action_name: "Dodanie użytkownika",
          value: JSON.stringify(userJson),
          date: today,
        };

        axios.post("http://127.0.0.1:8081/log/", logJson);
        alert("Dodano użytkownika do bazy");
        this.user = {};
        var self = this;
        axios.get("http://127.0.0.1:8081/user/").then((res) => {
          self.users = res.data;
          self.usersData = self.clients;
        });
        window.location.reload(true);
      } else {
        alert(errorMessage);
      }
    },
    validate: function () {
      let errorMessage = "";

      if (this.user.username == "") {
        errorMessage += "Pusta nazwa użytkownika\n";
      }
      if (this.user.password == "") {
        errorMessage += "Puste hasło\n";
      }

      return errorMessage;
    },
    editItem: function (user) {
      this.$router.push({ name: "UpdateUser", params: { data: user } });
    },
    showPassword: function (user) {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      console.log(JSON.stringify(user));
      const logJson = {
        user_id: localStorage.userId,
        action_name: "Wyświetlenie hasła",
        value: JSON.stringify(user),
        date: today,
      };

      axios.post("http://127.0.0.1:8081/log/", logJson);
      alert(user.password);
    },
  },
};
</script>