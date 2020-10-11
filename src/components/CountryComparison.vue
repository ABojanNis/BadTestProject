<template>
  <v-container fluid>
    <v-container>
      <v-row class="justify-center">
        <h1>Country Comparison</h1>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col xs6 class="pt-16">
          <template v-if="compare">
            <p>Most populated country is: <strong>{{ mostPopulated.name }}</strong> with <strong>{{ formatNumber(mostPopulated.population) }}</strong> inhabitants.</p>
            <p>Most least populated country is: <strong>{{ leastPopulated.name }}</strong> with <strong>{{ formatNumber(leastPopulated.population) }}</strong> inhabitants.</p>
            <p>Difference of population is: <strong>{{ formatNumber(mostPopulated.population - leastPopulated.population) }}</strong> inhabitants</p>
          </template>
        </v-col>
        <v-col xs6>
          <v-card class="my-0 pt-4">
            <v-card-text class="text-center">
              <h2>Country list</h2>
              <v-autocomplete
                class="mt-10"
                v-model="selectedCountries"
                :items="filteredList"
                chips
                deletable-chips
                solo
                rounded
                label="Please select countries you want to compare"
                multiple
                clearable
                item-text="name"
                return-object
              ></v-autocomplete>
              <v-btn color="primary" @click="compareCountries">Compare</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="compare">
        <v-col>
          <v-card>
            <countries-chart :chartData="chartData" :options="chartOptions" :height="450"></countries-chart>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  import axios from "axios";
  import CountriesChart from "./CountriesChart";

  export default {
    name: "CountryComparison",

    components: { CountriesChart },

    data: () => ({
      search: "",
      countryList: [],
      selectedCountries: null,
      compare: false,
      mostPopulated: null,
      leastPopulated: null,
      chartData: null,
      chartOptions: { responsive: true, maintainAspectRatio: false }
    }),

    computed: {
      filteredList() {
        return this.countryList.filter(country => country.name.toLowerCase().includes(this.search.toLowerCase()));
      }
    },

    mounted() {
      this.getCountries();
    },

    methods: {
      getCountries() {
        this.$emit("loading", true);
        axios.get("https://restcountries.eu/rest/v2/all")
          .then(response => {
            this.countryList = response.data.map(country => {
              return { name: country.name, population: country.population };
            });
            this.$emit("loading", false);
          })
      },

      compareCountries() {
        if (this.selectedCountries && this.selectedCountries.length > 0) {
          let mostPopulated = this.selectedCountries[0];
          let leastPopulated = this.selectedCountries[0];

          for(let i = 1; i < this.selectedCountries.length; i++) {
            if (this.selectedCountries[i].population > mostPopulated.population) {
              mostPopulated = this.selectedCountries[i];
            }

            if (this.selectedCountries[i].population < leastPopulated.population) {
              leastPopulated = this.selectedCountries[i];
            }
          }

          this.mostPopulated = mostPopulated;
          this.leastPopulated = leastPopulated;

          this.chartData = { labels: [ '' ] };
          this.chartData.datasets = [];
          this.selectedCountries.forEach((country, index) => {
            const newDataset = {};
            newDataset.label = country.name;
            newDataset.data = [country.population];
            switch (index) {
              case 0:
                newDataset.backgroundColor = '#FF0000';
                break;
              case 1:
                newDataset.backgroundColor = '#4caf50';
                break;
              case 2:
                newDataset.backgroundColor = '#0000FF';
                break;
              default:
                newDataset.backgroundColor = '#FFFF00';
                break;
            }
            this.chartData.datasets.push(newDataset);
          });

          this.compare = true;
        }
      },

      formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    },

    watch: {
      selectedCountries() {
        if (this.selectedCountries && this.selectedCountries.length > 4) {
          this.selectedCountries.shift();
        }
      }
    }
  }
</script>

<style>

</style>