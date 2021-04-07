<template>
  <div class="container">
    <ControlsBar />
    <h1>Nalicz punkty</h1>
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
      </tr>
      <tr>
        <td>{{ client.name }}</td>
        <td>{{ client.surname }}</td>
        <td>{{ client.phone_number }}</td>
        <td>{{ client.street }}</td>
        <td>{{ client.street_number }}</td>
        <td>{{ client.postal_code }}</td>
        <td>{{ client.city }}</td>
        <td>{{ client.card_number }}</td>
        <td>{{ client.points }}</td>
      </tr>
    </table>
    <form>
      <div class="form-group row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <input
            type="number"
            min="0"
            id="inputPoint"
            class="form-control"
            placeholder="Wpisz kwotę"
            v-model="cost"
          />
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <button type="button" class="btn btn-primary" @click="calculate()">
            Przelicz
          </button>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-4">
          <button type="button" class="btn btn-primary" @click="sub()">
            -
          </button>
        </div>
        <div class="col-sm-4">
          <input
            type="number"
            min="0"
            id="inputPoint"
            class="form-control"
            placeholder="Wpisz liczbę punktów"
            v-model="points"
          />
        </div>
        <div class="col-sm-4">
          <button type="button" class="btn btn-primary" @click="add()">
            +
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ControlsBar from "../ControlsBar.vue";
import axios from "axios";
import { _ } from "vue-underscore";
//import { EventBus } from "@/eventBus";
export default {
  name: "CreateClient",
  components: {
    ControlsBar,
  },
  data: function () {
    return {
      cost: "",
      points: "",
      operation: "",
      client: {
        id: "",
        name: "",
        surname: "",
        postal_code: "",
        city: "",
        street: "",
        street_number: "",
        phone_number: "",
        card_number: "",
        pints: 0,
      },
    };
  },
  created: function () {
    if (localStorage.isValid == "true") {
      console.log("access granted");
      this.client = this.$route.params.data;
    } else {
      alert(
        "Nie masz uprawnień lub zakończyła się sesja logowania\nZaloguj się ponownie"
      );
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    update() {
      let errorMessage = this.validate();

      if (_.isEqual(errorMessage, "")) {
        const clientJson = {
          name: this.client.name,
          surname: this.client.surname,
          postal_code: this.client.postal_code,
          city: this.client.city,
          street: this.client.street,
          street_number: this.client.street_number,
          phone_number: this.client.phone_number,
          card_number: this.client.card_number,
          points: this.client.points,
        };

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        console.log(this.points);
        const logJson = {
          user_id: localStorage.userId,
          action_name: "Operacja na punktach: " + this.operation,
          value: this.points,
          date: today,
        };

        axios.post("http://127.0.0.1:8081/log/", logJson);

        axios.put("http://127.0.0.1:8081/client/" + this.client.id, clientJson);
      } else {
        alert(errorMessage);
      }
    },
    validate: function () {
      let errorMessage = "";
      if (this.client.card_number == "") {
        errorMessage += "Nie podano kodu karty\n";
      }
      if (this.client.name == "") {
        errorMessage += "Nie podoano imienia\n";
      }
      if (this.client.surname == "") {
        errorMessage += "Nie podano nazwiska";
      }
      if (this.client.postal_code != "") {
        const regexPostal = new RegExp("^[0-9]{2}-[0-9]{3}$");
        if (!regexPostal.test(this.client.postal_code)) {
          errorMessage += "Błędny kod pocztowy";
        }
      }
      if (this.client.city != "") {
        if (this.client.city.length < 1) {
          errorMessage += "Podano niepoprawną nazwę miasta";
        }
      }
      if (this.client.street != "") {
        if (this.client.street.length < 1) {
          errorMessage += "Podano niepoprawną nazwę ulicy";
        }
      }
      if (this.client.street_number != "") {
        if (this.client.street_number.length < 1) {
          errorMessage += "Podano niepoprawny nr. budynku";
        }
      }
      if (this.client.phone_number != "") {
        if (this.client.phone_number.length <= 1) {
          errorMessage += "Podano niepoprawny nr. telefonu";
        }
      }
      return errorMessage;
    },
    add: function () {
      let points = parseInt(this.client.points);
      points += parseInt(this.points);
      this.client.points = points;
      this.operation = "Przyznano";
      this.update();
    },
    sub: function () {
      let points = parseInt(this.client.points);
      points -= parseInt(this.points);
      this.client.points = points;
      this.operation = "Odebrano";
      this.update();
    },
    calculate: function () {
      this.points = parseInt(this.cost / 20);
    },
  },
};
</script>