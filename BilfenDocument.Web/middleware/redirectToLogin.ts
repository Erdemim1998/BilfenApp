import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path == "/") return navigateTo("/login");
});
