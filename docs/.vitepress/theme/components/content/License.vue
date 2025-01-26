<script setup lang="ts">
import { computed } from "vue";
import useData from "../../composables/data";
import NavLink from "../navigation/NavLink.vue";

const { site, frontmatter } = useData();

const normalizedLicenses = computed(() => {
  const { license } = frontmatter.value;

  if (typeof license === "string") return { main: license };
  return license;
});

const mainLicense = computed(() => site.value.themeConfig.licenses[normalizedLicenses.value.main]);
const codeLicense = computed(() => site.value.themeConfig.licenses[normalizedLicenses.value.code]);
</script>

<template>
  <hr style="margin-block: 1em" />
  <p>
    Text and image content on this page is licensed under the
    <NavLink :link="mainLicense.link">{{ mainLicense.title }}</NavLink>
  </p>
  <p v-if="codeLicense">
    Code samples on this page are licensed under the
    <NavLink :link="codeLicense.link">{{ codeLicense.title }}</NavLink>
  </p>
</template>
