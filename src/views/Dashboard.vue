<template>
  <v-main>
    <loading
      :active="loading"
      :can-cancel="false"
      :is-full-page="true"
      color="#4CAF50"
    />
    <CountryComparison @loading="loading = $event"/>
  </v-main>
</template>

<script>
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";

  import CountryComparison from "../components/CountryComparison";

  export default {
    components: { Loading, CountryComparison },

    data: () => ({
      loading: false
    })
  };
</script>
