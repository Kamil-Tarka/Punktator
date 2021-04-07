<template>
  <div class="container">
    <ControlsBar />
    <h1>Lista klientów</h1>
    <hr />
    <form>
      <div class="form-group row">
        <label class="col-sm-4" for="inputName">Kod karty</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="inputCard"
            class="form-control"
            placeholder="Kod karty"
            v-model="criteria.card_number"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="inputName">Imię</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="inputName"
            class="form-control"
            placeholder="Podaj imię"
            v-model="criteria.name"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="inputSurname">Nazwisko</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="inputSurname"
            class="form-control"
            placeholder="Podaj Nazwisko"
            v-model="criteria.surname"
          />
        </div>
      </div>

      <div class="form-group row">
        <button id="find" class="btn btn-info col-sm-12" @click="find()">
          Szukaj
        </button>
      </div>
    </form>
    <hr />

    <table class="table">
      <tr>
        <th>Imię</th>
        <th>Nazwisko</th>
        <th>Numer telefonu</th>
        <th>Ulica</th>
        <th>Nr. domu</th>
        <th>Kod pocztowy</th>
        <th>Miasto</th>
        <th>Nr. karty</th>
        <th>Punkty</th>
        <th>Akcje</th>
      </tr>
      <tr v-for="client in clients" v-bind:key="client.id">
        <td>{{ client.name }}</td>
        <td>{{ client.surname }}</td>
        <td>{{ client.phone_number }}</td>
        <td>{{ client.street }}</td>
        <td>{{ client.street_number }}</td>
        <td>{{ client.postal_code }}</td>
        <td>{{ client.city }}</td>
        <td>{{ client.card_number }}</td>
        <td>{{ client.points }}</td>
        <td>
          <input
            type="button"
            class="btn btn-success col-md-12"
            value="Nalicz punkty"
            @click="points(client)"
          /><br />
          <input
            type="button"
            class="btn btn-warning col-md-12"
            value="Edytuj"
            @click="editItem(client)"
          /><br />
          <input
            type="button"
            class="btn btn-danger col-md-12"
            value="Usuń"
            @click="removeItem(client)"
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
//import { EventBus } from "@/eventBus";
export default {
  name: "ClientList",
  components: {
    ControlsBar,
  },
  data: function () {
    return {
      clients: [],
      clientsData: [],
      criteria: {
        name: "",
        surname: "",
        card_number: "",
      },
    };
  },
  created: function () {
    if (localStorage.isValid == "true") {
      var self = this;
      axios.get("http://127.0.0.1:8081/client/").then((res) => {
        self.clients = res.data;
        self.clientsData = self.clients;
      });
    } else {
      alert(
        "Nie masz uprawnień lub zakończyła się sesja logowania\nZaloguj się ponownie"
      );
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    removeItem: function (client) {
      if (
        confirm(
          'Czy na pewno chcesz usunąć klienta "' +
            client.name +
            " " +
            client.surname +
            '"'
        )
      ) {
        if (localStorage.isValid == "true") {
          axios
            .delete("http://127.0.0.1:8081/client/" + client.id)
            .then((res) => {
              console.log(res.data.status);
              const index = this.clients.indexOf(client);
              this.clients.splice(index, 1);
            });

          let today = new Date();
          let dd = String(today.getDate()).padStart(2, "0");
          let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          let yyyy = today.getFullYear();

          today = yyyy + "-" + mm + "-" + dd;
          console.log(JSON.stringify(client));
          const logJson = {
            user_id: localStorage.userId,
            action_name: "Usunięcie klienta",
            value: JSON.stringify(client),
            date: today,
          };

          axios.post("http://127.0.0.1:8081/log/", logJson);
        } else {
          alert(
            "Nie masz uprawnień lub zakończyła się sesja logowania\nZaloguj się ponownie"
          );
          this.$router.push({ name: "Home" });
        }
      }
    },
    find: function () {
      if (!_.isEmpty(this.criteria.card_number)) {
        this.filtrByCard();
      } else {
        this.clients = this.clientsData;
      }
      if (!_.isEmpty(this.criteria.name)) {
        this.filtrByName();
      }
      if (!_.isEmpty(this.criteria.surname)) {
        this.filtrBySurname();
      }
    },
    filtrByCard: function () {
      this.clients = [];
      _.forEach(this.clientsData, (client) => {
        if (client.card_number.includes(this.criteria.card_number)) {
          this.clients.push(client);
        }
      });
    },
    filtrByName: function () {
      let tmp = [];
      tmp = this.clients;
      this.clients = [];
      _.forEach(tmp, (client) => {
        if (client.name.includes(this.criteria.name)) {
          this.clients.push(client);
        }
      });
    },
    filtrBySurname: function () {
      let tmp = [];
      tmp = this.clients;
      this.clients = [];
      _.forEach(tmp, (client) => {
        if (client.surname.includes(this.criteria.surname)) {
          this.clients.push(client);
        }
      });
    },
    editItem: function (client) {
      this.$router.push({ name: "UpdateClient", params: { data: client } });
    },
    points: function (client) {
      this.$router.push({ name: "Points", params: { data: client } });
    },
  },
};
</script>