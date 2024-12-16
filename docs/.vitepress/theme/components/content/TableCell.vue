<script setup lang="ts">
import { computed, ref } from "vue";
import { TableCell, TableColumn } from "../../types";

const props = defineProps<{
  column: TableColumn;
  value: TableCell;
}>();

const shortListLength = 10;
const shortTextLength = 500;

const canShowMore = computed(() => {
  if (Array.isArray(props.value)) return props.value.length > shortListLength;

  if (typeof props.value === "string") return props.value.length > shortTextLength;

  return false;
});

const showMore = ref(false);
</script>

<template>
  <td :style="{ textAlign: column.text_align }">
    <ul v-if="Array.isArray(value)">
      <li
        v-for="(item, itemIndex) in showMore ? value : value.slice(0, shortListLength)"
        :key="itemIndex"
      >
        {{ item }}
      </li>
    </ul>

    <span v-else-if="typeof value === 'string'">{{
      (showMore ? value : value.substring(0, shortTextLength)) ?? "N/A"
    }}</span>

    <span v-else-if="typeof value === 'boolean'">{{ value ? "✔️" : "❌" }}</span>

    <span v-else>{{ value ?? "N/A" }}</span>

    <template v-if="canShowMore">
      <button
        v-if="showMore"
        type="button"
        class="show-less-button"
        @click="() => (showMore = false)"
      >
        Show Less
      </button>
      <button v-else type="button" class="show-more-button" @click="() => (showMore = true)">
        …Show More
      </button>
    </template>
  </td>
</template>

<style lang="scss" scoped>
.show-more-button,
.show-less-button {
  margin-left: 0.5em;

  color: var(--accent-color);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.show-more-button {
  position: relative;

  &::before {
    content: "";
    position: absolute;

    left: -2em;
    width: 1.5em;
    height: 1lh;

    background: linear-gradient(90deg, transparent, var(--cell-bg-color));
  }
}
</style>
