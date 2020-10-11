<template>
  <v-main>
    <loading
      :active="loading"
      :can-cancel="false"
      :is-full-page="true"
      color="#4CAF50"
    />
    <Login @loading="loading = $event" />
  </v-main>
</template>

<script>
  import Loading from "vue-loading-overlay";
  import "vue-loading-overlay/dist/vue-loading.css";

  import Login from "../components/Login"

  export default {
    components: { Loading, Login },

    data: () => ({
      loading: false
    })
  };
</script>
