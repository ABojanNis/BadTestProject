import Vue from "vue";
import _ from "lodash";

export const EventBus = new Vue({});

EventBus.$on("serverError", argument => {
  if (argument.error === undefined) {
    return;
  }
  let status = argument.error.status;
  if (argument.component.$auth) {
    if (status == 400 || status == 401) {
      argument.component.$auth
        .logout()
        .then(function() {
          argument.component.$router.push("/");
          Vue.prototype.$me = {
            price: 0,
            user: {
              profile: {
                name: ""
              },
              news: [],
              unseenNews: []
            },
            id: -1
          };
        })
        .catch(function() {
          argument.component.$router.push("/");

          Vue.prototype.$me = {
            price: 0,
            user: {
              profile: {
                name: ""
              },
              news: [],
              unseenNews: []
            },
            id: -1
          };
        });
    }
  }
  if (status == 422) {
    let errors = argument.error.data.errors;
    let isObject = _.every(errors, _.isObject);
    _.forEach(errors, function(error) {
      if (isObject) {
        argument.component.$toast.error(error.msg);
      } else {
        argument.component.$toast.error(error);
      }
    });
  } else if (status > 399 && status < 405) {
    argument.component.$toast.error(argument.error.data.message);
  }
});
