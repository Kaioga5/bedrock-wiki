<script setup lang="ts">
import { computed } from "vue";
import TableCell from "./TableCell.vue";

import { data as tables } from "../../data/tables/tables.data";
import displayError from "../../utils/displayError";
import useData from "../../composables/data";

const { page } = useData();

const props = defineProps<{
  data: string;
}>();

const table = computed(() => {
  let path = "public";

  if (props.data[0] !== "/") {
    path += "/assets/tables/" + page.value.relativePath.replace(/\.md$/, "/");
  }

  path += props.data;

  const table = tables[path];

  if (!table) {
    displayError(new TypeError(`No table with the path "${path}" exists.`));
  }

  return table;
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(column, columnId) in table.columns"
          :key="columnId"
          :style="{ textAlign: column.textAlign }"
          v-html="column.name"
        />
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
