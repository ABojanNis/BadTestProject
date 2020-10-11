<template>
  <v-container class="fill-height align-baseline" fluid>
    <v-row class="justify-center mt-10">
      <h1>Country Comparison</h1>
    </v-row>
    <v-row class="mt-n16">
      <v-col
        cols="12"
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
        class="justify-center text-center"
      >
        <v-card>
          <form @submit.prevent="signin">
            <v-card-text>
              <validation-observer ref="obs">
                <h2 class="py-4">Sign in</h2>
                <v-row>
                  <v-col cols="8" offset="2">
                    <validation-provider
                      name="Username"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="username"
                        :error-messages="errors"
                        label="Your username"
                        type="text"
                        validate-on-blur
                        prepend-icon="mdi-account-circle"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="8" offset="2">
                    <validation-provider
                      name="Password"
                      rules="required|min:5"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        v-model="password"
                        :error-messages="errors"
                        label="Your password"
                        type="password"
                        validate-on-blur
                        prepend-icon="mdi-lock"
                        counter
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
              </validation-observer>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-btn color="indigo" type="submit">Sign in</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",

  data: () => ({
    username: "",
    password: ""
  }),
  
  methods: {
    signin() {
      this.$refs.obs.validate().then(result => {
        if (result) {
          this.$emit("loading", true);
          setTimeout(() => {
            this.$emit("loading", false);
            if (this.username !== "admin") {
              return this.$toast.error("Wrong username!");
            }

            if (this.password !== "admin") {
              return this.$toast.error("Wrong password!");
            }

            this.$toast.success("You are successfully logged in!");
            this.$router.push("/dashboard");
          }, 1000);
        }
      });
    }
  }
}
</script>

<style>

</style>