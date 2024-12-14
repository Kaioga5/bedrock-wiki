<template>
  <div>
    <input type="file" @change="handleFileUpload" />

    <table v-if="tableData.length">
      <thead>
        <tr>
          <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td v-for="header in tableHeaders" :key="header">
            <ul v-if="Array.isArray(row[header])">
              <li
                v-for="(item, index) in row[header].slice(0, showLimit(rowIndex, header))"
                :key="item"
              >
                {{ item }}
              </li>

              <span
                v-if="row[header].length > showLimit(rowIndex, header)"
                style="cursor: pointer; color: blue"
                @click="expandList(rowIndex, header)"
              >
                Show more...
              </span>
            </ul>

            <span v-else>{{ row[header] || "N/A" }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tableData = ref([]);

const tableHeaders = ref([]);

const showLimits = ref({});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const jsonData = JSON.parse(e.target.result);

    if (jsonData && jsonData.content && jsonData.header) {
      tableHeaders.value = jsonData.header;

      tableData.value = jsonData.content;

      initShowLimits();
    }
  };

  reader.readAsText(file);
};

const initShowLimits = () => {
  tableData.value.forEach((row, rowIndex) => {
    tableHeaders.value.forEach((header) => {
      if (Array.isArray(row[header])) {
        showLimits.value[`${rowIndex}-${header}`] = 10;
      }
    });
  });
};

const showLimit = (rowIndex, header) => {
  return showLimits.value[`${rowIndex}-${header}`] || 10;
};

const expandList = (rowIndex, header) => {
  const key = `${rowIndex}-${header}`;

  showLimits.value[key] = showLimits.value[key] + 10;
};
</script>

