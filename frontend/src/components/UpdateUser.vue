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
        <button id="find" class="btn btn-info col-sm-12" @click="update()">
          Zapisz
        </button>
      </div>
    </form>
    <hr />
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
      user: {
        username: "",
        password: "",
      },
    };
  },
  created: function () {
    if (localStorage.isValid == "true" && localStorage.isAdmin == "true") {
      console.log("access granted");
      this.user = this.$route.params.data;
    } else {
      alert(
        "Nie masz uprawnień lub zakończyła się sesja logowania\nZaloguj się ponownie"
      );
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    update: function () {
      let errorMessage = this.validate();

      if (_.isEqual(errorMessage, "")) {
        const userJson = {
          username: this.user.username,
          password: this.user.password,
        };
        axios.put("http://127.0.0.1:8081/user/" + this.user.id, userJson);

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        console.log(JSON.stringify(userJson));
        const logJson = {
          user_id: localStorage.userId,
          action_name: "Aktualizacja danych użytkownika",
          value: JSON.stringify(userJson),
          date: today,
        };

        axios.post("http://127.0.0.1:8081/log/", logJson);
	
        alert("Zaktualizowano dane użytkownika");
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
  },
};
</script>