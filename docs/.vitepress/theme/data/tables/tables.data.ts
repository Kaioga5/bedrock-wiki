import { defineLoader } from "vitepress";
import { readFileSync } from "fs";

import { Table } from "../../types";

import parseTable from "./parseTable";

export interface Tables {
  [path: string]: Table;
}

declare const data: Tables;
export { data };

export default defineLoader({
  watch: "docs/public/assets/tables/**/*.json",
  load(watchedFiles: string[]) {
    const data = {};

    for (const path of watchedFiles) {
      const table = JSON.parse(readFileSync(path, "utf-8"));

      data[path] = parseTable(table);
    }

    return data;
  },
});
