<script setup lang="ts">
import { computed } from "vue";
import TableCell from "./TableCell.vue";

import { data as tables } from "../../data/tables.data";
import useData from "../../composables/data";

const { page } = useData();

const props = defineProps<{
  data: string;
}>();

const tablePath = computed(() => {
  let path = "docs/public";

  if (props.data[0] !== "/") {
    path += "/assets/tables/" + page.value.relativePath.replace(/\.md$/, "/");
  }

  path += props.data;

  return path;
});

const table = computed(() => tables[tablePath.value]);
</script>

<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(column, columnId) in table.columns"
          :key="columnId"
          :style="{ textAlign: column.text_align }"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rowIndex) in table.rows" :key="rowIndex">
        <TableCell
          v-for="(column, columnId) in table.columns"
          :key="columnId"
          :column
          :value="row[columnId] ?? column.default"
        />
      </tr>
    </tbody>
  </table>
</template>
