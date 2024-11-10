<template>
  <div class="pagination">
    <div class="border rounded">
      <button
        :class="[
          'btn',
          { 'btn-primary': page > 1 },
          { 'btn-dark': page <= 1 },
          'me-2',
        ]"
        @click="handleClick(page - 1)"
        :disabled="page <= 1"
      >
        <<
      </button>
      <span>Sayfa {{ page }} / {{ totalPages }}</span>
      <button
        :class="[
          'btn',
          { 'btn-primary': page < totalPages },
          { 'btn-dark': page >= totalPages },
          'ms-2',
        ]"
        @click="handleClick(page + 1)"
        :disabled="page >= totalPages"
      >
        >>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  page: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (event: "click", newPage: number): void;
}>();

function handleClick(newPage: number) {
  emit("click", newPage);
}
</script>
