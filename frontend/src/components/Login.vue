<template>
  <div class="container">
    <h1>Logowanie</h1>
    <form>
      <div class="form-group row">
        <label class="col-sm-4 col text-right" for="inputLogin">Login</label>
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
        <label class="col-sm-4 col text-right" for="inpuPassword">Hasło</label>
        <div class="col-sm-4">
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Podaj hasło"
            v-model="user.password"
          />
        </div>
      </div>
      <div class="row">
        <button class="btn-lg btn btn-success col text-center" @click="login()">
          Zaloguj
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { _ } from "vue-underscore";
//import { EventBus } from "@/eventBus";
export default {
  name: "Login",
  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
      users: [],
    };
  },
  created: function () {
    var self = this;
    axios.get("http://127.0.0.1:8081/user/").then((res) => {
      self.users = res.data;
    });
  },
  methods: {
    login: function () {
      let error = this.validate();

      if (error == "") {
        if (
          _.findWhere(this.users, {
            username: this.user.username,
            password: this.user.password,
          })
        ) {
          localStorage.isValid = "true";
          localStorage.userId = _.findWhere(this.users, {
            username: this.user.username,
            password: this.user.password,
          }).id;
          if (
            _.findWhere(this.users, {
              username: this.user.username,
              password: this.user.password,
            }).is_admin
          ) {
            localStorage.isAdmin = "true";
          } else {
            localStorage.isAdmin = "false";
          }
          this.$router.push({ name: "ClientControl" });
        } else {
          alert("Błędny login i/lub hasło");
        }
      } else {
        alert(error);
      }
    },
    validate() {
      let errorMessage = "";

      if (this.user.username == "") {
        errorMessage += "Pusty login\n";
      }
      if (this.user.password == "") {
        errorMessage += "Puste hasło \n";
      }
      return errorMessage;
    },
  },
};
</script>