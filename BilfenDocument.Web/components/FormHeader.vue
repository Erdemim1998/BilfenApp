<template>
  <div class="row mb-3 ps-3 pe-3">
    <div
      class="container col-12 bg-secondary-subtle d-flex align-items-center"
      style="height: 50px"
    >
      <a class="btn btn-primary rounded me-2" @click="btnRecordListClick"
        >Kayıt Listesi</a
      >
      <button
        type="submit"
        class="btn btn-success rounded me-2"
      >
        Kaydet
      </button>
      <button type="submit" class="btn btn-danger rounded me-2 btnSaveAs" @click="btnSaveAsClick">Farklı Kaydet</button>
      <button
        type="submit"
        class="btn btn-secondary rounded me-2"
        @click="btnDeleteClick"
      >
        <font-awesome-icon icon="fa-trash" />
      </button>
      <a class="btn btn-light rounded" @click="btnResetClick">
        <font-awesome-icon icon="fa-rotate-left"
      /></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits<{
  (e: "record-list-click"): void;
  (e: "delete-click"): void;
  (e: "reset-click"): void;
  (e: "save-as-click"): void;
}>();

const btnRecordListClick = () => {
  emit("record-list-click");
};

const btnDeleteClick = () => {
  emit("delete-click");
};

const btnResetClick = () => {
  emit("reset-click");
};

const btnSaveAsClick = () => {
  emit("save-as-click");
}
</script>
