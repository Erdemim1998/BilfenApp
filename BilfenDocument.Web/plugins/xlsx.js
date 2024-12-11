import * as XLSX from 'xlsx';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('xlsx', XLSX);
});