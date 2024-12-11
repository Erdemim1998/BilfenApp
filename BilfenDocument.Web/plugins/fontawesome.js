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
  faRightFromBracket,
  faMagnifyingGlass,
  faX,
  faFilePdf,
  faFileExcel,
  faFileWord,
  faFilter,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSignOutAlt);
library.add(faTrash);
library.add(faRotateLeft);
library.add(faPlus);
library.add(faDownload);
library.add(faCircleCheck);
library.add(faCircleXmark);
library.add(faRightFromBracket);
library.add(faMagnifyingGlass);
library.add(faX);
library.add(faFilePdf);
library.add(faFileExcel);
library.add(faFileWord);
library.add(faFilter);
library.add(faSort);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
