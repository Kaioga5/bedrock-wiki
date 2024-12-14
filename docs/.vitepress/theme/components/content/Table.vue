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
              <li v-for="item in row[header]" :key="item">{{ item }}</li>
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

const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const jsonData = JSON.parse(e.target.result);

    if (jsonData && jsonData.content && jsonData.header) {
      tableHeaders.value = jsonData.header;

      tableData.value = jsonData.content;
    }
  };

  reader.readAsText(file);
};
</script>

