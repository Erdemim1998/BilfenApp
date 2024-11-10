// plugins/fontawesome.js
import { defineNuxtPlugin } from "#app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSignOutAlt,
  faTrash,
  faRotateLeft,
  faPlus,
  faDownload,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSignOutAlt);
library.add(faTrash);
library.add(faRotateLeft);
library.add(faPlus);
library.add(faDownload);
library.add(faCircleCheck);
library.add(faCircleXmark);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
