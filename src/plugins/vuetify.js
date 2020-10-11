import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@/sass/overrides.sass";

Vue.use(Vuetify);

const theme = {
  primary: "#4caf50",
  secondary: "#9c27b0",
  accent: "#9c27b0",
  info: "#00cae3"
};

export default new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme
    }
  }
});
