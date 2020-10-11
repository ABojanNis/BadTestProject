import Vue from "vue";
import Router from "vue-router";

import paths from "./paths";

function route(path, view, name) {
  let data = {
    name: name || view,
    path,
    component: resovle => import(`@/views/${view}.vue`).then(resovle)
  };

  return data;
}

function routes(paths) {
  return paths.map(path =>
    route(path.path, path.view, path.name)
  );
}

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: routes(paths).concat([{ path: "*", redirect: "/" }]),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

export default router;
