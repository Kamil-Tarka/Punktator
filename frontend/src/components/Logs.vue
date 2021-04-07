<template>
  <div class="container">
    <ControlsBar></ControlsBar>
    <h1>Logi</h1>
    <hr />
    <form>
      <div class="form-group row">
        <label class="col-sm-4" for="dateFrom">Od</label>
        <div class="col-sm-4">
          <input
            type="date"
            id="dateFrom"
            class="form-control"
            v-model="criteria.dateFrom"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="dateTo">Do</label>
        <div class="col-sm-4">
          <input
            type="date"
            id="dateTo"
            class="form-control"
            v-model="criteria.dateTo"
          />
        </div>
      </div>

      <div class="form-group row">
        <button id="find" class="btn btn-info col-sm-12" @click="showLogs()">
          Pokaż logi
        </button>
      </div>
    </form>
    <hr />

    <table class="table">
      <tr>
        <th>Użytkownik</th>
        <th>Akcja</th>
        <th>Dane</th>
        <th>Data</th>
      </tr>
      <tr v-for="log in logs" v-bind:key="log.id">
        <td>{{ getUsername(log.user_id) }}</td>
        <td>{{ log.action_name }}</td>
        <td>{{ log.value }}</td>
        <td>{{ log.date }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import ControlsBar from "../ControlsBar.vue";
import axios from "axios";
import { _ } from "vue-underscore";
export default {
  name: "Logs",
  components: {
    ControlsBar,
  },
  data: function () {
    return {
      users: [],
      usersData: [],
      logs: [],
      logsData: [],
      criteria: {
        dateFrom: "",
        dateTo: "",
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
      axios.get("http://127.0.0.1:8081/log/").then((res) => {
        self.logsData = res.data;
      });
    } else {
      alert(
        "Nie masz uprawnień lub zakończyła się sesja logowania\nZaloguj się ponownie"
      );
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    showLogs() {
      if (this.criteria.dateTo == "") {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0");
        let yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        this.criteria.dateTo = today;
      }
      this.logs = [];
      _.forEach(this.logsData, (log) => {
        if (
          log.date >= this.criteria.dateFrom &&
          log.date <= this.criteria.dateTo
        ) {
          this.logs.push(log);
        }
      });
    },
    getUsername(idUser) {
      return _.findWhere(this.users, { id: idUser }).username;
    },
  },
};
</script>