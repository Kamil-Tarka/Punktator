<template>
  <div class="container">
    <ControlsBar />
    <h1>Dodaj klienta</h1>
    <hr />
    <form>
      <div class="form-group row">
        <label class="col-sm-4" for="inputName"
          >Kod karty<span style="color: red"> * </span>
        </label>
        <div class="col-sm-4">
          <input
            type="text"
            id="inputCard"
            class="form-control"
            placeholder="Kod karty"
            v-model="client.card_number"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="inputName"
          >Imię<span style="color: red"> * </span></label
        >
        <div class="col-sm-4">
          <input
            type="text"
            id="inputName"
            class="form-control"
            placeholder="Podaj imię"
            v-model="client.name"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="inputSurname"
          >Nazwisko<span style="color: red"> * </span></label
        >
        <div class="col-sm-4">
          <input
            type="text"
            id="inputSurname"
            class="form-control"
            placeholder="Podaj Nazwisko"
            v-model="client.surname"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="inputPostal">Kod pocztowy</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="inputPostal"
            class="form-control"
            placeholder="00-000"
            v-model="client.postal_code"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="inputCity">Miasto (poczta)</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="inputCity"
            class="form-control"
            placeholder="Podaj nazwę "
            v-model="client.city"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="inputStreet">Ulica/miejscowość</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="inputStreet"
            class="form-control"
            placeholder="Podaj nazwę ulicy/miejscowości"
            v-model="client.street"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="inputStreetNumber">Nr. budynku</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="inputStreetNumber"
            class="form-control"
            placeholder="Nr. budynku"
            v-model="client.street_number"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4" for="inputPhoneNumber">Nr. telefonu</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="inputPhoneNumber"
            class="form-control"
            placeholder="Podaj nr. telefonu (bez spacji ani znaków specialnych)"
            v-model="client.phone_number"
          />
        </div>
      </div>

      <div class="form-group row">
        <button class="btn btn-info col-sm-12" @click="add()">Zapisz</button>
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
      client: {
        name: "",
        surname: "",
        postal_code: "",
        city: "",
        street: "",
        street_number: "",
        phone_number: "",
        card_number: "",
      },
    };
  },
  created: function () {
    if (localStorage.isValid == "true") {
      console.log("access granted");
    } else {
      alert(
        "Nie masz uprawnień lub zakończyła się sesja logowania\nZaloguj się ponownie"
      );
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    add() {
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
        };
        axios.post("http://127.0.0.1:8081/client/", clientJson);

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        console.log(JSON.stringify(clientJson));
        const logJson = {
          user_id: localStorage.userId,
          action_name: "Dodanie klienta",
          value: JSON.stringify(clientJson),
          date: today,
        };

        alert("Dodano klienta do bazy");
        axios.post("http://127.0.0.1:8081/log/", logJson);

        this.client = {};
        window.location.reload(true);
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
  },
};
</script>